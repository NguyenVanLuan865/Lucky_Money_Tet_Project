<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, ImageBackground, Alert } from 'react-native';
import { FlatButton, RoundBackButton } from '../../../component';
import { BACKGROUND_FINDOPPONENTS, FRAME_AVATAR, AVATAR_LEFT, AVATAR_RIGHT } from '../../../../../assets';
=======
import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, ImageBackground } from 'react-native';
import { FlatButton, RoundBackButton } from '../../../component';
import { BACKGROUND_FINDOPPONENTS, FRAME_AVATAR } from '../../../../../assets';
>>>>>>> b19083247395aec8135ea41e63760732b49f483b
import { scaleHeight, scaleWidth, scale, HEIGHT, LightTheme, WITDH } from '../../../resource/values';
import { styles } from './FindOpponents.style';
import LinearGradient from 'react-native-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';
import { useNavigation } from '@react-navigation/native';
<<<<<<< HEAD
import firestore from '@react-native-firebase/firestore';
import { useSelector } from 'react-redux';
import { RootState } from '../../../shared-state';
import { getPlayerNamesAndClassify } from '../../../../data/data-source/user';
import { createGameRoom } from '../../../../data/data-source/user/matchService';
const _FindOpponents: React.FC = ({ route }: any) => {

    type Question = {
        id: string;
        question: string;
        A: string;
        B: string;
        C: string;
        D: string;
        answer: string;
    };

    const navigation = useNavigation();
    const { roomId } = route.params as { roomId: string };
    const { game, player1, player2 } = route.params;
    console.log('Received params:', { roomId, game, player1, player2 });
    const [countdown, setCountdown] = useState(5);
    const userId = useSelector((state: RootState) => state.authentication.token);
    const [opponentName, setOpponentName] = useState<string>(''); // Tên đối thủ
    const [username, setUsername] = useState<string>('');
    useEffect(() => {
        const fetchNames = async () => {
            try {
                // Xác định đối thủ
                const opponentId = userId === player1 ? player2 : player1;

                // Lấy tên người dùng hiện tại
                const userDoc = await firestore().collection('users').doc(userId!).get();
                const userName = userDoc.data()?.name || 'Unknown';

                // Lấy tên đối thủ
                const opponentDoc = await firestore().collection('users').doc(opponentId).get();
                const opponentUserName = opponentDoc.data()?.name || 'Unknown';

                // Cập nhật state
                setUsername(userName);
                setOpponentName(opponentUserName);

                // Log kết quả
                console.log('Your Name:', userName);
                console.log('Opponent Name:', opponentUserName);
            } catch (error) {
                console.error('Error fetching user names:', error);
            }
        };

        fetchNames();
    }, [player1, player2, userId]);


    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;

        const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
        const formattedSeconds = remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds;

        return `${formattedMinutes}:${formattedSeconds}`;
    };

    useEffect(() => {
        const timer = setInterval(() => {
            setCountdown((prev) => prev - 1);
        }, 1000);


        if (countdown === 0) {
            clearInterval(timer);
            startGame();
        }

        return () => clearInterval(timer);
    }, [countdown]);

    const fetchQuestions = async () => {
        try {
            const snapshot = await firestore().collection('question').limit(5).get();

            const questions = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));

            console.log('Câu hỏi:', questions);
            return questions;
        } catch (error) {
            console.error('Lỗi khi lấy câu hỏi:', error);
            throw new Error('Không thể lấy câu hỏi.');
        }
    };

    const initializeGameRoom = async (roomId: string, questionSet: Question[]): Promise<void> => {
        try {
            await firestore().collection('gameRooms').doc(roomId).update({
                questions: questionSet.map((question: Question, index: number) => ({
                    ...question,
                    questionIndex: index,
                    player1Answer: null,
                    player2Answer: null,
                })),
            });
            console.log('Game room initialized with questions.');
        } catch (err) {
            console.error('Error initializing game room:', err);
            throw new Error('Failed to initialize game room.');
        }
    };

    // Hàm bắt đầu trò chơi
    const startGame = async () => {
        try {
            if (game === 'game1') {
                const questionSet = await fetchQuestions();
                await initializeGameRoom(roomId, questionSet);
            } else {
                try {
                    const roomId = await createGameRoom(player1, player2, game);
                    console.log('Room ID:', roomId);
                } catch (error) {
                    console.error('Error creating game room:', error);
                }
                console.log('Game room initialized for non-question game.');
            }
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
        
            navigation.navigate(screenName, { roomId, game });
        } catch (err) {
            console.error('Error starting game:', err);
            Alert.alert('Error', 'Failed to start the game.');
        }
=======
const _FindOpponents: React.FC = () => {

    const navigation = useNavigation();

    const handlePress = () => {
        navigation.navigate('Win'); 
>>>>>>> b19083247395aec8135ea41e63760732b49f483b
    };

    return (

        <ImageBackground source={BACKGROUND_FINDOPPONENTS} style={styles.background} resizeMode="stretch">
            <RoundBackButton
                containerStyle={styles.buttonBack}
            />
            <MaskedView
                style={styles.header}
                maskElement={
                    <Text style={styles.textheader}>THÁNH LÌ XÌ</Text>
                }
            >
                <LinearGradient
                    colors={['#FCD60E', '#FFF9E1', '#FCD60E']}
                    locations={[0.1, 0.3, 0.9]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={{ flex: 1, height: '100%' }}
                />
            </MaskedView>
            <View style={styles.labelframeavatar}>

                <View style={{ flex: 1 }}>
                    <ImageBackground source={FRAME_AVATAR} style={[styles.frameavatar]} resizeMode='stretch'>
<<<<<<< HEAD
                        <Image source={AVATAR_LEFT} style={styles.avatar} />
                    </ImageBackground>
                    <Text style={[styles.text, { color: LightTheme.colorScheme.primaryText, textShadowColor: LightTheme.colorScheme.secondaryText, width: scaleWidth(75)}]}>{username}</Text>
                </View>
                <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'flex-end', }}>
                    <ImageBackground source={FRAME_AVATAR} style={[styles.frameavatar]} resizeMode='stretch'>
                        <Image source={AVATAR_RIGHT} style={styles.avatar} />

                    </ImageBackground>
                    <Text style={[styles.text, { color: '#FCD60E', textShadowColor: 'black'}]}>{opponentName}</Text>

                </View>
            </View>
            <Text style={styles.time}>{formatTime(countdown)}</Text>
            {/* <FlatButton
                title={'Chơi'}
                containerStyle={{ marginTop: scale(40) }}
            // onPress={handlePress} */}

            <FlatButton
                title={'Hủy'}
                containerStyle={{ marginTop: scale(16) }}
                onPress={() => navigation.goBack()}
=======

                    </ImageBackground>
                    <Text style={[styles.text, { color: LightTheme.colorScheme.primaryText, textShadowColor: LightTheme.colorScheme.secondaryText, }]}>Username1</Text>
                </View>
                <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                    <ImageBackground source={FRAME_AVATAR} style={[styles.frameavatar]} resizeMode='stretch'>

                    </ImageBackground>
                    <Text style={[styles.text, { color: '#FCD60E', textShadowColor: 'black', }]}>Username1</Text>

                </View>
            </View>
            <Text style={styles.time}>00:05</Text>
            <FlatButton
                title={'Chơi'}
                containerStyle={{marginTop: scale(40)}}
                onPress={handlePress}
            />
            <FlatButton
                title={'Hủy'}
>>>>>>> b19083247395aec8135ea41e63760732b49f483b
            />
        </ImageBackground>
    );
};

export const FindOpponents = React.memo(_FindOpponents)

