import { StyleSheet } from 'react-native';
import { scaleHeight, scaleWidth, scale, LightTheme } from '../../../resource/values';

export const styles = StyleSheet.create({
  background: {
    alignItems: 'center',
    flex: 1,
  },
  buttonLuckeyMoney: {
    width: scaleWidth(170),
    height: scaleHeight(44),
    top: scale(575),
    position: 'absolute',
  },
  buttonSupermarket: {
    width: scaleWidth(170),
    height: scaleHeight(44),
    top: scale(635),
    position: 'absolute',
  },
  text: {
    fontSize: scale(16),
    color: '#fff',
    fontFamily: 'SVN-Gotham',
    top: scale(535),
    position: 'absolute',
  },
  highlightedNumber: {
    fontSize: scale(24),
    color: LightTheme.colorScheme.buttonBorder,
    fontFamily: 'SVN-Gotham',
    top: scale(535),
    position: 'absolute',
  },
  buttonBack: {
    left: scaleWidth(20),
    top: scaleHeight(60),
    position: 'absolute',
  },
});
