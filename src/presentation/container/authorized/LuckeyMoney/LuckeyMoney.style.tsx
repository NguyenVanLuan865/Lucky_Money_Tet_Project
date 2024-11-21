import { StyleSheet } from 'react-native';
import { scaleHeight, scaleWidth, scale,HEIGHT, LightTheme, WITDH  } from '../../../resource/values';
export const styles = StyleSheet.create({
  container: {
    flex: 1,
  }, 
  background: {
    alignItems: 'center',
    flex: 1,
    backgroundColor: LightTheme.colorScheme.backgroundgodmonetlucky,
  },
  label: {
    position: 'absolute',
    width: scaleWidth(335),
    height: scaleHeight(593),
    top: scaleHeight(122),
    alignItems: 'center',
    backgroundColor: LightTheme.colorScheme.backgroundLabel,
    borderWidth: 2,
    borderColor: LightTheme.colorScheme.borderLabel,
    borderRadius: 8,
    overflow: 'hidden',
    alignContent: 'center',
  },
  buttonBack: {
    left: scaleWidth(20),
    top: scaleHeight(60),
    position:'absolute'
  },
  header: {
    flexDirection: 'row',
    width: scaleWidth(128),
    height: scaleHeight(30),
    marginTop: scaleHeight(59),
  },
  textheader: {
    fontFamily: 'SVN-Cookies',
    fontSize: scale(24),
    color: LightTheme.colorScheme.backgroundLabel,
    textAlign: 'center',
  },
  text: {
    fontFamily: 'SVN-Gotham',
    fontSize: scale(20),
    color: LightTheme.colorScheme.primaryText,
  },
  text2: {
    fontFamily: 'SVN-Gotham-Light',
    fontSize: scale(12),
  },
  mission: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)', 
    width: scaleWidth(331),
    height: scaleHeight(75),
    marginTop: scaleHeight(11),
    paddingLeft: scaleWidth(21),
    paddingTop: scaleHeight(11),
  },
  minibaner: {
    width: scaleWidth(303),
    height: scaleHeight(204),
    marginTop: scaleHeight(19),
    borderRadius: 10,
    borderWidth: 2,
    borderColor:  LightTheme.colorScheme.borderLabel,
  },
  notebaner: {
    width: scaleWidth(294),
    height: scaleHeight(78),
    marginTop: scaleHeight(31),
    borderRadius: 10,
    borderWidth: 2,
    borderColor:  LightTheme.colorScheme.borderLabel,
    backgroundColor: LightTheme.colorScheme.backgroundgodmonetlucky,
    textAlign: 'center',
    padding: 10
  },
  button: {
    width: scaleWidth(153),
    height: scaleHeight(44),
    marginTop: scaleHeight(32),
  },
});
