import { StyleSheet } from 'react-native';
import { LightTheme } from '../../../resource/values';
import { scaleHeight, scaleWidth, scale } from '../../../resource/values';

export const styles = StyleSheet.create({
  background: {
    alignItems: 'center',
    flex: 1,
  },
  icon: {
    position: 'absolute',
    width: scaleWidth(414),
    height: scaleHeight(401),
    top: scaleHeight(120),
  },
  label: {
    width: scaleWidth(335),
    height: scaleHeight(151),
    top: scaleHeight(500),
    justifyContent: 'center',
    alignItems: 'center',
  },
  tilte: {
    height: "60%",
    width: "70%",
    fontSize: scale(16),
    textAlign: 'center',
    color: 'white',

  },
  textheader: {
    color:LightTheme.colorScheme.primaryText,
    top: scaleHeight(60),
    fontSize: scale(24),
    fontFamily: 'SVN-Cookies',
  },
  button: {
    width: scaleWidth(179),
    height: scaleHeight(44),
    borderRadius: scale(18),
  },
  text: {
    fontSize: scale(16),
    fontFamily: 'SVN-Gotham',
    color: '#FFF',
    textAlign: 'center',
    
  },
  input: {
    width: scaleWidth(335),
    height: scaleHeight(60),
    backgroundColor:   LightTheme.colorScheme. secondaryText,
    borderRadius: scale(20),
    borderWidth: scale(4),
    borderColor: LightTheme.colorScheme.primaryText,
    padding: scale(10),
    fontSize: scale(16),
    fontFamily: 'SVN-Gotham',
  },
  frame: {
    width: scaleWidth(180.5),
    height: scaleHeight(188),
    marginTop: scaleHeight(180),
    justifyContent: 'center',
    alignItems: 'center',
  },
  face: {
    width: scaleWidth(120),
    height: scaleHeight(96.86),
  }
});
