<<<<<<< HEAD
import React , { useState } from 'react';
import { StyleSheet, View, Image, ImageBackground, Alert, Text } from 'react-native';
=======
import React from 'react';
import { StyleSheet, View, Image, ImageBackground, SafeAreaView, Text } from 'react-native';
>>>>>>> b19083247395aec8135ea41e63760732b49f483b
import { useNavigation } from '@react-navigation/native';
import { BACKGROUND_FINDOPPONENTS_SHOOTTHEGREW, LABEL_FINDOPPONENTS_SHOOTTHEGREW, FRAME_FINDOPPONENTS_GOLDEN_SAINT } from '../../../../../../assets';
import { scaleHeight, scaleWidth, scale } from '../../../../resource/values';
import { FlatButton, RoundBackButton } from '../../../../component';
import { styles } from './FindOpponent.style';
import MaskedView from '@react-native-masked-view/masked-view';
import LinearGradient from 'react-native-linear-gradient';
<<<<<<< HEAD
import { RootState, joinMatchQueueAsync, AppDispatch } from '../../../../shared-state';
import { joinMatchQueueWithUserData } from '../../../../../data/data-source/user/matchService';
import { useSelector, useDispatch } from 'react-redux';
const _FindOpponentGoldenSaint: React.FC = () => {
    // const navigation = useNavigation();

    // const handlePress = () => {
    //     navigation.navigate('GamePlayGoldenSaint');
    // };
    const navigation = useNavigation();
    const dispatch = useDispatch<AppDispatch>();
    const userId = useSelector((state: RootState) => state.authentication.token);
    const [name, setName] = useState<string>(''); 

    const handlePress = async () => {
      try {
        const playerName = await joinMatchQueueWithUserData(userId!, 'game4'); 
        setName(playerName); 
  
        navigation.navigate('WaitingLuckeyMoney', { name: playerName , game: 'game4'});
      } catch (err) {
        if (err instanceof Error) {
          Alert.alert('Lỗi', err.message);
        } else {
          Alert.alert('Lỗi', 'Không thể tham gia hàng đợi.');
        }
      }
    };
=======
const _FindOpponentGoldenSaint: React.FC = () => {
    const navigation = useNavigation();

    const handlePress = () => {
        navigation.navigate('GamePlayGoldenSaint');
    };

>>>>>>> b19083247395aec8135ea41e63760732b49f483b
    return (
        <ImageBackground source={BACKGROUND_FINDOPPONENTS_SHOOTTHEGREW} style={styles.background} resizeMode="stretch">
            <RoundBackButton
                containerStyle={styles.buttonBack}
<<<<<<< HEAD
                onPress={() => navigation.goBack()}
=======
>>>>>>> b19083247395aec8135ea41e63760732b49f483b
            />
            <MaskedView
                style={styles.header}
                maskElement={
                    <Text style={styles.textheader}>TẾT TRANH TÀI</Text>
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
            <ImageBackground source={LABEL_FINDOPPONENTS_SHOOTTHEGREW} style={styles.label} resizeMode='cover'>
                <Text style={styles.text1}>THÁNH ÁNH KIM</Text>
                <Text style={styles.text2}>Khám phá ngôi nhà lấp lánh ngay nào! 
                Chạm liên tục vào trần Ánh Kim, chạm càng nhanh điểm càng cao, bạn sẽ chiến thắng đối thủ!
                </Text>
                <Image source={FRAME_FINDOPPONENTS_GOLDEN_SAINT} style={styles.frame} resizeMode='cover'/>
                <FlatButton
                    title={'Tìm đối thủ'}
                    buttonWidth={scaleWidth(170)}
                    buttonHeight={scaleHeight(44)}
                    containerStyle={styles.button}
                    onPress={handlePress}
                />
                <View style={styles.banner}>
                    <Text style={styles.text3}>
                        Lưu ý: Khung giờ mỗi ngày cho phép thi đấu
                    </Text>
                    <Text style={styles.text4}>
                        12:00 - 13:00 | 18:00 - 20:00 
                    </Text>
                </View>
            </ImageBackground>
        </ImageBackground>
    );
};

export const FindOpponentGoldenSaint = React.memo(_FindOpponentGoldenSaint);
