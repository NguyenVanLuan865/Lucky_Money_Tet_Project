import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, ImageBackground } from 'react-native';
import { FlatButton, RoundBackButton } from '../../../component';
import { BACKGROUND_FINDOPPONENTS, FRAME_AVATAR } from '../../../../../assets';
import { scaleHeight, scaleWidth, scale, HEIGHT, LightTheme, WITDH } from '../../../resource/values';
import { styles } from './FindOpponents.style';
import LinearGradient from 'react-native-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';
import { useNavigation } from '@react-navigation/native';
const _FindOpponents: React.FC = () => {

    const navigation = useNavigation();

    const handlePress = () => {
        navigation.navigate('Win'); 
    };

    return (

        <ImageBackground source={BACKGROUND_FINDOPPONENTS} style={styles.background} resizeMode="stretch">
            <RoundBackButton
                containerStyle={styles.buttonBack}
            />
            <MaskedView
                style={styles.header}
                maskElement={
                    <Text style={styles.textheader}>THÁNH LÌ XÌ</Text>
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
            <View style={styles.labelframeavatar}>

                <View style={{ flex: 1 }}>
                    <ImageBackground source={FRAME_AVATAR} style={[styles.frameavatar]} resizeMode='stretch'>

                    </ImageBackground>
                    <Text style={[styles.text, { color: LightTheme.colorScheme.primaryText, textShadowColor: LightTheme.colorScheme.secondaryText, }]}>Username1</Text>
                </View>
                <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                    <ImageBackground source={FRAME_AVATAR} style={[styles.frameavatar]} resizeMode='stretch'>

                    </ImageBackground>
                    <Text style={[styles.text, { color: '#FCD60E', textShadowColor: 'black', }]}>Username1</Text>

                </View>
            </View>
            <Text style={styles.time}>00:05</Text>
            <FlatButton
                title={'Chơi'}
                containerStyle={{marginTop: scale(40)}}
                onPress={handlePress}
            />
            <FlatButton
                title={'Hủy'}
            />
        </ImageBackground>
    );
};

export const FindOpponents = React.memo(_FindOpponents)

