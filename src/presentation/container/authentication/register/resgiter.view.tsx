import React from 'react';
import { View, TextInput, Text, ImageBackground, Alert } from 'react-native';
import { BACKGROUND_ONBOARD } from '../../../../../assets';
import { FlatButton, RoundBackButton, Loading } from '../../../component';
import { useRegisterHandlers } from './register.hook';
import { styles } from './register.style';

const Register: React.FC = () => {
  const {
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
  } = useRegisterHandlers();

  return (
    <>
      {isLoading && <Loading message="Đang xử lý..." />}
      
      <ImageBackground source={BACKGROUND_ONBOARD} style={styles.background} resizeMode="stretch">
        <RoundBackButton containerStyle={styles.buttonBack} onPress={handleGoBack} />
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
          containerStyle={[styles.button, { marginTop: 20 }]}
          onPress={handleRegister}
        />
      </ImageBackground>
    </>
  );
};

export default React.memo(Register);
