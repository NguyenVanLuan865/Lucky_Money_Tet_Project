import { useState } from 'react';
import { Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { registerAsync, AppDispatch, RootState } from '../../../shared-state';

export const useRegisterHandlers = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');

  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation();
  const isLoading = useSelector((state: RootState) => state.loading.isLoading);

  const handleRegister = () => {
    if (!email || !password || !name || !confirmPassword) {
      Alert.alert('Lỗi', 'Vui lòng nhập đầy đủ thông tin!');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Lỗi', 'Mật khẩu xác nhận không khớp!');
      return;
    }

    dispatch(
      registerAsync({
        email,
        password,
        additionalInfo: { name },
      })
    )
      .unwrap()
      .then((uid) => {
        Alert.alert('Thành công', `Tạo tài khoản thành công`);
      })
      .catch((error) => {
        Alert.alert('Lỗi', error);
      });
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  return {
    email,
    password,
    confirmPassword,
    name,
    setEmail,
    setPassword,
    setConfirmPassword,
    setName,
    handleRegister,
    isLoading,
    handleGoBack,
  };
};
