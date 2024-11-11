import React from 'react';
import { StyleSheet, View, Image, ImageBackground, SafeAreaView, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BACKGROUND_ONBOARD, ICON_ONBOARD, LABEL_ONBOARD } from '../../../../../assets';
import { FlatButton } from '../../../component';
import { styles } from './onboard.style';

const _Onboard: React.FC = () => {
    const navigation = useNavigation();

    const handlePress = () => {
        navigation.navigate('Main'); 
    };

    return (
        <ImageBackground source={BACKGROUND_ONBOARD} style={styles.background} resizeMode="stretch">
            <Text style={styles.textheader}>HƯỚNG DẪN</Text>
            <Image source={ICON_ONBOARD} style={styles.icon} />
            <ImageBackground source={LABEL_ONBOARD} style={styles.label} resizeMode="stretch">
                <Text style={styles.text}>{`Lắc chắt chiu từng lượt\nNhận ngay 1 phần quà\nLắc tới bến chục lượt\nNhận một lúc 10 phần quà!`}</Text>
            </ImageBackground>
            <FlatButton
                title="Tham gia ngay"
                containerStyle={styles.button}
                onPress={handlePress}
            />
        </ImageBackground>
    );
};

export const Onboard = React.memo(_Onboard);
