import React, { useState, useRef } from 'react';
import {
    StyleSheet,
    View,
    ImageBackground,
    Text,
    Animated,
    TouchableWithoutFeedback,
    Image
} from 'react-native';
import {
    BACKGROUND_GAME_SHOOTTHESCREW,
    FRAME_AVATAR_LEFT,
    FRAME_AVATAR_RIGHT,
    ICON_VS,
    FRAME_GAME_SHOOTTHSCREW,
    ICON_SHOOT_1,
    ICON_SHOOT_2,
    ICON_SHOOT_3,
    FRAME_TIME,
    ICON_DRILL
} from '../../../../../../../assets';
import { styles } from './GamePlaye.style';
import { RoundBackButton } from '../../../../../component';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../shared-state';
import { scale, scaleHeight, scaleWidth, LightTheme } from '../../../../../resource';
import { useGameLogic } from '../../../../../hook';

const _GamePlay: React.FC = ({ route }: any) => {
    const { roomId, game , username , opponentName} = route.params;

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes < 10 ? `0${minutes}` : minutes}:${remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds}`;
    };

    const icons = [
        { icon: ICON_SHOOT_1, width: scaleWidth(63), height: scaleHeight(62.5) },
        { icon: ICON_SHOOT_2, width: scaleWidth(66), height: scaleHeight(58.5) },
        { icon: ICON_SHOOT_3, width: scaleWidth(81), height: scaleHeight(78) },
    ];

    const {
        countdown,
        globalScore,
        opponentScore,
        handleTouch,
    } = useGameLogic({
        roomId,
        userId: useSelector((state: RootState) => state.authentication.token),
        game,
        icons,
        enableReminder: true,
        reminderThreshold: 15,
        reminderDuration: 2000,
    });

    const [activeIcons, setActiveIcons] = useState<any[]>([]);

    const handleTouchWithIcons = (event: any) => {
        const { locationX, locationY } = event.nativeEvent;

        const randomIndex = Math.floor(Math.random() * icons.length);
        const newIcon = {
            id: Date.now(),
            x: locationX,
            y: locationY,
            icon: icons[randomIndex],
            fadeAnim: new Animated.Value(1),
        };

        setActiveIcons((prev) => [...prev, newIcon]);

        Animated.timing(newIcon.fadeAnim, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
        }).start(() => {

            setActiveIcons((prev) => prev.filter((icon) => icon.id !== newIcon.id));
        });

        handleTouch(event); 
    };

    return (
        <ImageBackground source={BACKGROUND_GAME_SHOOTTHESCREW} style={styles.background} resizeMode="stretch">
            <RoundBackButton containerStyle={styles.buttonBack} />
            <View style={styles.vierwavatar}>
                <View style={{ justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                    <ImageBackground source={FRAME_AVATAR_LEFT} style={styles.frameavatar} resizeMode="stretch">
                        <Text style={styles.bottomRightText}>{globalScore}</Text>
                    </ImageBackground>
                    <Text style={styles.username}>{username}</Text>
                </View>
                <Image source={ICON_VS} style={styles.iconVS} />
                <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                    <ImageBackground source={FRAME_AVATAR_RIGHT} style={styles.frameavatar} resizeMode="stretch">
                        <Text style={styles.bottomLeftText}>{opponentScore}</Text>
                    </ImageBackground>
                    <Text style={styles.username}>{opponentName}</Text>
                </View>
            </View>
            <Text style={styles.text}>THỬ TÀI BẮN VÍT</Text>
            <TouchableWithoutFeedback onPress={handleTouchWithIcons}>
                <ImageBackground source={FRAME_GAME_SHOOTTHSCREW} style={styles.frameGame} resizeMode="stretch">
                    <ImageBackground style={styles.time} source={FRAME_TIME}>
                        <Text
                            style={{
                                fontSize: scale(12),
                                fontFamily: 'SVN-Cookies',
                                color: LightTheme.colorScheme.borderLabel,
                            }}
                        >
                            {formatTime(countdown)}
                        </Text>
                    </ImageBackground>
                    {activeIcons.map((icon) => (
                        <>
                            <Animated.Image
                                key={icon.id}
                                source={icon.icon.icon}
                                style={{
                                    position: 'absolute',
                                    left: icon.x,
                                    top: icon.y,
                                    opacity: icon.fadeAnim,
                                    width: icon.icon.width,
                                    height: icon.icon.height,
                                    zIndex: 1,
                                }}
                            />
                            <Animated.Image
                                source={ICON_DRILL}
                                style={{
                                    position: 'absolute',
                                    left: scaleWidth(45),
                                    top: scaleHeight(158),
                                    opacity: icon.fadeAnim,
                                    width:scaleWidth(183),
                                    height: scaleHeight(229),
                                    zIndex: 1,
                                }}
                            />
                        </>


                    ))}
                </ImageBackground>
            </TouchableWithoutFeedback>
        </ImageBackground>
    );
};

export const GamePlay = React.memo(_GamePlay);
