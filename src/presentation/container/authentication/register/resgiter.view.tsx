import React, { useState, useEffect, useRef } from 'react';
import { View, TextInput, Text, ImageBackground, Alert } from 'react-native';
import { BACKGROUND_ONBOARD } from '../../../../../assets';
import { FlatButton, RoundBackButton } from '../../../component';
import { styles } from './register.style';
import { useDispatch } from 'react-redux';
import { registerAsync, AppDispatch } from '../../../shared-state';
import { scaleHeight } from '../../../resource';

const _Register: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');

  const dispatch = useDispatch<AppDispatch>();

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
        additionalInfo: {
          name,
          lixi: 0, // Ban đầu người dùng sẽ có 0 lì xì
        },
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


  return (
    <ImageBackground source={BACKGROUND_ONBOARD} style={styles.background} resizeMode="stretch">
      <RoundBackButton
        containerStyle={styles.buttonBack}
      />
      <Text style={styles.textheader}>Đăng kí</Text>
      <TextInput
        style={[styles.input, { marginTop: 100 }]}
        placeholder="Nhập tên người dùng"
        value={name}
        onChangeText={setName}
      />

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
      <TextInput
        style={[styles.input, { marginTop: 20 }]}
        placeholder="Nhập lại mật khẩu"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />
      <FlatButton
        title="Đăng kí"
        containerStyle={[styles.button, { marginTop: scaleHeight(20) }]}
        onPress={handleRegister}
      />
    </ImageBackground>
  );
};
export const Register = React.memo(_Register)


