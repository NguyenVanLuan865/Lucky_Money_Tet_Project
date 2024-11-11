import React from 'react';
import { View, Image, ImageBackground,Text} from 'react-native';
import { scaleHeight, scaleWidth, scale } from '../../../resource/values';
import { useNavigation } from '@react-navigation/native';
import { FRAME_POPUP_HEALTH } from '../../../../../assets';
import { FlatButton } from '../../../component';
import { styles } from './PoppupHealth.style';

const _PoppupHealth: React.FC = () => {
    const navigation = useNavigation();

    const handlePress = () => {
        navigation.navigate('Onboard');
    };

    return (
        <View style={styles.background} >
            <ImageBackground source={FRAME_POPUP_HEALTH} style={styles.label} resizeMode="stretch">
                <FlatButton
                    title="Tôi vẫn khỏe"
                    buttonWidth={scaleWidth(174)}
                    buttonHeight={scaleHeight(47)}
                    containerStyle={{marginTop: scaleHeight(134)}}
                    onPress={handlePress}
                />
            </ImageBackground>

        </View>
    );
};

export const PoppupHealth = React.memo(_PoppupHealth);
