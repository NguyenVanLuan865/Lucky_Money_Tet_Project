import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';

export const useFindOpponents = (route: any) => {
    const { roomId, game, player1, player2 } = route.params;
    const navigation = useNavigation();

    const [countdown, setCountdown] = useState(5);
    const [username, setUsername] = useState<string>('');
    const [opponentName, setOpponentName] = useState<string>('');
    
    const addRandomQuestionsToRoom = async (roomId: string) => {
        try {
            const questionSnapshot = await firestore()
                .collection('question')
                .get();
            const questions = questionSnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            const randomQuestions = questions
                .sort(() => 0.5 - Math.random()) 
                .slice(0, 5); 
            await firestore()
                .collection('gameRooms')
                .doc(roomId)
                .set({
                    questions: randomQuestions,
                }, { merge: true }); 
    
            console.log('Random questions added to game room:', randomQuestions);
        } catch (error) {
            console.error('Error adding random questions to room:', error);
        }
    };
    


    useEffect(() => {
        const fetchNames = async () => {
            try {
                const userId = player1; 
                const opponentId = userId === player1 ? player2 : player1;

                const userDoc = await firestore().collection('users').doc(userId).get();
                const userName = userDoc.data()?.name || 'Unknown';

                const opponentDoc = await firestore().collection('users').doc(opponentId).get();
                const opponentUserName = opponentDoc.data()?.name || 'Unknown';

                setUsername(userName);
                setOpponentName(opponentUserName);
            } catch (error) {
                console.error('Error fetching user names:', error);
            }
        };

        fetchNames();
    }, [player1, player2]);

    useEffect(() => {
        const timer = setInterval(() => setCountdown((prev) => prev - 1), 1000);

        if (countdown === 0) {
            clearInterval(timer);
            startGame();
        }

        return () => clearInterval(timer);
    }, [countdown]);

    const startGame = async () => {
        try {
            if (game === 'game1') {
                await addRandomQuestionsToRoom(roomId);
            }
            await firestore()
            .collection('gameRooms')
            .doc(roomId)
            .set(
                { isGameFinished: 0 }, 
                { merge: true } 
            );

            const screenName =
                game === 'game1'
                    ? 'Question'
                    : game === 'game2'
                        ? 'GamePlayShootTheScrew'
                        : game === 'game3'
                            ? 'GamePlayProtect'
                            : game === 'game4'
                                ? 'GamePlayGoldenSaint'
                                : 'DefaultScreen';
    
            navigation.replace(screenName, { roomId, game , username , opponentName});
        } catch (error) {
            console.error('Error starting game:', error);
        }
    };

    return {
        countdown,
        username,
        opponentName,
        formatTime: (seconds: number) => {
            const minutes = Math.floor(seconds / 60);
            const remainingSeconds = seconds % 60;
            return `${minutes < 10 ? `0${minutes}` : minutes}:${remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds}`;
        },
    };
};
