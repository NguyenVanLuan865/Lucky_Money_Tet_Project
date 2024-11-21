import { StyleSheet } from 'react-native';
import { LightTheme } from '../../../resource/values';
import { scaleHeight, scaleWidth, scale , WITDH, HEIGHT } from '../../../resource/values';

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
    position: 'absolute',
    width: scaleWidth(335),
    height: scaleHeight(511),
    top: scaleHeight(180),
    backgroundColor: LightTheme.colorScheme.backgroundLabel,
    borderWidth: 2,
    borderColor: LightTheme.colorScheme.borderLabel,
    borderRadius: 8
  },
  tabview: {
    position: 'absolute',
    width: scaleWidth(335),
    height: scaleHeight(52),
    top: scaleHeight(120),
    backgroundColor: LightTheme.colorScheme.backgroundLabel,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection :'row',
  },
  tilteButton: {
    fontSize: scale(14),
    width: '80%',
    textAlign: 'center',
    color: LightTheme.colorScheme.primaryText,
    fontFamily: 'SVN-Cookies',
  },
  button: {
    width: scaleWidth(324)/3,
    height: scaleHeight(40),
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedButton: {
    width: scaleWidth(324)/3,
    height: scaleHeight(40),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: LightTheme.colorScheme.primaryText,
    borderRadius: 6
  },
  selectedTilteButton: {
    fontSize: scale(14),
    width: '80%',
    textAlign: 'center',
    color: LightTheme.colorScheme.backgroundLabel,
    fontFamily: 'SVN-Cookies',
  },
  logo: {
    position: 'absolute',
    width: scaleWidth(104.04),
    height: scaleHeight(31.22),
    top: scaleHeight(85),
  },
  textheader: {
    fontFamily: 'SVN-Cookies',
    fontSize: scale(24),
    color: LightTheme.colorScheme.backgroundLabel,
    textAlign: 'center', 
  },
  header: {
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: 'black',
    flexDirection: 'row',
    height: '100%', 
    justifyContent: 'center',
    top: scaleHeight(50),
  }
});
