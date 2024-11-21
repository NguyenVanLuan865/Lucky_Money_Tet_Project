import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Image, ImageBackground, SafeAreaView, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BACKGROUND_WAITING, FRAME_AVATAR, ICON_FACE } from '../../../../../assets';
import { FlatButton, RoundBackButton } from '../../../component';
import { styles } from './WaitingLuckeyMoney.style';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, } from '../../../shared-state';
import { listenAndMatchPlayers } from '../../../../data/data-source/user/matchService';


const _WaitingLuckeyMoney: React.FC = ({ route }: any) => {
    const { playerName, game } = route.params;
    const [timeElapsed, setTimeElapsed] = useState<number>(0);
    const navigation = useNavigation();
    const { userId, opponentId, status } = useSelector((state: RootState) => state.matchQueue);

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;

        const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
        const formattedSeconds = remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds;

        return `${formattedMinutes}:${formattedSeconds}`;
    };

    useEffect(() => {
        let isMounted = true; // Đảm bảo component chưa unmount
        const unsubscribe = listenAndMatchPlayers(game, (roomId, player1, player2) => {
            if (isMounted) {
                console.log(`Matched: ${player1} vs ${player2} in room ${roomId}`);
                console.log('Navigating with:', { roomId, game, player1, player2 });
                navigation.navigate('FindOpponents', { roomId, game, player1, player2 });
                unsubscribe();
            }
        });

        return () => {
            isMounted = false;
            if (unsubscribe) {
                unsubscribe();
            }
        };
    }, [navigation, game]);

    useEffect(() => {
        setTimeElapsed(0);

        const timer = setInterval(() => {
            setTimeElapsed((prev) => prev + 1);
        }, 1000);

        return () => {
            clearInterval(timer);
        };
    }, []); 

    const [dots, setDots] = useState<string>('');

    useEffect(() => {
        const interval = setInterval(() => {
            setDots((prev) => (prev.length < 3 ? prev + '.' : ''));
        }, 500);

        return () => {
            clearInterval(interval);
        };
    }, []);

    return (
        <ImageBackground source={BACKGROUND_WAITING} style={styles.background} resizeMode="stretch">
            <RoundBackButton
                containerStyle={styles.buttonBack}
            />
            {game == 'game1' && (
                <Text style={styles.text1}>Đáp nhanh tranh lì xì</Text>
            )}
            {game == 'game2' && (
                <Text style={styles.text1}>Thử tài bắn vít</Text>
            )}
            {game == 'game4' && (
                <Text style={styles.text1}>Thánh Ánh Kim</Text>
            )}
            <Text style={styles.text2}>Đang tìm đối thủ{dots}</Text>
            <ImageBackground source={FRAME_AVATAR} style={styles.frameavatar} resizeMode='stretch'>
                <Image source={ICON_FACE} style={styles.avatar} />
            </ImageBackground>
            <Text style={styles.username}>Nguyễn Trần Ngọc Hân</Text>
            <Text style={styles.time}>{formatTime(timeElapsed)}</Text>
        </ImageBackground>
    );
};

export const WaitingLuckeyMoney = React.memo(_WaitingLuckeyMoney);
