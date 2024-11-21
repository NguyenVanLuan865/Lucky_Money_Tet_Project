import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Image, ImageBackground, SafeAreaView, Text, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BACKGROUND_RANKINGS, FRAME_HEADER_RANKINGS, FRAME_RANK_1, FRAME_RANK_2, RANK_1, RANK_2, RANK_NOMARL, ICON_MYRANK, ICON_FACE, ICON_FACE_2 } from '../../../../../assets';
import { scaleHeight, scaleWidth, scale } from '../../../resource/values';
import { FlatButton, RoundBackButton } from '../../../component';
import { styles } from './Rankings.style';
import MaskedView from '@react-native-masked-view/masked-view';
import LinearGradient from 'react-native-linear-gradient';
import firestore from '@react-native-firebase/firestore';
import { useSelector } from 'react-redux';
import { RootState } from '../../../shared-state';
import { Icon } from 'react-native-vector-icons/Icon';

const _Rankings: React.FC = () => {
    const [topUsers, setTopUsers] = useState<any[]>([]);
    const [userRank, setUserRank] = useState<number | null>(null);
    const [userData, setUserData] = useState<any>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isWaiting, setIsWaiting] = useState<boolean>(true); // State chờ trước khi gọi dữ liệu
    const userId = useSelector((state: RootState) => state.authentication.token);

    const navigation = useNavigation();
    const handlePress1 = () => {
        navigation.navigate('Congress');
    };
    useEffect(() => {
        const timeout = setTimeout(() => {
            setIsWaiting(false);
            const fetchLeaderboardData = async () => {
                try {
                    setIsLoading(true);

                    const topSnapshot = await firestore()
                        .collection('users')
                        .orderBy('lixi', 'desc')
                        .limit(5)
                        .get();
                    const topUsers = topSnapshot.docs
                        .map((doc) => ({
                            id: doc.id,
                            ...doc.data(),
                        }))
                        .sort((a, b) => parseInt(b.lixi) - parseInt(a.lixi))
                        .map((user, index) => ({
                            ...user,
                            rank: index + 1,
                        }));
                    setTopUsers(topUsers);
                    console.log(topUsers)
                    // Lấy dữ liệu người dùng hiện tại
                    const userDoc = await firestore().collection('users').doc(userId!).get();
                    const userData = userDoc.data();
                    // Tìm thứ hạng của người dùng hiện tại
                    const allUsersSnapshot = await firestore()
                        .collection('users')
                        .orderBy('lixi', 'desc')
                        .get();

                    const allUsers = allUsersSnapshot.docs.map((doc) => ({
                        id: doc.id,
                        lixi: doc.data().lixi,
                    }));
                    setUserData(userData);
                    console.log(userData)
                    const userRank = allUsers.findIndex((user) => user.id === userId) + 1;
                    setUserRank(userRank);

                    console.log('Rank của user:', userRank);
                } catch (error) {
                    console.error('Error fetching leaderboard data:', error);
                } finally {
                    setIsLoading(false);
                }
            };

            fetchLeaderboardData();
        }, 5000); // Chờ 5 giây

        return () => clearTimeout(timeout);
    }, [userId]);
    console.log(topUsers[0])

    // console.log(userRank)
    if (isWaiting) {
        return (
            <View style={{ height: 100, width: 100 }}>
                <ActivityIndicator size="large" color="#FCD60E" />
                <Text >Đang chuẩn bị dữ liệu...</Text>
            </View>
        );
    }

    if (isLoading) {
        return (
            <View style={{ height: 100, width: 100 }}>
                <ActivityIndicator size="large" color="#FCD60E" />
                <Text >Đang tải dữ liệu xếp hạng...</Text>
            </View>
        );
    }

   return (
        <ImageBackground source={BACKGROUND_RANKINGS} style={styles.background} resizeMode="stretch">
            <RoundBackButton
                containerStyle={styles.buttonBack}
                onPress={handlePress1}
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
                        <Image source={ICON_FACE_2} style={styles.avatartop1}/>
                        <Text style={styles.textnametop1}>
                                {topUsers.length > 0 && topUsers[0]?.name
                                    ? topUsers[0].name
                                    : 'Đang cập nhật...'}</Text>
                    </ImageBackground>
                    <ImageBackground style={styles.frameavartarank2} source={FRAME_RANK_2}>
                    <Image source={ICON_FACE} style={styles.avatartop2}/>
                        <Text style={styles.textnametop2}>
                                {topUsers.length > 0 && topUsers[1]?.name
                                    ? topUsers[1].name
                                    : 'Đang cập nhật...'}</Text>
                    </ImageBackground>
                </View>
                <View style={{ alignItems: 'center' }}>
                    <ImageBackground style={styles.rank} source={RANK_1}>
                        <View style={{ flexDirection: "row", alignItems: 'center', width: '100%', height: '100%' }}>
                            <Text style={styles.textrank}></Text>
                            <Image style={styles.avatarrank} source={ICON_FACE} />
                            <Text style={styles.textname}>
                                {topUsers.length > 0 && topUsers[0]?.name
                                    ? topUsers[0].name
                                    : 'Đang cập nhật...'}</Text>
                            <Text style={styles.textlixi}>{topUsers.length > 0 && topUsers[0]?.lixi
                                ? topUsers[0].lixi + ' Lì xì'
                                : 'Đang cập nhật...'}</Text>
                                <View style={{width: scaleWidth(10), height: '100%'}}/>
                        </View>

                    </ImageBackground>
                    <ImageBackground style={styles.rank} source={RANK_2}>
                        <View style={{ flexDirection: "row", alignItems: 'center', width: '100%', height: '100%' }}>
                            <Text style={styles.textrank}> </Text>
                            <Image style={styles.avatarrank} source={ICON_FACE} />
                            <Text style={styles.textname}>
                                {topUsers.length > 0 && topUsers[1]?.name
                                    ? topUsers[1].name
                                    : 'Đang cập nhật...'}</Text>
                            <Text style={styles.textlixi}>
                                {topUsers.length > 0 && topUsers[1]?.lixi
                                    ? topUsers[1].lixi + ' Lì xì'
                                    : 'Đang cập nhật...'}</Text>
                                <View style={{width: scaleWidth(10), height: '100%'}}/>

                        </View>
                    </ImageBackground>
                    <ImageBackground style={styles.rank} source={RANK_NOMARL}>
                        <View style={{ flexDirection: "row", alignItems: 'center', width: '100%', height: '100%' }}>
                            <Text style={styles.textrank}>3</Text>
                            <Image style={styles.avatarrank} source={ICON_FACE} />
                            <Text style={styles.textname}>
                                {topUsers.length > 0 && topUsers[2]?.name
                                    ? topUsers[2].name
                                    : 'Đang cập nhật...'}</Text>
                            <Text style={styles.textlixi}>
                                {topUsers.length > 0 && topUsers[2]?.lixi
                                    ? topUsers[2].lixi + ' Lì xì'
                                    : 'Đang cập nhật...'}</Text>
                                <View style={{width: scaleWidth(10), height: '100%'}}/>

                        </View>
                    </ImageBackground>
                    <ImageBackground style={styles.rank} source={RANK_NOMARL}>
                        <View style={{ flexDirection: "row", alignItems: 'center', width: '100%', height: '100%' }}>
                            <Text style={styles.textrank}>4</Text>
                            <Image style={styles.avatarrank} source={ICON_FACE} />
                            <Text style={styles.textname}>
                                {topUsers.length > 0 && topUsers[3]?.name
                                    ? topUsers[3].name
                                    : 'Đang cập nhật...'}</Text>
                            <Text style={styles.textlixi}>
                                {topUsers.length > 0 && topUsers[3]?.lixi
                                    ? topUsers[3].lixi + ' Lì xì'
                                    : 'Đang cập nhật...'}</Text>
                                <View style={{width: scaleWidth(10), height: '100%'}}/>

                        </View>
                    </ImageBackground>
                    <ImageBackground style={styles.rank} source={RANK_NOMARL}>
                        <View style={{ flexDirection: "row", alignItems: 'center', width: '100%', height: '100%' }}>
                            <Text style={styles.textrank}>5</Text>
                            <Image style={styles.avatarrank} source={ICON_FACE} />
                            <Text style={styles.textname}>
                                {topUsers.length > 0 && topUsers[4]?.name
                                    ? topUsers[4].name
                                    : 'Đang cập nhật...'}</Text>
                            <Text style={styles.textlixi}>
                                {topUsers.length > 0 && topUsers[4]?.lixi
                                    ? topUsers[4].lixi + ' Lì xì'
                                    : 'Đang cập nhật...'}</Text>
                                <View style={{width: scaleWidth(10), height: '100%'}}/>

                        </View>
                    </ImageBackground>

                    <Image source={ICON_MYRANK} style={[styles.iconmyrank, { zIndex: 10 }]} />
                    <ImageBackground style={[styles.rank, { marginTop: scaleHeight(-10), zIndex: 0, }]} source={RANK_NOMARL}>
                        {userData != null && (
                            <View style={{ flexDirection: "row", alignItems: 'center', width: '100%', height: '100%' }}>
                                <Text style={styles.textrank}>{userRank}</Text>
                                <Image style={styles.avatarrank} source={ICON_FACE} />
                                <Text style={styles.textname}>
                                    {userData.name}</Text>
                                <Text style={styles.textlixi}>
                                    {userData.lixi + ' Lì xì'}</Text>
                                <View style={{width: scaleWidth(10), height: '100%'}}/>

                            </View>)}
                    </ImageBackground>
                </View>
            </View>
        </ImageBackground>
    );
};

export const Rankings = React.memo(_Rankings);
