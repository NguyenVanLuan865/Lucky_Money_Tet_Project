<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    View,
    Image,
    ImageBackground,
    Text,
    Animated,
    TouchableWithoutFeedback,
    Alert,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {
    BACKGROUND_GAME_SHOOTTHESCREW,
    FRAME_AVATAR_LEFT,
    FRAME_AVATAR_RIGHT,
    ICON_VS,
    FRAME_GAME_SHOOTTHSCREW,
    ICON_DRILL,
    FRAME_ACESSSORRY,
    ICON_SHOOT_1,
    ICON_SHOOT_2,
    ICON_SHOOT_3,
    FRAME_TIME,
} from '../../../../../../../assets';
import { styles } from './GamePlaye.style';
import { RoundBackButton } from '../../../../../component';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../shared-state';
import { scale, scaleHeight, scaleWidth , LightTheme} from '../../../../../resource';
import { useNavigation } from '@react-navigation/native';

const _GamePlay: React.FC = ({ route }: any) => {
    const { roomId , game} = route.params;
    const [localScore, setLocalScore] = useState(0); // Điểm của người chơi hiện tại
    const [opponentScore, setOpponentScore] = useState(0); 
    const [globalScore, setGlobalScore] = useState(0); 
    const [countdown, setCountdown] = useState(30); 
    const userId = useSelector((state: RootState) => state.authentication.token);
    const opponentId = useSelector((state: RootState) => state.matchQueue.opponentId);
    const [touchPosition, setTouchPosition] = useState<{ x: number; y: number } | null>(null);
    const [fadeAnim] = useState(new Animated.Value(1));
    const [randomIcon, setRandomIcon] = useState(null);
    const icons = [
        { icon: ICON_SHOOT_1, width: scaleWidth(63), height: scaleHeight(62.5) },
        { icon: ICON_SHOOT_2, width: scaleWidth(66), height: scaleHeight(58.5) },
        { icon: ICON_SHOOT_3, width: scaleWidth(81), height: scaleHeight(78) },
    ];
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
    }, [roomId, userId, opponentId,localScore]);

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
=======
import React, { useState } from 'react';
import { StyleSheet, View, Image, ImageBackground, Text, Animated, TouchableWithoutFeedback, Pressable } from 'react-native';
import { BACKGROUND_GAME_SHOOTTHESCREW, FRAME_AVATAR_LEFT, FRAME_AVATAR_RIGHT, FRAME_TIME, ICON_VS, FRAME_GAME_SHOOTTHSCREW , ICON_DRILL, FRAME_ACESSSORRY, ICON_SHOOT_1, ICON_SHOOT_2, ICON_SHOOT_3 } from '../../../../../../../assets';
import { styles } from './GamePlaye.style';
import { scaleHeight, scaleWidth } from '../../../../../resource';
import { RoundBackButton } from '../../../../../component';
const _GamePlay: React.FC = () => {
    const [score, setScore] = useState(0);
    const [touchPosition, setTouchPosition] = useState<{ x: number, y: number } | null>(null);
    const [fadeAnim] = useState(new Animated.Value(1));
    const [randomIcon, setRandomIcon] = useState(null);
    const [showMessage, setShowMessage] = useState(false);
    const [lastTouchTime, setLastTouchTime] = useState(0);

    const icons = [
        { icon: ICON_SHOOT_1, width: scaleWidth(63), height: scaleHeight(62.5) },
        { icon: ICON_SHOOT_2, width: scaleWidth(66), height: scaleHeight(58.5) },
        { icon: ICON_SHOOT_3, width: scaleWidth(81), height: scaleHeight(78) }
    ];

    const handleTouch = (event) => {
        const currentTime = new Date().getTime();
        const timeDifference = currentTime - lastTouchTime;

        setLastTouchTime(currentTime);

        if (timeDifference < 150) {
            setShowMessage(true);
            setTimeout(() => setShowMessage(false), 1000);
        }

        setScore(score + 1);

>>>>>>> b19083247395aec8135ea41e63760732b49f483b
        const { locationX, locationY } = event.nativeEvent;
        setTouchPosition({ x: locationX, y: locationY });

        const randomIndex = Math.floor(Math.random() * icons.length);
        setRandomIcon(icons[randomIndex]);

        fadeAnim.setValue(1);
        Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
        }).start();
<<<<<<< HEAD

        setLocalScore((prev) => prev + 1); 
=======
>>>>>>> b19083247395aec8135ea41e63760732b49f483b
    };

    return (
        <ImageBackground source={BACKGROUND_GAME_SHOOTTHESCREW} style={styles.background} resizeMode="stretch">
<<<<<<< HEAD
            <RoundBackButton containerStyle={styles.buttonBack} />
            <View style={styles.vierwavatar}>
                <View style={{ justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                    <ImageBackground source={FRAME_AVATAR_LEFT} style={styles.frameavatar} resizeMode="stretch">
                        <Text style={styles.bottomRightText}>{globalScore}</Text>
                    </ImageBackground>
                    <Text style={styles.username}>Bạn</Text>
=======
            <RoundBackButton
                containerStyle={styles.buttonBack}
            />
            <View style={styles.vierwavatar}>
                <View style={{ justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                    <ImageBackground source={FRAME_AVATAR_LEFT} style={styles.frameavatar} resizeMode="stretch">
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
=======
                        <Text style={styles.bottomLeftText}>{score}</Text>
                    </ImageBackground>
                    <Text style={styles.username}>Nguyễn Lương Kiên Hào</Text>
>>>>>>> b19083247395aec8135ea41e63760732b49f483b
                </View>
            </View>
            <Text style={styles.text}>THỬ TÀI BẮN VÍT</Text>
            <TouchableWithoutFeedback onPress={handleTouch}>
<<<<<<< HEAD
                <ImageBackground source={FRAME_GAME_SHOOTTHSCREW} style={styles.frameGame} resizeMode="stretch">
                    <ImageBackground style={styles.time} source={FRAME_TIME}>
                        <Text style={{fontSize: scale(12), fontFamily: 'SVN-Cookies', color: LightTheme.colorScheme.borderLabel}}>{formatTime(countdown)}</Text>
                    </ImageBackground>
                    {touchPosition && randomIcon && (
                        <Animated.Image
                            source={randomIcon.icon}
=======
                <ImageBackground source={FRAME_GAME_SHOOTTHSCREW } style={styles.frameGame} resizeMode='stretch'>
                    <ImageBackground source={FRAME_TIME} style={styles.time} resizeMode='center' />
                    {touchPosition && randomIcon && (
                        <Animated.Image
                            source={randomIcon.icon} // Lấy icon từ randomIcon
>>>>>>> b19083247395aec8135ea41e63760732b49f483b
                            style={{
                                left: touchPosition.x,
                                top: touchPosition.y,
                                opacity: fadeAnim,
                                width: randomIcon.width,
                                height: randomIcon.height,
<<<<<<< HEAD
                                zIndex: 1,
                            }}
                        />
                    )}
=======
                                zIndex: 1
                            }}
                        />
                    )}
                    {showMessage && (
                        <Text style={styles.message}>THI CÔNG NGON</Text>
                    )}
                    <TouchableWithoutFeedback onPress={handleTouch}>
                        <Image source={ICON_DRILL} style={styles.drill} />
                    </TouchableWithoutFeedback>

                    <TouchableWithoutFeedback onPress={handleTouch}>
                        <Image source={FRAME_ACESSSORRY} style={styles.frameaccessory} />
                    </TouchableWithoutFeedback>

>>>>>>> b19083247395aec8135ea41e63760732b49f483b
                </ImageBackground>
            </TouchableWithoutFeedback>
        </ImageBackground>
    );
};

export const GamePlay = React.memo(_GamePlay);
