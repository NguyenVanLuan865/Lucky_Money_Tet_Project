import React from 'react';
import { View, Text, ImageBackground, TouchableOpacity } from 'react-native';
import { BACKGROUND_CONGRESS, FRAME_CONGRESS } from '../../../../../assets';
import { styles } from './Congress.style';
import { FlatButton } from '../../../component';
import { RoundBackButton } from '../../../component/button/RoundBackButton';
import { useNavigation } from '@react-navigation/native';

const _Congress: React.FC = () => {
    const navigation = useNavigation();

    const handlePress1 = () => {
        navigation.navigate('GoldenLuckyMoneyMain');
    };
    const handlePress2 = () => {
        navigation.navigate('TetCompetition');
    };
    return (
        <ImageBackground source={BACKGROUND_CONGRESS} style={styles.background} resizeMode='stretch'>
            <RoundBackButton
                containerStyle={styles.buttonBack}
                onPress={() => navigation.goBack()}
            />
            <Text style={styles.textheader}>ĐẠI HỘI TRANH TÀI</Text>
            <ImageBackground source={FRAME_CONGRESS} style={styles.frame} resizeMode='stretch'>
                <TouchableOpacity style={styles.button} onPress={handlePress1}>

                </TouchableOpacity>
                <TouchableOpacity style={styles.button2} onPress={handlePress2}>

                </TouchableOpacity>
            </ImageBackground>

        </ImageBackground>
    );
};

export const Congress = React.memo(_Congress)

