import React , {useState}from 'react';
import { StyleSheet, View, Image, ImageBackground, SafeAreaView, Text  , Alert} from 'react-native';
import { BACKGROUND_FINDOPPONENTS_SHOOTTHEGREW, LABEL_FINDOPPONENTS_SHOOTTHEGREW, FRAME_FINDOPPONENTS_SHOOTTHEGREW } from '../../../../../../../assets';
import { scaleHeight, scaleWidth, scale } from '../../../../../resource/values';
import { FlatButton, RoundBackButton } from '../../../../../component';
import { styles } from './FindOpponent.style';
import MaskedView from '@react-native-masked-view/masked-view';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { RootState, joinMatchQueueAsync, AppDispatch } from '../../../../../shared-state';
import { joinMatchQueueWithUserData } from '../../../../../../data/data-source/user/matchService';
import { useSelector, useDispatch } from 'react-redux';
const _FindOpponent: React.FC = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch<AppDispatch>();
    const userId = useSelector((state: RootState) => state.authentication.token);
    const [name, setName] = useState<string>(''); 

    const handlePress = async () => {
      try {
        const playerName = await joinMatchQueueWithUserData(userId!, 'game2'); 
        setName(playerName); 
        console.log(playerName)
        navigation.replace('WaitingLuckeyMoney', { name: playerName , game: 'game2'});
      } catch (err) {
        if (err instanceof Error) {
          Alert.alert('Lỗi', err.message);
        } else {
          Alert.alert('Lỗi', 'Không thể tham gia hàng đợi.');
        }
      }
    };
    return (
        <ImageBackground source={BACKGROUND_FINDOPPONENTS_SHOOTTHEGREW} style={styles.background} resizeMode="stretch">
            <RoundBackButton
                containerStyle={styles.buttonBack}
            />
            <MaskedView
                style={styles.header}
                maskElement={
                    <Text style={styles.textheader}>TẾT TRANH TÀI</Text>
                }
            >
                <LinearGradient
                    colors={['#FAD93C', '#FFE995', '#FFF9D1', '#FFF1AD', '#FBE592', '#FFD053']}
                    locations={[0.06, 0.23, 0.46, 0.66, 0.83, 0.97]}
                    start={{ x: 0, y: 1 }}
                    end={{ x: 1, y: 0 }}
                    style={{ flex: 1, height: '100%' }}
                />
            </MaskedView>
            <ImageBackground source={LABEL_FINDOPPONENTS_SHOOTTHEGREW} style={styles.label} resizeMode='cover'>
                <Text style={styles.text1}>THỬ TÀI BẮN VÍT</Text>
                <Text style={styles.text2}>Vận dụng tài bắn vít siêu đỉnh: chạm liên tục vào màn hình, chạm càng nhanh điểm càng cao, bạn sẽ chiến thắng đối thủ!
                </Text>
                <Image source={FRAME_FINDOPPONENTS_SHOOTTHEGREW} style={styles.frame} resizeMode='cover' />
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

export const FindOpponent = React.memo(_FindOpponent);
