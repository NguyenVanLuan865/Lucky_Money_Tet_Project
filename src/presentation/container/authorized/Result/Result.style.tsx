import { StyleSheet } from 'react-native';
import { scaleHeight, scaleWidth, scale, HEIGHT, LightTheme, WITDH } from '../../../resource/values';
export const styles = StyleSheet.create({
    background: {
        alignItems: 'center',
        flex: 1,
        backgroundColor: LightTheme.colorScheme.backgroundgodmonetlucky,
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
        marginTop: scaleHeight(64),
    },
    textheader: {
        fontFamily: 'SVN-Cookies',
        fontSize: scale(24),
        color: LightTheme.colorScheme.backgroundLabel,
        textAlign: 'center',
    },

});
