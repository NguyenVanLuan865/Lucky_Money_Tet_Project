import React from 'react';
import { View, Text, ImageBackground, Image } from 'react-native';
import { RoundBackButton, FlatButton } from '../../../component';
import { BACKGROUND_FINDOPPONENTS, FRAME_AVATAR, AVATAR_LEFT, AVATAR_RIGHT } from '../../../../../assets';
import LinearGradient from 'react-native-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';
import { useFindOpponents } from './FindOpponents.hook';
import { styles } from './FindOpponents.style';
import { useNavigation } from '@react-navigation/native';


export const FindOpponents: React.FC = ({ route }: any) => {
    const { countdown, username, opponentName, formatTime,} = useFindOpponents(route);
    const {  game  } = route.params;
    console.log('game : ', game)
    const navigation = useNavigation();
    return (
        <ImageBackground source={BACKGROUND_FINDOPPONENTS} style={styles.background} resizeMode="stretch">
            <RoundBackButton containerStyle={styles.buttonBack} />
            <MaskedView
                style={styles.header}
                maskElement={<Text style={styles.textheader}>
                    {game === 'game1' ? 'THÁNH LÌ XÌ' : game === 'game2' ? 'THỬ TÀI BẮN VÍT' : game === 'game3' ? 'ANH HÙNG BẢO VỆ' : game === 'game4' ? 'THÁNH ÁNH KIM' :'Tên Game'}
                </Text>}
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
                <View style={{ alignItems: 'center' }}>
                    <ImageBackground source={FRAME_AVATAR} style={styles.frameavatar}>
                        <Image source={AVATAR_LEFT} style={styles.avatar} />
                    </ImageBackground>
                    <Text style={[styles.textavatar, styles.nameuser]}>{username}</Text>
                </View>
                <View style={{ alignItems: 'center' }}>
                    <ImageBackground source={FRAME_AVATAR} style={styles.frameavatar}>
                        <Image source={AVATAR_RIGHT} style={styles.avatar} />
                    </ImageBackground>
                    <Text style={[styles.textavatar, styles.nameopponent]}>{opponentName}</Text>
                </View>
            </View>
            <MaskedView
                style={styles.time}
                maskElement={<Text style={styles.time}>{formatTime(countdown)}</Text>}
            >
                <LinearGradient
                    colors={['#FCD60E', '#FFF9E1', '#FCD60E']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 1 }}
                    style={{ flex: 1, height: '100%' }}
                />
            </MaskedView>
            <FlatButton title="Hủy" containerStyle={{ marginTop: 16 }} onPress={() => navigation.goBack()} />
        </ImageBackground>
    );
};
