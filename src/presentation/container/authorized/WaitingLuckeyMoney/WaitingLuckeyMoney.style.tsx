import { StyleSheet } from 'react-native';
import { scaleHeight, scaleWidth, scale, HEIGHT, LightTheme, WITDH } from '../../../resource/values';
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
        left: scaleWidth(20),
        top: scaleHeight(60),
        position:'absolute'
      },
    frameavatar: {
        width: scaleWidth(180.5),
        height: scaleHeight(188),
        marginTop: scaleHeight(32),
    },
    text1: {
        fontFamily: 'SVN-Gotham',
        fontSize: scale(20),
        color: LightTheme.colorScheme.borderLabel,
        marginTop: scaleHeight(120),
    },
    text2: {
        fontFamily: 'SVN-Gotham-Light',
        fontSize: scale(16),
        color: LightTheme.colorScheme.secondaryText,
        marginTop: scaleHeight(0),
    },
    user: {
        position: 'absolute',
        width: scaleWidth(100),
        height: scaleHeight(40),
        top: scaleHeight(0),
        zIndex: 10,
        flex: 1 
    },
    username: {
        fontFamily: 'SVN-Cookies',
        fontSize: scale(16),
        textAlign: 'center'
    }
});
