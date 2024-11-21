import React, { useEffect } from 'react';
import { View, Image, ImageBackground, Text } from 'react-native';
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
    // const dispatch = useDispatch<AppDispatch>();
    // const { data, isLoading, error } = useSelector((state: RootState) => state.user);

    // const token = useSelector((state: RootState) => state.authentication.token); // Lấy token từ Redux

    // useEffect(() => {
    //     if (token) {
    //         dispatch(fetchUserAndSubCollectionsAsync(token)); // Gọi API để lấy thông tin người dùng
    //     }
    // }, [dispatch, token]);

    // if (isLoading) {
    //     return <Text>Loading...</Text>;
    // }

    // if (error) {
    //     return <Text>Error: {error}</Text>;
    // }
    return (
        <View style={styles.background} >
            <ImageBackground source={FRAME_POPUP_HEALTH} style={styles.label} resizeMode="stretch">
                <FlatButton
                    title="Tôi vẫn khỏe"
                    buttonWidth={scaleWidth(174)}
                    buttonHeight={scaleHeight(47)}
                    containerStyle={{ marginTop: scaleHeight(134) }}
                    onPress={handlePress}
                />

            </ImageBackground>
        </View>
    );
};

export const PoppupHealth = React.memo(_PoppupHealth);
