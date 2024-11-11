import React from 'react';
import { StyleSheet, View, Image, ImageBackground, SafeAreaView, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BACKGROUND_FINDOPPONENTS_SHOOTTHEGREW, LABEL_FINDOPPONENTS_SHOOTTHEGREW, FRAME_FINDOPPONENTS_SHOOTTHEGREW } from '../../../../../../../assets';
import { scaleHeight, scaleWidth, scale } from '../../../../../resource/values';
import { FlatButton, RoundBackButton } from '../../../../../component';
import { styles } from './FindOpponent.style';
import MaskedView from '@react-native-masked-view/masked-view';
import LinearGradient from 'react-native-linear-gradient';
const _FindOpponent: React.FC = () => {
    const navigation = useNavigation();

    const handlePress = () => {
        navigation.navigate('GamePlayShootTheScrew');
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
                    colors={['#FCD60E', '#FFF9E1', '#FCD60E']}
                    locations={[0.1, 0.3, 0.9]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={{ flex: 1, height: '100%' }}
                />
            </MaskedView>
            <ImageBackground source={LABEL_FINDOPPONENTS_SHOOTTHEGREW} style={styles.label} resizeMode='cover'>
                <Text style={styles.text1}>THỬ TÀI BẮN VÍT</Text>
                <Text style={styles.text2}>Vận dụng tài bắn vít siêu đỉnh: chạm liên tục vào màn hình, chạm càng nhanh điểm càng cao, bạn sẽ chiến thắng đối thủ!
                </Text>
                <Image source={FRAME_FINDOPPONENTS_SHOOTTHEGREW} style={styles.frame} resizeMode='cover'/>
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
