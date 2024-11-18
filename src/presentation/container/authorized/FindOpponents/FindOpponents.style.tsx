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
    top: scaleHeight(102),
    alignItems: 'center',
    backgroundColor: LightTheme.colorScheme.backgroundLabel,
    borderWidth: 2,
    borderColor: LightTheme.colorScheme.borderLabel,
    borderRadius: 8,
    overflow: 'hidden',
    alignContent: 'center',
  },
  buttonBack: {
<<<<<<< HEAD
    left: scaleWidth(20),
    top: scaleHeight(60),
=======
    left: scaleWidth(-60),
    top: scaleHeight(40),
>>>>>>> b19083247395aec8135ea41e63760732b49f483b
    position:'absolute'
  },
  header: {
    flexDirection: 'row',
    width: scaleWidth(128),
    height: scaleHeight(30),
<<<<<<< HEAD
    marginTop: scaleHeight(64),
=======
    marginTop: scaleHeight(49),
>>>>>>> b19083247395aec8135ea41e63760732b49f483b
  },
  textheader: {
    fontFamily: 'SVN-Cookies',
    fontSize: scale(24),
    color: LightTheme.colorScheme.backgroundLabel,
    textAlign: 'center',
  },
  text: {
    fontFamily: 'SVN-Cookies',
    fontSize: scale(18),
    textShadowOffset: { width: 1, height: 1 }, 
    textShadowRadius: 1,
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
<<<<<<< HEAD
    alignItems: 'center',
    justifyContent: 'center',
=======
>>>>>>> b19083247395aec8135ea41e63760732b49f483b
  },
  time: {
    fontFamily: 'SVN-Gotham',
    fontSize: scale(24),
    marginTop: scaleHeight(47),
    color: '#FCD60E'
<<<<<<< HEAD
  },
  avatar: {
    width: scaleWidth(53.85),
    height: scaleHeight(43.47),
=======
>>>>>>> b19083247395aec8135ea41e63760732b49f483b
  }
  
});
