import React from 'react';
import { View, TextInput, Text, ImageBackground, Image, Animated } from 'react-native';
import { FRAME_AVATAR, ICON_FACE, BACKGROUND_ONBOARD , ICON_TICKED} from '../../../../../assets';
import { FlatButton, Loading } from '../../../component';
import { styles } from './sign-in.style';
import { useSignInHandlers, useShakeAnimation  } from './sign-in.hook'

const SignIn: React.FC = () => {
  const {
    email,
    password,
    setEmail,
    setPassword,
    handleRemoteSignIn,
    handlePress,
    isLoading,
  } = useSignInHandlers();
  
  const { shakeAnim, shineAnim } = useShakeAnimation();

  return (
    <>
      {isLoading && <Loading message="Đang xử lý..." />}
      <ImageBackground source={BACKGROUND_ONBOARD} style={styles.background} resizeMode="stretch">
        <Text style={styles.textheader}>Đăng Nhập</Text>
        <ImageBackground source={FRAME_AVATAR} style={styles.frame} resizeMode="stretch">
          <Animated.View
            style={{
              transform: [
                {
                  rotate: shakeAnim.interpolate({
                    inputRange: [-10, 10],
                    outputRange: ['-10deg', '10deg'],
                  }),
                },
              ],
              opacity: shineAnim,
            }}
          >
            <Image source={ICON_FACE} style={styles.face} />
            {/* <Image source={ICON_FACE} style={styles.face} /> */}


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
          containerStyle={[styles.button, { marginTop: 20 }]}
          onPress={handleRemoteSignIn}
        />
        <FlatButton
          title="Đăng kí"
          containerStyle={[styles.button, { marginTop: 20 }]}
          onPress={handlePress}
        />
      </ImageBackground>
    </>
  );
};

export default React.memo(SignIn);
