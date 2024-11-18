import { StyleSheet } from 'react-native';
import { LightTheme } from '../../../../resource/values';
import { scaleHeight, scaleWidth, scale } from '../../../../resource/values';

export const styles = StyleSheet.create({
  background: {
    alignItems: 'center',
    flex: 1,
  },
  label: {
    width: scaleWidth(335),
    height: scaleHeight(589),
    marginTop: scaleHeight(31),
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
    width: scaleWidth(163),
    height: scaleHeight(30),
    marginTop: scaleHeight(59),
  },
  textheader: {
    fontFamily: 'SVN-Cookies',
    fontSize: scale(24),
    color: LightTheme.colorScheme.backgroundLabel,
    textAlign: 'center',
  },
  frame: {
    width: '100%',
    height: scaleHeight(241),
    marginTop: scaleHeight(23),
  },
  text1: {
    fontSize: scale(20),
    fontFamily: 'SVN-Gotham',
    color: LightTheme.colorScheme.primaryText,
    marginTop: scaleHeight(26),
  },
  text2: {
    width: scaleWidth(293),
    fontSize: scale(14),
    fontFamily: 'SVN-Gotham-Light',
    color: 'black',
    marginTop: scaleHeight(5),
    textAlign: 'center',
  },
  button: {
    marginTop: scaleHeight(27),
  },
  banner: {
    width: scaleWidth(294),
    height: scaleHeight(65),
    marginTop: scaleHeight(15),
    borderRadius: 10,
    backgroundColor: LightTheme.colorScheme.primaryText,
    borderWidth: 2,
    borderColor: LightTheme.colorScheme.borderLabel,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text3: {
    fontSize: scale(12),
    fontFamily: 'SVN-Gotham-Light',
    color: LightTheme.colorScheme.secondaryText,
    textAlign: 'center',
    
  },
  text4: {
    fontSize: scale(12),
    fontFamily: 'SVN-Gotham',
    color: LightTheme.colorScheme.secondaryText,
    textAlign: 'center',
  },

});
