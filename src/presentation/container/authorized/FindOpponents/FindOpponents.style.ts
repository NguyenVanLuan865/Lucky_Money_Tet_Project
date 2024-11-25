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
  buttonBack: {
    left: scaleWidth(20),
    top: scaleHeight(60),
    position:'absolute'
  },
  header: {
    flexDirection: 'row',
    width: scaleWidth(248),
    height: scaleHeight(30),
    marginTop: scaleHeight(64),
  },
  textheader: {
    fontFamily: 'SVN-Cookies',
    fontSize: scale(24),
    color: LightTheme.colorScheme.backgroundLabel,
    textAlign: 'center',
  },
  labelframeavatar : {
    width: scaleWidth(264),
    height: scaleHeight(120),
    marginTop: scaleHeight(249),
    flexDirection :'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  frameavatar: {
    width: scaleWidth(81),
    height: scaleHeight(84.37),

    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    width: scaleWidth(53.85),
    height: scaleHeight(43.47),
  },
  textavatar: {
    fontFamily: 'SVN-Cookies',
    fontSize: scale(12),
    color: LightTheme.colorScheme.backgroundLabel,
    textAlign: 'center',
    maxWidth: scaleWidth(81)
  },
  nameuser: {
    color: LightTheme.colorScheme.primaryText,
    textShadowColor: 'white', 
    textShadowOffset: { width: 1, height: 1 }, 
    textShadowRadius: 1,
  },
  nameopponent: {
    color: LightTheme.colorScheme.buttonGradientStart,
    textShadowColor: 'black', 
    textShadowOffset: { width: 1, height: 1 }, 
    textShadowRadius: 1,
  },
  time: {
    fontFamily: 'SVN-Gotham',
    fontSize: scale(24),
    color: LightTheme.colorScheme.buttonGradientStart,
    width: scaleWidth(77.8),
    height: scaleHeight(40.59),
    marginTop: scaleHeight(12),
  }
});
