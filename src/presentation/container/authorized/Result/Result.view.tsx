import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, ImageBackground, Alert } from 'react-native';
import { FlatButton, RoundBackButton } from '../../../component';
import { BACKGROUND_FINDOPPONENTS, YOU_LOSE } from '../../../../../assets';
import { scaleHeight, scaleWidth, scale, HEIGHT, LightTheme, WITDH } from '../../../resource/values';
import { styles } from './Result.style';
import LinearGradient from 'react-native-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import { useSelector } from 'react-redux';
import { RootState } from '../../../shared-state';
const _Result: React.FC = ({ route }: any) => {
    const { roomId, } = route.params;
    const [userScore, setUserScore] = useState<number>(0);
    const [opponentScore, setOpponentScore] = useState<number>(0);
    const [didWin, setDidWin] = useState<boolean | null>(null);
    const userId = useSelector((state: RootState) => state.authentication.token);

    const navigation = useNavigation();
    useEffect(() => {
        const fetchScores = async () => {
            try {
                const roomDoc = await firestore()
                    .collection('gameRooms')
                    .doc(roomId)
                    .get();

                if (roomDoc.exists) {
                    const data = roomDoc.data();
                    const scores = data?.scores || {};

                    // Lấy điểm của người chơi hiện tại
                    // const userScore = scores[userId];

                    // Tìm đối thủ
                    const opponentId = Object.keys(scores).find((id) => id !== userId);
                    const opponentScore = opponentId ? scores[opponentId] : 0;
                    const USERID = Object.keys(scores).find((id) => id == userId);
                    const userScore = USERID ? scores[USERID] : 0;
                    console.log('điểm của tooiL', userScore, 'id', userId)
                    console.log('điểm của đối thủ ', opponentScore, 'id', opponentId)
                    // Kiểm tra và điều hướng
                    if (userScore >= opponentScore) {
                        navigation.navigate('Win', { userScore, opponentScore, roomId, userId });
                    } else {
                        navigation.navigate('Congress');
                    }
                } else {
                    Alert.alert('Error', 'Room data not found.');
                }
            } catch (error) {
                console.error('Error fetching scores:', error);
                Alert.alert('Error', 'Unable to fetch game results.');
            }
        };

        fetchScores(); // Gọi hàm ngay khi component được render
    }, [roomId, userId, navigation]);



    return (
        <ImageBackground source={BACKGROUND_FINDOPPONENTS} style={styles.background} resizeMode="stretch">
            <RoundBackButton containerStyle={styles.buttonBack} />
            <MaskedView
                style={styles.header}
                maskElement={<Text style={styles.textheader}>KẾT QUẢ</Text>}
            >
                <LinearGradient
                    colors={['#FCD60E', '#FFF9E1', '#FCD60E']}
                    locations={[0.1, 0.3, 0.9]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={{ flex: 1, height: '100%' }}
                />
            </MaskedView>
        </ImageBackground>
    );
};

export const Result = React.memo(_Result);
