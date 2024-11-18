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
    width: scaleWidth(335),
    height: scaleHeight(530),
    marginTop: scaleHeight(16),
    alignItems: 'center',
    backgroundColor: LightTheme.colorScheme.backgroundLabel,
    borderWidth: 2,
    borderColor: LightTheme.colorScheme.borderLabel,
    borderRadius: 8,
    overflow: 'hidden',
    alignContent: 'center',
  },
  buttonBack: {
    left: scaleWidth(-60),
    top: scaleHeight(40),
    position:'absolute'
  },
  header: {
    flexDirection: 'row',
    width: scaleWidth(128),
    height: scaleHeight(30),
    marginTop: scaleHeight(49),
  },
  textheader: {
    fontFamily: 'SVN-Cookies',
    fontSize: scale(24),
    color: LightTheme.colorScheme.backgroundLabel,
    textAlign: 'center',
  },
  text: {
    fontFamily: 'SVN-Gotham',
    fontSize: scale(16),
    color: LightTheme.colorScheme.primaryText,
  },
  text2: {
    fontFamily: 'SVN-Gotham-Light',
    fontSize: scale(14),
    textAlign: 'center',
    marginTop: scaleHeight(13),
    color: 'black'
  },
  mission: {
    width: scaleWidth(303),
    height: scaleHeight(56),
    marginTop: scaleHeight(16),
    textAlign: 'center',
    alignItems: 'center',
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
    width: scaleWidth(136),
    height: scaleHeight(44),
    marginTop: scaleHeight(332),
  },
  logo: {
    width: scaleWidth(210),
    height: scaleHeight(60),
    marginTop: scaleHeight(24),
  }
});
