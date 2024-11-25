import { StyleSheet } from 'react-native';
import { scaleHeight, scaleWidth, scale, HEIGHT, LightTheme, WITDH } from '../../../resource/values';
export const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    popup: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
    },
    popupText: {
      fontSize: scale(16),
      color: LightTheme.colorScheme.primaryText,
      textAlign: 'center',
      fontFamily: 'SVN-Cookies',
      textShadowColor: LightTheme.colorScheme.buttonBorder,
      textShadowOffset: { width: 1, height: 1 },
      textShadowRadius: 1,
    },
    navigationButtons: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '80%',
    },
    navButton: {
      backgroundColor: '#FCD60E',
      padding: 10,
      borderRadius: 5,
      marginHorizontal: 10,
    },
    acceptButton: {
      backgroundColor: '#FCD60E',
      padding: 15,
      borderRadius: 10,
      marginTop: 20,
    },
    buttonText: {
      color: '#000',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    buttonBack: {
      left: scaleWidth(20),
      top: scaleHeight(59),
      position: 'absolute'
    },
    text2: {
      fontFamily: 'SVN-Gotham',
      fontSize: scale(16),
      color: 'black',
      marginTop: scaleHeight(476)
    },
    labellac1lan: {
      width: scaleWidth(316),
      height: scaleHeight(347),
    },
    icon: {
      width: scaleWidth(55.5),
      height: scaleHeight(49),
    },
    frameluckycode: {
      width: scaleWidth(97),
      height: scaleHeight(51.5),
      marginLeft: scaleWidth(30.5),
      alignItems: 'center',
    },
    textluckycode: {
      textAlign: 'center',
      fontFamily: 'SVN-Gotham-Light',
      fontSize: scale(12),
      color: 'black',
    },
    text3: {
      fontFamily: 'SVN-Gotham-Light',
      fontSize: scale(11),
      marginTop: scaleHeight(27.5),
      width: scaleWidth(198),
      color: LightTheme.colorScheme.primaryText,
      textAlign: 'center',
      textShadowColor: LightTheme.colorScheme.buttonBorder,
      textShadowOffset: { width: 1, height: 1 },
      textShadowRadius: 1,
      marginLeft: scaleWidth(59)
    },
    labellac10lan: {
      width: scaleWidth(347),
      height: scaleHeight(538),
      alignItems: 'center'
    },
    text4: {
      fontFamily: 'SVN-Cookies',
      fontSize: scale(16),
      marginTop: scaleHeight(190),
      color: LightTheme.colorScheme.buttonBorder,
      textAlign: 'center',
    },
    popupText2: {
      fontFamily: 'SVN-Gotham',
      fontSize: scale(14),
      color: LightTheme.colorScheme.secondaryText,
      textAlign: 'center',
    },
    button: {
      width: scaleWidth(29),
      height: scaleHeight(29),
      borderRadius: scale(29),
      borderColor: '#FEFF0B',
      borderWidth: 3,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#FFF613'
    },
    buttontext1: {
      fontFamily: 'SVN-Cookies',
      fontSize: scale(16),
      color: LightTheme.colorScheme.primaryText,
      textAlign: 'center',
    },
    text5: {
      fontFamily: 'SVN-Gotham',
      fontSize: scale(12),
      color: LightTheme.colorScheme.buttonBorder,
      textAlign: 'center',
      marginLeft: scaleWidth(10),
      marginRight: scaleWidth(10)
    },
    text6: {
      fontFamily: 'SVN-Gotham',
      fontSize: scale(12),
      color: LightTheme.colorScheme.secondaryText,
      textAlign: 'center',
      marginTop: scaleHeight(24)
    }
  });
  