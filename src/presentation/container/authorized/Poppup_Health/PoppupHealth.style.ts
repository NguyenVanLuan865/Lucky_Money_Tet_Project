import { StyleSheet } from 'react-native';
import { LightTheme } from '../../../resource/values';
import { scaleHeight, scaleWidth, scale } from '../../../resource/values';

export const styles = StyleSheet.create({
  background: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  label: {
    width: scaleWidth(345.5),
    height: scaleHeight(205),
    alignItems: 'center',
  },
});
