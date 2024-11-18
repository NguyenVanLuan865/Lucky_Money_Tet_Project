import React from 'react';
import {
  StyleSheet,
  StyleProp,
  ViewStyle,
  TouchableOpacity,
  View,
  Text,
  Image,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Foundation from 'react-native-vector-icons/Foundation';
import { LightTheme, scale, scaleHeight, scaleWidth } from '../../resource/values';
import { BUTTON_MINUS } from '../../../../assets';

export interface SubtractButton {
  containerStyle?: StyleProp<ViewStyle>;
  onPress?: () => void;
}

const _SubtractButton: React.FC<SubtractButton> = (props) => {
  const { onPress, containerStyle } = props;

  return (
    <View style={[styles.container, containerStyle]}>
      <TouchableOpacity onPress={onPress} style={styles.button}>
        {/* <LinearGradient
          colors={['#c0c0c0', '#8e8e8e']}
          style={styles.linearGradient}
        >
          <View style={styles.iconContainer}>
            <Text style={{color:'#FFF'}}>━</Text>
          </View>
        </LinearGradient> */}
        <Image source={BUTTON_MINUS} style={{ height: '100%', width: '100%', }} resizeMode='center' />

      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: scaleWidth(29),
    height: scaleHeight(29),
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: scaleWidth(29),
    height: scaleHeight(29),
    overflow: 'hidden',
  },
  linearGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: LightTheme.colorScheme.borderbuttonMinus,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export const SubtractButton = React.memo(_SubtractButton);
