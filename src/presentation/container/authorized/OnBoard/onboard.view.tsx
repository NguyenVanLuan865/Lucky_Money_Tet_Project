import React from 'react';
import { View, Image, ImageBackground, Text } from 'react-native';
import { useOnboardHandlers } from './onboard.hook';
import { BACKGROUND_ONBOARD, ICON_ONBOARD, LABEL_ONBOARD, FRAME_POPUP_HEALTH } from '../../../../../assets';
import { FlatButton } from '../../../component';
import { styles } from './onboard.style';
import { scaleHeight, scaleWidth, scale } from '../../../resource/values';

const Onboard: React.FC = () => {
    const { handlePress, isPopupVisible, handlePopupClose } = useOnboardHandlers();

    return (
        <ImageBackground source={BACKGROUND_ONBOARD} style={styles.background} resizeMode="stretch">
            {isPopupVisible ? (
                <View style={styles.popupview} >
                    <ImageBackground source={FRAME_POPUP_HEALTH} style={styles.popup} resizeMode="stretch">
                        <FlatButton
                            title="Tôi vẫn khỏe"
                            buttonWidth={scaleWidth(174)}
                            buttonHeight={scaleHeight(47)}
                            containerStyle={styles.popupButton}
                            onPress={handlePopupClose}
                        />
                    </ImageBackground>
                </View>
            ) : (
                <>
                    <Text style={styles.textheader}>HƯỚNG DẪN</Text>
                    <Image source={ICON_ONBOARD} style={styles.icon} />
                    <ImageBackground source={LABEL_ONBOARD} style={styles.label} resizeMode="stretch">
                        <Text style={styles.text}>
                            {`Lắc chắt chiu từng lượt\nNhận ngay 1 phần quà\nLắc tới bến chục lượt\nNhận một lúc 10 phần quà!`}
                        </Text>
                    </ImageBackground>
                    <FlatButton
                        title="Tham gia ngay"
                        containerStyle={styles.button}
                        onPress={handlePress} 
                    />
                </>
            )}
        </ImageBackground>
    );
};

export default React.memo(Onboard);
