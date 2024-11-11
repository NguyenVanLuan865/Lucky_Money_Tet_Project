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
    };

    return (
        <ImageBackground source={BACKGROUND_GAME_SHOOTTHESCREW} style={styles.background} resizeMode="stretch">
            <RoundBackButton
                containerStyle={styles.buttonBack}
            />
            <View style={styles.vierwavatar}>
                <View style={{ justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                    <ImageBackground source={FRAME_AVATAR_LEFT} style={styles.frameavatar} resizeMode="stretch">
                        <Text style={styles.bottomRightText}>{score}</Text>
                    </ImageBackground>
                    <Text style={styles.username}>Nguyễn Trần Ngọc Hân</Text>
                </View>
                <Image source={ICON_VS} style={styles.iconVS} />
                <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                    <ImageBackground source={FRAME_AVATAR_RIGHT} style={styles.frameavatar} resizeMode="stretch">
                        <Text style={styles.bottomLeftText}>{score}</Text>
                    </ImageBackground>
                    <Text style={styles.username}>Nguyễn Lương Kiên Hào</Text>
                </View>
            </View>
            <Text style={styles.text}>THỬ TÀI BẮN VÍT</Text>
            <TouchableWithoutFeedback onPress={handleTouch}>
                <ImageBackground source={FRAME_GAME_SHOOTTHSCREW } style={styles.frameGame} resizeMode='stretch'>
                    <ImageBackground source={FRAME_TIME} style={styles.time} resizeMode='center' />
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
                        <Text style={styles.message}>THI CÔNG NGON</Text>
                    )}
                    <TouchableWithoutFeedback onPress={handleTouch}>
                        <Image source={ICON_DRILL} style={styles.drill} />
                    </TouchableWithoutFeedback>

                    <TouchableWithoutFeedback onPress={handleTouch}>
                        <Image source={FRAME_ACESSSORRY} style={styles.frameaccessory} />
                    </TouchableWithoutFeedback>

                </ImageBackground>
            </TouchableWithoutFeedback>
        </ImageBackground>
    );
};

export const GamePlay = React.memo(_GamePlay);
