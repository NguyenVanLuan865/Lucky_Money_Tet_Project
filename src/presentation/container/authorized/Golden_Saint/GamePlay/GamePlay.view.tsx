import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Image, ImageBackground, Text, Animated, TouchableWithoutFeedback, Pressable } from 'react-native';
import { BACKGROUND_GAME_SHOOTTHESCREW, FRAME_AVATAR_LEFT, FRAME_AVATAR_RIGHT, FRAME_TIME, ICON_VS, FRAME_GAME_GOLDEN_SAINT, ICON_DRILL, FRAME_ACESSSORRY, ICON_SAINT_1, ICON_SAINT_2, ICON_SAINT_3 } from '../../../../../../assets';
import { styles } from './GamePlaye.style';
import { scaleHeight, scaleWidth, scale, LightTheme } from '../../../../resource';
import { RoundBackButton } from '../../../../component';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../shared-state';
import { useGameLogic } from '../../../../hook';

const _GamePlayGoldenSaint: React.FC = ({route}: any) => {
    const { roomId, game , username , opponentName} = route.params;
    const icons = [
        { icon: ICON_SAINT_1, width: scaleWidth(84.71), height: scaleHeight(60.35) },
        { icon: ICON_SAINT_2, width: scaleWidth(69.13), height: scaleHeight(46.32) },
        { icon: ICON_SAINT_3, width: scaleWidth(69.13), height: scaleHeight(46.32) }
    ];

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;

        const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
        const formattedSeconds = remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds;

        return `${formattedMinutes}:${formattedSeconds}`;
    };
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
                <View style={{ justifyContent: 'flex-start',  alignItems: 'center'  }}>
                    <ImageBackground source={FRAME_AVATAR_LEFT} style={styles.frameavatar} resizeMode="stretch">
                        <Text style={styles.bottomRightText}>{globalScore}</Text>
                    </ImageBackground>
                    <Text style={styles.username}>{username}</Text>
                </View>
                <Image source={ICON_VS} style={styles.iconVS} />
                <View style={{ justifyContent: 'flex-end', alignItems: 'center' }}>
                    <ImageBackground source={FRAME_AVATAR_RIGHT} style={styles.frameavatar} resizeMode="stretch">
                        <Text style={styles.bottomLeftText}>{opponentScore}</Text>
                    </ImageBackground>
                    <Text style={styles.username}>{opponentName}</Text>
                </View>
            </View>
            <Text style={styles.text}>THÁNH ÁNH KIM</Text>
            <TouchableWithoutFeedback onPress={handleTouchWithIcons}>
                <ImageBackground source={FRAME_GAME_GOLDEN_SAINT} style={styles.frameGame} resizeMode="stretch">
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
                        </>

                   ))}
                </ImageBackground>
            </TouchableWithoutFeedback>
        </ImageBackground>
    );
};


export const GamePlayGoldenSaint = React.memo(_GamePlayGoldenSaint);
