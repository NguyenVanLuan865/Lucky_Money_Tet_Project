import { StyleSheet } from 'react-native';
import { scaleHeight, scaleWidth, scale,HEIGHT, LightTheme, WITDH  } from '../../../resource/values';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  }, 
  background: {
    alignItems: 'center',
    flex: 1,
  },
  buttonBack: {
    left: scaleWidth(20),
    top: scaleHeight(60),
    position:'absolute'
  },
  frame: {
    width: scaleWidth(335),
    height: scaleHeight(599),
    marginTop: scaleHeight(23),
  },
  button: {
    width: scaleWidth(84),
    height: scaleHeight(124),
    marginTop: scaleHeight(421),
    marginLeft: scaleWidth(208.24),
  },
  textheader: {
    fontFamily: 'SVN-Cookies',
    fontSize: scale(24),
    color:  LightTheme.colorScheme.primaryText,
    marginTop: scaleHeight(65),
  },
  button2: {
    width: scaleWidth(84),
    height: scaleHeight(141.5),
    position: 'absolute',
    top: scaleHeight(
      298),
    left: scaleWidth(44),
  }
});
