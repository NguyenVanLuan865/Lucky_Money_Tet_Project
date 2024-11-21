import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signInAsync, AppDispatch } from '../../../shared-state';
import { RootState } from '../../../shared-state';
import { useNavigation } from '@react-navigation/native';
import { Animated } from 'react-native';

export const useSignInHandlers = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation();
  const isLoading = useSelector((state: RootState) => state.loading.isLoading);

  const handleRemoteSignIn = async () => {
    try {
      await dispatch(signInAsync({ email, password }));
      console.log('Đăng nhập thành công');
    } catch (error: any) {
      console.error(`Lỗi đăng nhập: ${error.message || 'Không xác định'}`);
    }
  };

  const handlePress = () => {
    navigation.navigate('Register');
  };

  return {
    email,
    password,
    setEmail,
    setPassword,
    handleRemoteSignIn,
    handlePress,
    isLoading,
  };
};

export const useShakeAnimation = () => {
  const shakeAnim = useRef(new Animated.Value(0)).current;
  const shineAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(shakeAnim, { toValue: 10, duration: 100, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: -10, duration: 100, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: 0, duration: 100, useNativeDriver: true }),
      ])
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(shineAnim, { toValue: 1, duration: 800, useNativeDriver: true }),
        Animated.timing(shineAnim, { toValue: 0, duration: 800, useNativeDriver: true }),
      ])
    ).start();
  }, [shakeAnim]);

  return { shakeAnim, shineAnim };
};
