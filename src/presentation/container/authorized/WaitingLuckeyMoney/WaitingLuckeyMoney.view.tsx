import React, { useState, useEffect } from 'react';
import { Image, ImageBackground, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BACKGROUND_WAITING, FRAME_AVATAR, ICON_FACE } from '../../../../../assets';
import { FlatButton, RoundBackButton } from '../../../component';
import { styles } from './WaitingLuckeyMoney.style';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, } from '../../../shared-state';
import { listenAndMatchPlayers } from '../../../../data/data-source/user/matchService';
import firestore from '@react-native-firebase/firestore';


const _WaitingLuckeyMoney: React.FC = ({ route }: any) => {
    const { playerName, game } = route.params;
    const [timeElapsed, setTimeElapsed] = useState<number>(0);
    const navigation = useNavigation();
    const { userId, opponentId, status } = useSelector((state: RootState) => state.matchQueue);
    const [isMatching, setIsMatching] = useState<boolean>(true);
    const [userName, setUserName] = useState<string | null>(null);
    const token = useSelector((state: RootState) => state.authentication.token);
    console.log('tên: ',playerName)
    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;

        const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
        const formattedSeconds = remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds;

        return `${formattedMinutes}:${formattedSeconds}`;
    };
    useEffect(() => {
        const fetchUserName = async () => {
            try {
                const userDoc = await firestore().collection('users').doc(token!).get();
                if (userDoc.exists) {
                    setUserName(userDoc.data()?.name || 'Tên không tồn tại');
                } else {
                    setUserName('Người dùng không tồn tại');
                }
            } catch (error) {
                console.error('Lỗi khi lấy tên người dùng:', error);
                setUserName('Lỗi khi tải dữ liệu');
            }
        };

        fetchUserName();
    }, [userId]);
    useEffect(() => {
        let isMounted = true;
        const unsubscribe = listenAndMatchPlayers(game, (roomId, player1, player2) => {
            if (isMounted) {
                console.log(`Matched: ${player1} vs ${player2} in room ${roomId}`);
                console.log('Navigating with:', { roomId, game, player1, player2 });
                setIsMatching(false);
                clearTimers();
                console.log(game)
                navigation.replace('FindOpponents', { roomId, game, player1, player2 });
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
        if (!isMatching) return;
        setTimeElapsed(0);

        const timer = setInterval(() => {
            setTimeElapsed((prev) => prev + 1);
        }, 1000);

        return () => {
            clearInterval(timer);
        };
    }, []);

    const clearTimers = () => {
        setTimeElapsed(0);
        setDots('');
    };

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
            {game == 'game3' && (
                <Text style={styles.text1}>Anh Hùng Siêu Bảo Vệ</Text>
            )}
            {game == 'game4' && (
                <Text style={styles.text1}>Thánh Ánh Kim</Text>
            )}
            <Text style={styles.text2}>Đang tìm đối thủ{dots}</Text>
            <ImageBackground source={FRAME_AVATAR} style={styles.frameavatar} resizeMode='stretch'>
                <Image source={ICON_FACE} style={styles.avatar} />
            </ImageBackground>
            <Text style={styles.username}>{userName}</Text>
            <Text style={styles.time}>{formatTime(timeElapsed)}</Text>
        </ImageBackground>
    );
};

export const WaitingLuckeyMoney = React.memo(_WaitingLuckeyMoney);
