import { StyleSheet } from 'react-native';
import { LightTheme } from '../../../resource/values';
import { scaleHeight, scaleWidth, scale } from '../../../resource/values';

export const styles = StyleSheet.create({
    background: {
        alignItems: 'center',
        flex: 1,
    },
    buttonBack: {
        left: scaleWidth(20),
        top: scaleHeight(60),
        position: 'absolute'
    },
    header: {
        flexDirection: 'row',
        width: scaleWidth(170),
        height: scaleHeight(30),
        marginTop: scaleHeight(59),
    },
    textheader: {
        fontFamily: 'SVN-Cookies',
        fontSize: scale(24),
        color: LightTheme.colorScheme.backgroundLabel,
        textAlign: 'center',
    },
    headerbutton: {
        width: scaleWidth(315),
        height: scaleHeight(53),
        marginTop: scaleHeight(44),
        zIndex: 1,
    },
    label: {
        width: scaleWidth(335),
        height: scaleHeight(560),
        marginTop: scaleHeight(-33),
        alignItems: 'center',
        backgroundColor: LightTheme.colorScheme.backgroundLabel,
        borderWidth: 2,
        borderColor: LightTheme.colorScheme.borderLabel,
        borderRadius: 8,
        zIndex: 0
    },
    framerank1_2: {
        flexDirection: 'row',
        height: scaleHeight(126.5),
        width: scaleWidth(255.5),
        marginTop: scaleHeight(39),
        alignItems: 'flex-end'
    },
    frameavartarank1: {
        width: scaleWidth(122.5),
        height: scaleHeight(126.5),
    },
    frameavartarank2: {
        width: scaleWidth(122.5),
        height: scaleHeight(104),
        marginLeft: scaleWidth(5)
    },
    rank: {
        width: scaleWidth(303),
        height: scaleHeight(46),
        marginTop: scaleHeight(11.5),
    },
    iconmyrank: {
        width: scaleWidth(87),
        height: scaleHeight(21.25),
        marginTop: scaleHeight(8),
    }
});
