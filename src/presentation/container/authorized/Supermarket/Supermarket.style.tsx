import { StyleSheet } from 'react-native';
import { scaleHeight, scaleWidth, scale, HEIGHT, LightTheme } from '../../../resource/values';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    alignItems: 'center',
    flex: 1,
  },
  label: {
    position: 'absolute',
    width: scaleWidth(335),
    height: scaleHeight(240),
    left: scaleWidth(20),
    justifyContent: 'center',
    alignItems: 'center',     
  },
  label2: {
    position: 'absolute',
    width: scaleWidth(375),
    height: scaleHeight(178),
    top: scaleHeight(634),
    alignItems: 'center',
  },
  buttonBack: {
    left: scaleWidth(20),
    top: scaleHeight(59),
    position:'absolute'
  },
  headertext: {
    fontFamily: 'SVN-Cookies',
    color: LightTheme.colorScheme.primaryText,
    fontSize: scale(24),
    top: scaleHeight(60),
    position: 'absolute',
    left: scaleWidth(98),
  },
  iconContainer: {
    flexDirection: 'row',
    width: '100%',

  },
  iconTextContainer: {
    alignItems: 'center', 
    justifyContent: 'center',
    marginLeft: scale(55),
    marginTop: scale(5)
  },
  icon: {
    width: scaleWidth(93),
    height: scaleHeight(112),
    marginTop: scaleHeight(10),
  },
  text: {
    fontFamily: 'SVN-Gotham-Light',
    fontSize: scale(12),
    color: '#FFF',
    textAlign: 'center',
    marginTop: scaleHeight(5),
  },
  productInfoContainer: {
    width: scaleWidth(120),
    alignItems: 'center',
    marginLeft: scale(24)
  },
  productTitle: {
    fontFamily: 'SVN-Cookies',
    fontSize: scale(14),
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: scaleHeight(5),
    textAlign: 'center',
  },
  productRequirement: {
    fontSize: scale(12),
    color: '#FFF',
    marginBottom: scaleHeight(5),
  },
  quantityContainer: {
    flexDirection: 'row',
    width: '100%', 
    alignItems: 'center',
    marginTop: 10
  },
  quantityText: {
    fontSize: scale(16),
    color: LightTheme.colorScheme.thirdText,
    fontFamily: 'SVN-Cookies',
  },
  quantityControlAdd: {
    flex: 1,
  },
  textheader: {
    fontFamily: 'SVN-Cookies',
    fontSize: scale(16),
    color: LightTheme.colorScheme.backgroundLabel,
    textAlign: 'center',
  },
  notetextheader: {
    fontFamily: 'SVN-Gotham-Light',
    color: '#FFF',
    fontSize: scale(14),
    marginTop: -10,
  },
  header: {
    flexDirection: 'row',
    height: scaleHeight(58),
    width: scaleWidth(119),
  },
  text2: {
    fontSize: scale(16),
    color: '#fff',
    fontFamily: 'SVN-Gotham',
  },
  highlightedNumber: {
    fontSize: scale(24),
    color:  LightTheme.colorScheme.buttonBorder,
    fontFamily: 'SVN-Gotham',
  },
  lable3: {
    width: '100%',
    height: '100%',
    bottom: scaleHeight(10),
  },
  button: {
    position:'absolute',
    top: scaleHeight(681),
  }
});
