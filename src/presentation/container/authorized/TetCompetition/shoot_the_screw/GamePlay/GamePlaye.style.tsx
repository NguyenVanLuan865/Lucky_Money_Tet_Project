import { StyleSheet } from 'react-native';
import { scaleHeight, scaleWidth, scale ,LightTheme} from '../../../../../resource';

export const styles = StyleSheet.create({
  background: {
    alignItems: 'center',
    flex: 1,
  },
  label: {
    width: scaleWidth(335),
    height: scaleHeight(588),
    marginTop: scaleHeight(39),
    backgroundColor: LightTheme.colorScheme.backgroundLabel,
    borderWidth: 2,
    borderColor: LightTheme.colorScheme.borderLabel,
    borderRadius: 8,
    overflow: 'hidden',
  },
  buttonBack: {
    left: scaleWidth(20),
    top: scaleHeight(60),
    position: 'absolute'
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
  frame: {
    width: '100%',
    height: scaleHeight(241),
    marginTop: scaleHeight(23),
  },
  frameavatar: {
    width: scaleWidth(133),
    height: scaleHeight(66),
    flexDirection: 'row'
  },
  vierwavatar: {
    width: scaleWidth(346),
    height: scaleHeight(86),
    marginTop: scaleHeight(113),
    flexDirection: 'row',
  },
  iconVS: {
    width: scaleWidth(69),
    height: scaleHeight(50),
    marginTop: scaleHeight(30),
  },
  username: {
    fontFamily: 'SVN-Cookies',
    fontSize: scale(13),
    color: LightTheme.colorScheme.secondaryText,
    marginTop: scaleHeight(3)
  },
  text: {
    fontFamily: 'SVN-Gotham',
    fontSize: scale(21),
    color: LightTheme.colorScheme.secondaryText,
    marginTop: scaleHeight(6)
  },
  frameGame: {
    width: scaleWidth(335),
    height: scaleHeight(485),
    marginTop: scaleHeight(4),
  },
  time: {
    width: scaleWidth(113),
    height: scaleHeight(42),
    marginTop: scaleHeight(4),
    left: scaleWidth(111),
    justifyContent: 'center',
    alignItems: 'center'
  },
  bottomRightText: {
    position: 'absolute',
    bottom: scaleHeight(5),
    right: scaleWidth(30),
    color: LightTheme.colorScheme.buttonGradientStart,
    fontSize: scale(20),
    textAlign: 'center',
    fontFamily: 'SVN-Gotham'
  },
  bottomLeftText: {
    position: 'absolute',
    bottom: scaleHeight(5),
    left: scaleWidth(30),
    color: LightTheme.colorScheme.buttonGradientStart,
    fontSize: scale(20),
    textAlign: 'center',
    fontFamily: 'SVN-Gotham'
  },

  frameaccessory: {
    width: scaleWidth(155.22),
    height: scaleHeight(99.61),
    marginTop: scaleHeight(392),
    left: scaleWidth(84.25),
    position: 'absolute',
    zIndex: 0,
  },
  drill: {
    width: scaleWidth(183),
    height: scaleHeight(229),
    marginTop: scaleHeight(158),
    left: scaleWidth(45),
    position: 'absolute',
    zIndex: 0,
  },
  message: {
    fontFamily: 'SVN-Cookies',
    fontSize: scale(17),
    color: LightTheme.colorScheme.primaryText,
    position: 'absolute',
    top: scaleHeight(129),
    left: scaleWidth(140),
    textShadowColor: LightTheme.colorScheme.buttonBorder,
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },

});
