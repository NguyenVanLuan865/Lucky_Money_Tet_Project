import React, { useState, useEffect, useRef } from 'react';
import { View, TextInput, Text, ImageBackground, Image, Animated } from 'react-native';
import {FRAME_AVATAR, ICON_FACE,} from '../../../../../assets';
import { BACKGROUND_ONBOARD } from '../../../../../assets';
import { FlatButton } from '../../../component';
import { styles } from './sign-in.style';
import { useDispatch } from 'react-redux';
import { signInAsync, AppDispatch } from '../../../shared-state';
import { scaleHeight } from '../../../resource';
import { useNavigation } from '@react-navigation/native';
const _SignIn: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const dispatch = useDispatch<AppDispatch>();

    const navigation = useNavigation();

    const handlePress = () => {
        navigation.navigate('Register'); 
    };

    const handleRemoteSignIn = async () => {
        try {
            await dispatch(signInAsync({ email, password }));
            setMessage('Đăng nhập từ xa thành công!');
        } catch (error: any) {
            setMessage(`Lỗi đăng nhập từ xa: ${error.message || 'Không xác định'}`);
        }
    };
    const shakeAnim = useRef(new Animated.Value(0)).current;
    const shineAnim = useRef(new Animated.Value(0)).current;
    useEffect(() => {
        // Tạo animation lắc qua lại
        Animated.loop(
            Animated.sequence([
                Animated.timing(shakeAnim, {
                    toValue: 10, // Góc lắc (10 độ)
                    duration: 100, // Thời gian mỗi lần lắc
                    useNativeDriver: true,
                }),
                Animated.timing(shakeAnim, {
                    toValue: -10, // Lắc về phía ngược lại
                    duration: 100,
                    useNativeDriver: true,
                }),
                Animated.timing(shakeAnim, {
                    toValue: 0, // Trở về vị trí ban đầu
                    duration: 100,
                    useNativeDriver: true,
                }),
            ])
        ).start();

        Animated.loop(
            Animated.sequence([
              Animated.timing(shineAnim, {
                toValue: 1,
                duration: 800,
                useNativeDriver: true,
              }),
              Animated.timing(shineAnim, {
                toValue: 0,
                duration: 800,
                useNativeDriver: true,
              }),
            ])
          ).start();
    }, [shakeAnim]);

    
    return (
        <ImageBackground source={BACKGROUND_ONBOARD} style={styles.background} resizeMode="stretch">
            <Text style={styles.textheader}>Đăng Nhập</Text>
            <ImageBackground source={FRAME_AVATAR} style={styles.frame} resizeMode="stretch">
                <Animated.View
                    style={{
                        transform: [
                            {
                                rotate: shakeAnim.interpolate({
                                    inputRange: [-10, 10],
                                    outputRange: ['-10deg', '10deg'], // Chuyển đổi giá trị thành góc xoay
                                }),
                            },
                        ],
                        opacity: shineAnim,
                    }}
                >
                    <Image
                        source={ICON_FACE} // ICON_FACE
                        style={styles.face}
                    />
                </Animated.View>
            </ImageBackground>
            <TextInput
                style={[styles.input, { marginTop: 20 }]}
                placeholder="Nhập email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <TextInput
                style={[styles.input, { marginTop: 20 }]}
                placeholder="Nhập mật khẩu"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <FlatButton
                title="Đăng nhập"
                containerStyle={[styles.button, {marginTop: scaleHeight(20)}]}
                onPress={handleRemoteSignIn}
            />
            <FlatButton
                title="Đăng kí"
                containerStyle={[styles.button, {marginTop: scaleHeight(20)}]}
                onPress={handlePress}

            />
        </ImageBackground>
    );
};
export const SignIn = React.memo(_SignIn)


