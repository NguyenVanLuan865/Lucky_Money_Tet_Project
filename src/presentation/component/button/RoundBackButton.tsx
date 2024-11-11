import React from 'react';
import {
  StyleSheet,
  StyleProp,
  ViewStyle,
  TouchableOpacity,
  View,
  Image
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Foundation from 'react-native-vector-icons/Foundation';
import { LightTheme, scaleHeight, scaleWidth } from '../../resource/values';
import { BUTTON_BACK } from '../../../../assets';

export interface RoundBackProps {
  containerStyle?: StyleProp<ViewStyle>;
  onPress?: () => void;
}

const _RoundBackButton: React.FC<RoundBackProps> = (props) => {
  const { onPress, containerStyle } = props;

  return (
      <TouchableOpacity onPress={onPress} style={[styles.button, containerStyle]}>
        {/* <LinearGradient
          colors={[LightTheme.colorScheme.buttonGradientStart, LightTheme.colorScheme.buttonGradientEnd]}
          style={styles.linearGradient}
        >
          <View style={styles.iconContainer}>
            <Foundation name="arrow-left" size={20} color={LightTheme.colorScheme.primaryText} />
          </View>
        </LinearGradient> */}
        <Image source={BUTTON_BACK} style={{height: '100%', width: '100%',}} resizeMode='stretch'/>
      </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: scaleWidth(55),
    height:scaleHeight(46),
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: scaleWidth(55),
    height: scaleHeight(46),
    // borderRadius: 18,
    // borderWidth: 2,
    // borderColor: LightTheme.colorScheme.buttonBorder,
    // overflow: 'hidden',
    // elevation: 3,
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.3,
    // shadowRadius: 4,
  },
  linearGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    width: 30,
    height: 30,
    borderRadius: 15, // Bo tròn icon
    backgroundColor: LightTheme.colorScheme.iconBackground, // Màu nền icon
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export const RoundBackButton = React.memo(_RoundBackButton);
