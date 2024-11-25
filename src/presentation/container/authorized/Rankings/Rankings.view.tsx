import React from 'react';
import { View, Text, ImageBackground, Image, ActivityIndicator } from 'react-native';
import { styles } from './Rankings.style';
import { useRankingsLogic } from './Rankings.hook';
import {
    BACKGROUND_RANKINGS,
    FRAME_HEADER_RANKINGS,
    FRAME_RANK_1,
    FRAME_RANK_2,
    RANK_1,
    RANK_2,
    RANK_NOMARL,
    ICON_MYRANK,
    ICON_FACE,
    ICON_FACE_2,
} from '../../../../../assets';
import { RoundBackButton } from '../../../component';
import MaskedView from '@react-native-masked-view/masked-view';
import LinearGradient from 'react-native-linear-gradient';
import { scaleHeight, scaleWidth, scale } from '../../../resource/values';
import { Loading } from '../../../component';
import { useSelector } from 'react-redux';
import { RootState } from 'presentation/shared-state';
export const Rankings: React.FC = () => {
    const {
        topUsers,
        userRank,
        userData,
        handlePress1,
    } = useRankingsLogic();
    const { isLoading, message } = useSelector((state: RootState) => state.loading);

    return (
        <>
            {isLoading && <Loading message="Đang xử lý..." />}
            <ImageBackground source={BACKGROUND_RANKINGS} style={styles.background} resizeMode="stretch">
                <RoundBackButton containerStyle={styles.buttonBack} onPress={handlePress1} />
                <MaskedView
                    style={styles.header}
                    maskElement={<Text style={styles.textheader}>BẢNG XẾP HẠNG</Text>}
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
                            <Image source={ICON_FACE_2} style={styles.avatartop1} />
                            <Text style={styles.textnametop1}>
                                {topUsers.length > 0 && topUsers[0]?.name
                                    ? topUsers[0].name
                                    : 'Đang cập nhật...'}
                            </Text>
                        </ImageBackground>
                        <ImageBackground style={styles.frameavartarank2} source={FRAME_RANK_2}>
                            <Image source={ICON_FACE} style={styles.avatartop2} />
                            <Text style={styles.textnametop2}>
                                {topUsers.length > 0 && topUsers[1]?.name
                                    ? topUsers[1].name
                                    : 'Đang cập nhật...'}
                            </Text>
                        </ImageBackground>
                    </View>
                    <View style={{ alignItems: 'center' }}>
                        {topUsers.map((user, index) => (
                            <ImageBackground
                                key={user.id}
                                style={styles.rank}
                                source={index === 0 ? RANK_1 : index === 1 ? RANK_2 : RANK_NOMARL}
                            >
                                <View
                                    style={{ flexDirection: 'row', alignItems: 'center', width: '100%', height: '100%' }}
                                >
                                    <Text style={styles.textrank}>{index + 1}</Text>
                                    <Image style={styles.avatarrank} source={ICON_FACE} />
                                    <Text style={styles.textname}>
                                        {user.name || 'Đang cập nhật...'}
                                    </Text>
                                    <Text style={styles.textlixi}>
                                        {user.lixi ? user.lixi + ' Lì xì' : 'Đang cập nhật...'}
                                    </Text>
                                    <View style={{ width: scaleWidth(10), height: '100%' }} />
                                </View>
                            </ImageBackground>
                        ))}
                        <Image source={ICON_MYRANK} style={[styles.iconmyrank, { zIndex: 10 }]} />
                        <ImageBackground
                            style={[styles.rank, { marginTop: scaleHeight(-10), zIndex: 0 }]}
                            source={RANK_NOMARL}
                        >
                            {userData != null && (
                                <View
                                    style={{ flexDirection: 'row', alignItems: 'center', width: '100%', height: '100%' }}
                                >
                                    <Text style={styles.textrank}>{userRank}</Text>
                                    <Image style={styles.avatarrank} source={ICON_FACE} />
                                    <Text style={styles.textname}>{userData.name}</Text>
                                    <Text style={styles.textlixi}>{userData.lixi + ' Lì xì'}</Text>
                                    <View style={{ width: scaleWidth(10), height: '100%' }} />
                                </View>
                            )}
                        </ImageBackground>
                    </View>
                </View>
            </ImageBackground>
        </>

    );
};
