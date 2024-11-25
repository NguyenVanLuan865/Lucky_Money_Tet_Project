import React from 'react';
import { StyleSheet, View, Image, ImageBackground, SafeAreaView, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BACKGROUND_TETCOMPETITION, ICON_ONBOARD, LABEL_ONBOARD } from '../../../../../assets';
import { scaleHeight, scaleWidth, scale } from '../../../resource/values';
import { FlatButton, RoundBackButton } from '../../../component';
import { styles } from './TetCompetition.style';


const _TetCompetition: React.FC = () => {
    const navigation = useNavigation();

    const handlePress1 = () => {
        navigation.navigate('FindOpponent');
    };
    const handlePress2 = () => {
        navigation.navigate('FindOpponentProtected');
    };

    const handlePress3 = () => {
        navigation.navigate('FindOpponentGoldenSaint');
    };

    return (
        <ImageBackground source={BACKGROUND_TETCOMPETITION} style={styles.background} resizeMode="stretch">
            <RoundBackButton
                containerStyle={styles.buttonBack}
            />
            <FlatButton
                title={'Thử tài bắn vít'}
                buttonWidth={scaleWidth(245)}
                buttonHeight={scaleHeight(44)}
                containerStyle={styles.button1}
                onPress={() => navigation.navigate('FindOpponent')}
            />
            <FlatButton
                title={['Anh hùng Siêu bảo vệ', 'Ra mắt vào ngày 08/11']}
                buttonWidth={scaleWidth(245)}
                buttonHeight={scaleHeight(62)}
                containerStyle={{marginTop: scaleHeight(16)}}
                onPress={() => navigation.navigate('FindOpponentProtected')}
            />
            <FlatButton
                title={['Thánh Ánh Kim', 'Ra mắt vào ngày 08/11']}
                buttonWidth={scaleWidth(245)}
                buttonHeight={scaleHeight(62)}
                containerStyle={{marginTop: scaleHeight(16)}}
                onPress={() => navigation.navigate('FindOpponentGoldenSaint')}
            />
        </ImageBackground>
    );
};

export const TetCompetition = React.memo(_TetCompetition);
