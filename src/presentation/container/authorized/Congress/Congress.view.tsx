import React from 'react';
import { ImageBackground, Text, TouchableOpacity } from 'react-native';
import { BACKGROUND_CONGRESS, FRAME_CONGRESS } from '../../../../../assets';
import { styles } from './Congress.style';
import { RoundBackButton } from '../../../component';
import { useCongressHandlers } from './Congress.hook';

const Congress: React.FC = () => {
    const { handlePress1, handlePress2, handleGoBack } = useCongressHandlers();

    return (
        <ImageBackground source={BACKGROUND_CONGRESS} style={styles.background} resizeMode="stretch">
            <RoundBackButton containerStyle={styles.buttonBack} onPress={handleGoBack} />
            <Text style={styles.textheader}>ĐẠI HỘI TRANH TÀI</Text>
            <ImageBackground source={FRAME_CONGRESS} style={styles.frame} resizeMode="stretch">
                <TouchableOpacity style={styles.button} onPress={handlePress1} />
                <TouchableOpacity style={styles.button2} onPress={handlePress2} />
            </ImageBackground>
        </ImageBackground>
    );
};

export default React.memo(Congress);
