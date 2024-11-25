import { useState, useEffect } from 'react';
import firestore from '@react-native-firebase/firestore';
import { Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export const useGameLogic = ({
    roomId,
    userId,
    game,
    icons,
    enableReminder = false,
    reminderThreshold = 10,
    reminderDuration = 2000,
}) => {
    const [localScore, setLocalScore] = useState(0);
    const [globalScore, setGlobalScore] = useState(0);
    const [opponentScore, setOpponentScore] = useState(0);
    const [countdown, setCountdown] = useState(30);
    const [touchPosition, setTouchPosition] = useState<{ x: number; y: number } | null>(null);
    const [fadeAnim] = useState(new Animated.Value(1));
    const [randomIcon, setRandomIcon] = useState(null);
    const [clickCount, setClickCount] = useState(0);
    const [showReminder, setShowReminder] = useState(false);
    const [isGameActive, setIsGameActive] = useState(true); // Trạng thái game đang hoạt động
    const navigation = useNavigation();

    useEffect(() => {
        const unsubscribe = firestore()
            .collection('gameRooms')
            .doc(roomId)
            .onSnapshot((doc) => {
                if (doc.exists) {
                    const data = doc.data();
                    const scores = data.scores || {};
                    setOpponentScore(scores[Object.keys(scores).find((id) => id !== userId)] || 0);
                    const newGlobalScore = scores[userId] || 0;
                    if (newGlobalScore !== globalScore) {
                        setGlobalScore(newGlobalScore);
                        setLocalScore(0); // Đồng bộ `localScore` với Firebase
                    }
                }
            });

        return () => unsubscribe();
    }, [roomId, userId, globalScore]);

    useEffect(() => {
        const timer = setInterval(() => {
            setCountdown((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    handleGameEnd();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        if (!enableReminder) return;
        let timeout: NodeJS.Timeout;

        if (clickCount >= reminderThreshold) {
            setShowReminder(true);
            timeout = setTimeout(() => {
                setShowReminder(false);
                setClickCount(0);
            }, reminderDuration);
        }

        return () => clearTimeout(timeout);
    }, [clickCount, enableReminder, reminderThreshold, reminderDuration]);

    const handleGameEnd = async () => {
        try {
                
            // Giao dịch để cập nhật trạng thái isGameFinished
            await firestore().runTransaction(async (transaction) => {
                const roomRef = firestore().collection('gameRooms').doc(roomId);
                const roomDoc = await transaction.get(roomRef);
                if (!roomDoc.exists) {
                    throw new Error('Room does not exist!');
                }
    
                const currentFinished = roomDoc.data()?.isGameFinished || 0;
                const updatedFinished = currentFinished + 1;
                transaction.update(roomRef, { isGameFinished: updatedFinished });
                console.log(`Transaction started. Current isGameFinished: ${currentFinished}`);

                if (updatedFinished === 2) {
                    console.log('Both players have completed the game!');
                }
            });
            // Tắt trạng thái game đang hoạt động
            setIsGameActive(false);
    
            // Ghi điểm cuối cùng nếu còn điểm
            if (localScore > 0) {
                await firestore()
                    .collection('gameRooms')
                    .doc(roomId)
                    .update({
                        [`scores.${userId}`]: firestore.FieldValue.increment(localScore),
                    });
                console.log(`Final score submitted for user ${userId}: ${localScore}`);
                setLocalScore(0); // Reset điểm sau khi ghi
            }

    
            // Điều hướng sau khi hoàn tất cập nhật
            navigation.replace('Result', { roomId, game });
        } catch (error) {
            console.error('Error ending game:', error);
        }
    };
    
    const handleTouch = async (event: any) => {
        if (!isGameActive) return;

        const { locationX, locationY } = event.nativeEvent;
        setTouchPosition({ x: locationX, y: locationY });
        setLocalScore((prev) => prev + 1);
        setClickCount((prev) => prev + 1);
        await firestore()
            .collection('gameRooms')
            .doc(roomId)
            .update({
                [`scores.${userId}`]: firestore.FieldValue.increment(1),
            });
    };

    return {
        countdown,
        globalScore,
        opponentScore,
        touchPosition,
        fadeAnim,
        randomIcon,
        handleTouch,
        showReminder,
    };
};
