import React from 'react';
import { StyleSheet, View, Image, ImageBackground, SafeAreaView, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BACKGROUND_RANKINGS, FRAME_HEADER_RANKINGS, FRAME_RANK_1, FRAME_RANK_2, RANK_1, RANK_2, RANK_NOMARL, ICON_MYRANK } from '../../../../../assets';
import { scaleHeight, scaleWidth, scale } from '../../../resource/values';
import { FlatButton, RoundBackButton } from '../../../component';
import { styles } from './Rankings.style';
import MaskedView from '@react-native-masked-view/masked-view';
import LinearGradient from 'react-native-linear-gradient';
const _Rankings: React.FC = () => {
    return (
        <ImageBackground source={BACKGROUND_RANKINGS} style={styles.background} resizeMode="stretch">
            <RoundBackButton
                containerStyle={styles.buttonBack}
            />
            <MaskedView
                style={styles.header}
                maskElement={
                    <Text style={styles.textheader}>BẢNG XẾP HẠNG</Text>
                }
            >
                <LinearGradient
                    colors={['#FCD60E', '#FFF9E1', '#FCD60E']}
                    locations={[0.1, 0.3, 0.9]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={{ flex: 1, height: '100%' }}
                />
            </MaskedView>
            <Image source={FRAME_HEADER_RANKINGS} style={styles.headerbutton} />
            <View style={styles.label}>
                <View style={styles.framerank1_2}>
                    <ImageBackground style={styles.frameavartarank1} source={FRAME_RANK_1}>

                    </ImageBackground>
                    <ImageBackground style={styles.frameavartarank2} source={FRAME_RANK_2}>

                    </ImageBackground>
                </View>
                <View style={{alignItems: 'center'}}>
                    <ImageBackground style={styles.rank} source={RANK_1}>

                    </ImageBackground>
                    <ImageBackground style={styles.rank} source={RANK_2}>

                    </ImageBackground>
                    <ImageBackground style={styles.rank} source={RANK_NOMARL}>

                    </ImageBackground>
                    <ImageBackground style={styles.rank} source={RANK_NOMARL}>

                    </ImageBackground>
                    <ImageBackground style={styles.rank} source={RANK_NOMARL}>

                    </ImageBackground>
                    {/*xếp hạng của user */}
                    <Image source={ICON_MYRANK} style={[styles.iconmyrank, {zIndex: 10}]}/>
                    <ImageBackground style={[styles.rank, { marginTop: scaleHeight(-10),  zIndex: 0,}]} source={RANK_NOMARL}>

                    </ImageBackground>
                </View>
            </View>
        </ImageBackground>
    );
};

export const Rankings = React.memo(_Rankings);
