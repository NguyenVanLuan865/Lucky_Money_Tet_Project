<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Image, ImageBackground, Text, Animated, TouchableWithoutFeedback, Pressable } from 'react-native';
import { BACKGROUND_GAME_SHOOTTHESCREW, FRAME_AVATAR_LEFT, FRAME_AVATAR_RIGHT, FRAME_TIME, ICON_VS, FRAME_GAME_GOLDEN_SAINT, ICON_DRILL, FRAME_ACESSSORRY, ICON_SAINT_1, ICON_SAINT_2, ICON_SAINT_3 } from '../../../../../../assets';
import { styles } from './GamePlaye.style';
import { scaleHeight, scaleWidth, scale, LightTheme } from '../../../../resource';
import { RoundBackButton } from '../../../../component';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../shared-state';
import firestore from '@react-native-firebase/firestore';

const _GamePlayGoldenSaint: React.FC = ({route}: any) => {
    const { roomId, game } = route.params;
    const [localScore, setLocalScore] = useState(0); // Điểm của người chơi hiện tại
    const [opponentScore, setOpponentScore] = useState(0);
    const [globalScore, setGlobalScore] = useState(0);
    const [countdown, setCountdown] = useState(30);
    const userId = useSelector((state: RootState) => state.authentication.token);
    const opponentId = useSelector((state: RootState) => state.matchQueue.opponentId);
    const [touchPosition, setTouchPosition] = useState<{ x: number; y: number } | null>(null);
    const [fadeAnim] = useState(new Animated.Value(1));
    const [lastTouchTime, setLastTouchTime] = useState<number | null>(null);
    const [showMessage, setShowMessage] = useState(false);
    const [randomIcon, setRandomIcon] = useState(null);
=======
import React, { useState } from 'react';
import { StyleSheet, View, Image, ImageBackground, Text, Animated, TouchableWithoutFeedback, Pressable } from 'react-native';
import { BACKGROUND_GAME_SHOOTTHESCREW, FRAME_AVATAR_LEFT, FRAME_AVATAR_RIGHT, FRAME_TIME, ICON_VS, FRAME_GAME_GOLDEN_SAINT, ICON_DRILL, FRAME_ACESSSORRY, ICON_SAINT_1, ICON_SAINT_2, ICON_SAINT_3 } from '../../../../../../assets';
import { styles } from './GamePlaye.style';
import { scaleHeight, scaleWidth } from '../../../../resource';
import { RoundBackButton } from '../../../../component';
import { useNavigation } from '@react-navigation/native';


const _GamePlayGoldenSaint: React.FC = () => {
    const [score, setScore] = useState(0);
    const [touchPosition, setTouchPosition] = useState<{ x: number, y: number } | null>(null);
    const [fadeAnim] = useState(new Animated.Value(1));
    const [randomIcon, setRandomIcon] = useState(null);
    const [showMessage, setShowMessage] = useState(false);
    const [lastTouchTime, setLastTouchTime] = useState(0);
    const navigation = useNavigation();
>>>>>>> b19083247395aec8135ea41e63760732b49f483b
    const icons = [
        { icon: ICON_SAINT_1, width: scaleWidth(84.71), height: scaleHeight(60.35) },
        { icon: ICON_SAINT_2, width: scaleWidth(69.13), height: scaleHeight(46.32) },
        { icon: ICON_SAINT_3, width: scaleWidth(69.13), height: scaleHeight(46.32) }
    ];

<<<<<<< HEAD
    const navigation = useNavigation();

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;

        const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
        const formattedSeconds = remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds;

        return `${formattedMinutes}:${formattedSeconds}`;
    };
    useEffect(() => {
        const unsubscribe = firestore()
            .collection('gameRooms')
            .doc(roomId)
            .onSnapshot((doc) => {
                if (doc.exists) {
                    const data = doc.data();
                    const scores = data!.scores || {};
                    const opponentId = Object.keys(scores).find((id) => id !== userId);
                    if (opponentId) {
                        setOpponentScore(scores[opponentId] || 0);
                    }
                    setGlobalScore(data!.scores[userId!] || 0);
                    setGlobalScore((scores[userId!] || 0) + localScore);
                }
            });

        return () => unsubscribe();
    }, [roomId, userId, opponentId, localScore]);

    useEffect(() => {
        const interval = setInterval(() => {
            if (localScore > 0) {

                firestore()
                    .collection('gameRooms')
                    .doc(roomId)
                    .update({
                        [`scores.${userId}`]: globalScore,
                    });

                setLocalScore(0);
            }
        }, 500);

        return () => clearInterval(interval);
    }, [localScore, globalScore, roomId, userId]);

    useEffect(() => {
        const timer = setInterval(() => {
            setCountdown((prev) => prev - 1);
        }, 1000);

        if (countdown === 0) {
            clearInterval(timer);
            handleGameEnd();
        }

        return () => clearInterval(timer);
    }, [countdown]);

    const handleGameEnd = async () => {
        try {
            navigation.navigate('Result', { roomId, game });
        } catch (error) {
            console.error('Error ending game:', error);
        }
    };

    const handleTouch = (event: any) => {
        const { locationX, locationY } = event.nativeEvent;

        // Cập nhật vị trí nhấn
        setTouchPosition({ x: locationX, y: locationY });

        // Tính toán thời gian giữa các lần nhấn
        const currentTime = Date.now();
        if (lastTouchTime) {
            const timeDiff = currentTime - lastTouchTime;

            // Nếu thời gian giữa các lần nhấn nhỏ hơn ngưỡng (ví dụ: 200ms)
            if (timeDiff < 200) {
                setShowMessage(true);

                // Ẩn thông báo sau một thời gian ngắn
                setTimeout(() => setShowMessage(false), 1000);
            }
        }
        setLastTouchTime(currentTime);

        // Random icon logic
        const randomIndex = Math.floor(Math.random() * icons.length);
        setRandomIcon(icons[randomIndex]);

        // Animation logic
=======
    const handleTouch = (event) => {
        const currentTime = new Date().getTime();
        const timeDifference = currentTime - lastTouchTime;

        setLastTouchTime(currentTime);

        if (timeDifference < 150) {
            setShowMessage(true);
            setTimeout(() => setShowMessage(false), 1000);
        }
        if (score >= 2) {
            setScore(0); // Đặt lại điểm số
            navigation.navigate('Rankings'); // Điều hướng đến trang tiếp theo
        } else {
            setScore(score + 1); // Tăng điểm số nếu < 10
        }

        const { locationX, locationY } = event.nativeEvent;
        setTouchPosition({ x: locationX, y: locationY });

        const randomIndex = Math.floor(Math.random() * icons.length);
        setRandomIcon(icons[randomIndex]);

>>>>>>> b19083247395aec8135ea41e63760732b49f483b
        fadeAnim.setValue(1);
        Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
        }).start();
<<<<<<< HEAD

        // Cập nhật điểm
        setLocalScore((prev) => prev + 1);
    };


=======
    };

>>>>>>> b19083247395aec8135ea41e63760732b49f483b
    return (
        <ImageBackground source={BACKGROUND_GAME_SHOOTTHESCREW} style={styles.background} resizeMode="stretch">
            <RoundBackButton
                containerStyle={styles.buttonBack}
            />
            <View style={styles.vierwavatar}>
                <View style={{ justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                    <ImageBackground source={FRAME_AVATAR_LEFT} style={styles.frameavatar} resizeMode="stretch">
<<<<<<< HEAD
                        <Text style={styles.bottomRightText}>{globalScore}</Text>
                    </ImageBackground>
                    <Text style={styles.username}>Bạn</Text>
=======
                        <Text style={styles.bottomRightText}>{score}</Text>
                    </ImageBackground>
                    <Text style={styles.username}>Nguyễn Trần Ngọc Hân</Text>
>>>>>>> b19083247395aec8135ea41e63760732b49f483b
                </View>
                <Image source={ICON_VS} style={styles.iconVS} />
                <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                    <ImageBackground source={FRAME_AVATAR_RIGHT} style={styles.frameavatar} resizeMode="stretch">
<<<<<<< HEAD
                        <Text style={styles.bottomLeftText}>{opponentScore}</Text>
                    </ImageBackground>
                    <Text style={styles.username}>Đối thủ</Text>
                </View>
            </View>
            <Text style={styles.text}>THÁNH ÁNH</Text>
            <TouchableWithoutFeedback onPress={handleTouch}>
                <ImageBackground source={FRAME_GAME_GOLDEN_SAINT} style={styles.frameGame} resizeMode='stretch'>
                    <ImageBackground style={styles.time} source={FRAME_TIME}>
                        <Text style={{ fontSize: scale(12), fontFamily: 'SVN-Cookies', color: LightTheme.colorScheme.borderLabel }}>{formatTime(countdown)}</Text>
                    </ImageBackground>
=======
                        <Text style={styles.bottomLeftText}>{score}</Text>
                    </ImageBackground>
                    <Text style={styles.username}>Nguyễn Lương Kiên Hào</Text>
                </View>
            </View>
            <Text style={styles.text}>THÁNH ÁNH KIM</Text>
            <TouchableWithoutFeedback onPress={handleTouch}>
                <ImageBackground source={FRAME_GAME_GOLDEN_SAINT} style={styles.frameGame} resizeMode='stretch'>
                    <ImageBackground source={FRAME_TIME} style={styles.time} resizeMode='center' />
>>>>>>> b19083247395aec8135ea41e63760732b49f483b
                    {touchPosition && randomIcon && (
                        <Animated.Image
                            source={randomIcon.icon} // Lấy icon từ randomIcon
                            style={{
                                left: touchPosition.x,
                                top: touchPosition.y,
                                opacity: fadeAnim,
                                width: randomIcon.width,
                                height: randomIcon.height,
                                zIndex: 1
                            }}
                        />
                    )}
                    {showMessage && (
                        <Text style={styles.message}>BỀN MÀU</Text>
                    )}
                </ImageBackground>
            </TouchableWithoutFeedback>
        </ImageBackground>
    );
};

export const GamePlayGoldenSaint = React.memo(_GamePlayGoldenSaint);
