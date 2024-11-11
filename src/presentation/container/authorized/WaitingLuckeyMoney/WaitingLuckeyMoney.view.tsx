import React from 'react';
import { StyleSheet, View, Image, ImageBackground, SafeAreaView, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BACKGROUND_WAITING, FRAME_AVATAR } from '../../../../../assets';
import { FlatButton, RoundBackButton } from '../../../component';
import { styles } from './WaitingLuckeyMoney.style';
import MaskedView from '@react-native-masked-view/masked-view';
import LinearGradient from 'react-native-linear-gradient';



const _WaitingLuckeyMoney: React.FC = () => {
    // const navigation = useNavigation();

    // const handlePress = () => {
    //     navigation.navigate('Main'); 
    // };

    return (
        <ImageBackground source={BACKGROUND_WAITING} style={styles.background} resizeMode="stretch">
            <RoundBackButton
                containerStyle={styles.buttonBack}
            />
            <Text style={styles.text1}>Đáp nhanh tranh lì xì</Text>
            <Text style={styles.text2}>Đang tìm đối thủ</Text>
            <ImageBackground source={FRAME_AVATAR} style={styles.frameavatar} resizeMode='stretch'>
                {/* avatar*/}
            </ImageBackground>
            <MaskedView
                style={styles.user}
                maskElement={
                    <Text style={styles.username}>Nguyễn Trần Ngọc Hân</Text>
                }
            >
                <LinearGradient
                    colors={['#FCD60E', '#FFF9E1', '#FCD60E']}
                    locations={[0.1, 0.2, 0.8]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={{ flex: 1, height: '100%' }}
                />
            </MaskedView>
        </ImageBackground>
    );
};

export const WaitingLuckeyMoney = React.memo(_WaitingLuckeyMoney);
