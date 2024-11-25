import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Modal, Image, ImageBackground, Alert, Button } from 'react-native';
import { FlatButton, RoundBackButton } from '../../../component';
import { BACKGROUND_FINDOPPONENTS, ICON_LOSE } from '../../../../../assets';
import { scaleHeight, scaleWidth, scale, HEIGHT, LightTheme, WITDH } from '../../../resource/values';
import { styles } from './Result.style';
import LinearGradient from 'react-native-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../shared-state';
import { showLoading, hideLoading } from '../../../shared-state';
const _Result: React.FC = ({ route }: any) => {
    const { roomId, game} = route.params;
    const [userScore, setUserScore] = useState<number>(0);
    const [opponentScore, setOpponentScore] = useState<number>(0);
    const [didWin, setDidWin] = useState<boolean | null>(null);
    const userId = useSelector((state: RootState) => state.authentication.token);
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const [isModalVisible, setIsModalVisible] = useState(false);

    useEffect(() => {
        dispatch(showLoading('Đang chờ kết quả...'));

        const unsubscribe = firestore()
            .collection('gameRooms')
            .doc(roomId)
            .onSnapshot(
                (roomDoc) => {
                    if (!roomDoc.exists) {
                        dispatch(hideLoading(''));
                        Alert.alert('Error', 'Room data not found.');
                        return;
                    }

                    const data = roomDoc.data();
                    const scores = data?.scores || {};

                    const userScore = scores[userId!] || 0;
                    const opponentId = Object.keys(scores).find((id) => id !== userId);
                    const opponentScore = opponentId ? scores[opponentId] : 0;

                    console.log('Điểm của tôi:', userScore, 'ID:', userId);
                    console.log('Điểm của đối thủ:', opponentScore, 'ID:', opponentId);

                    const isGameFinished = data?.isGameFinished || 0;
                    if (isGameFinished < 2) {
                        console.log('Game chưa kết thúc, tiếp tục chờ...');
                        return;
                    }

                    dispatch(hideLoading(''));
                    if (userScore >= opponentScore) {
                        navigation.replace('Win', { userScore, opponentScore, roomId, userId , game});
                    } else {
                        setIsModalVisible(true);
                    }
                },
                (error) => {
                    dispatch(hideLoading(''));
                    console.error('Error listening to game room:', error);
                    Alert.alert('Error', 'Unable to listen to game results.');
                }
            );

        return () => unsubscribe();
    }, [roomId, userId, navigation, dispatch]);
    const closeModal = () => {
        setIsModalVisible(false);
        navigation.replace('Congress');
    };
    return (
        <ImageBackground source={BACKGROUND_FINDOPPONENTS} style={styles.background} resizeMode="stretch">
            {isModalVisible ? (
                <View
                    style={{
                        width:"100%",
                        height: '100%',
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <View
                        style={{
                            width: scaleWidth(335),
                            height: scaleHeight(250),
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <Image
                            source={ICON_LOSE}
                            style={{ width: scaleWidth(300), height: scaleHeight(250) }}
                        />
                        <FlatButton 
                        title={'Quay về'} 
                        onPress={closeModal} 
                        containerStyle={{marginTop: scaleHeight(45)}}
                        />
                    </View>
                </View>
            ) : (
                <>
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
                </>
            )}

        </ImageBackground>
    );
};

export const Result = React.memo(_Result);
