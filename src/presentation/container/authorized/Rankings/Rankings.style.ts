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
<<<<<<< HEAD
        alignItems: 'center',
=======
>>>>>>> b19083247395aec8135ea41e63760732b49f483b
    },
    frameavartarank2: {
        width: scaleWidth(122.5),
        height: scaleHeight(104),
<<<<<<< HEAD
        marginLeft: scaleWidth(5),
        alignItems: 'center',
=======
        marginLeft: scaleWidth(5)
>>>>>>> b19083247395aec8135ea41e63760732b49f483b
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
<<<<<<< HEAD
        zIndex: 1,
    },
    avatarrank: {
        width: scaleWidth(20),
        height: scaleHeight(17),
        marginLeft: scaleWidth(17),
    },
    textname: {
        fontFamily: 'SVN-Gotham',
        fontSize: scale(10),
        color: LightTheme.colorScheme.buttonBorder,
        marginLeft: scaleWidth(13),
        textAlign: 'left',
    },
    textlixi: {
        fontFamily: 'SVN-Gotham',
        fontSize: scale(12),
        color: LightTheme.colorScheme.secondaryText,
        flex: 1, 
        textAlign: 'right' 
    },
    textrank: {
        fontFamily: 'SVN-Gotham',
        fontSize: scale(12),
        color: LightTheme.colorScheme.buttonBorder,
        marginLeft: scaleWidth(16),
        width: scaleWidth(32),
        textAlign: 'center',
    },
    avatartop1: {
        width: scaleWidth(48.41),
        height: scaleHeight(39.08),
        marginTop: scaleHeight(46.64),
    },
    avatartop2: {
        width: scaleWidth(48.41),
        height: scaleHeight(39.08),
        marginTop: scaleHeight(21.54),
    },
    textnametop1: {
        width: scaleWidth(75.7),
        fontFamily: 'SVN-Gotham',
        fontSize: scale(9.18),
        color:  LightTheme.colorScheme.secondaryText,
        textAlign: 'center',
        marginTop: scaleHeight(14.42)
    },
    textnametop2: {
        width: scaleWidth(75.7),
        fontFamily: 'SVN-Gotham',
        fontSize: scale(9.18),
        color:  'black',
        textAlign: 'center',
        marginTop: scaleHeight(14.42)
=======
>>>>>>> b19083247395aec8135ea41e63760732b49f483b
    }
});
