import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, StyleSheet, ImageBackground } from 'react-native';
import {
    FRAME_PHIEU, ICON_CHANGE_50K, ICON_CHANGE_100K
} from '../../../../../assets';
import { useTreasureData } from './treasure.hook';
import { scaleHeight, scaleWidth, scale, WITDH, HEIGHT } from '../../../resource/values';
import { listenToLixiSubCollection, } from '../../../../data/data-source/user';
const frameMap: Record<string, any> = {
    phieu_100k: ICON_CHANGE_100K,
    phieu_50k: ICON_CHANGE_50K,
};

const frameOrder = Object.keys(frameMap);


export const LiXiVang: React.FC<{ userId: string }> = ({ userId }) => {

    const [lixiData, setLixiData] = useState<any[]>([]);
    useEffect(() => {
        const unsubscribe = listenToLixiSubCollection(userId, setLixiData);

        return () => unsubscribe();
    }, []);
    console.log(lixiData)
    const filteredData = lixiData
        .filter((item) => item.soLuong > 0)
        .sort((a, b) => frameOrder.indexOf(a.id) - frameOrder.indexOf(b.id));

    console.log("data lọc xong: ", filteredData)
    const renderItem = ({ item }: { item: any }) => {
        const frame = frameMap[item.id];
        console.log(frame)
        return (
            <ImageBackground style={styles.card} source={FRAME_PHIEU} resizeMode='center'>
                <Image source={frame} style={styles.image} />
                <View style={{ marginTop: scaleHeight(2.35) }}>
                    <Text style={styles.text}>{item.name}</Text>
                    <Text style={[styles.text, { marginTop: scaleHeight(16.21) }]}>Số lượng: {item.soluong}</Text>
                    <Text style={styles.text}>Trạng thái</Text>
                    <Text style={item.trangThai ? styles.receivedtext : styles.Unreceived}>
                        {item.status ? 'Đã nhận' : 'Chưa nhận'}
                    </Text>
                </View>
            </ImageBackground>
        );
    };

    return (
        <FlatList
            data={lixiData}
            keyExtractor={(item) => (item.id)}
            renderItem={renderItem}
            numColumns={3}
            columnWrapperStyle={styles.row}
            style={{ marginTop: scaleHeight(16), marginLeft: scaleWidth(10) }}
        />
    );
};

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
    },
    card: {
        width: scaleWidth(96),
        height: scaleHeight(155),
        alignItems: 'center',
        margin: scale(5),
    },
    text: {
        fontSize: scale(10),
        color: '#732F2F',
        fontFamily: 'SVN-Gotham',
        textAlign: 'center',
        maxWidth: scaleWidth(86.61),
    },
    receivedtext: {
        fontSize: scale(10),
        fontWeight: 'bold',
        color: '#2E8718',
        fontFamily: 'SVN-Gotham',
        textAlign: 'center',

    },
    Unreceived: {
        fontSize: scale(10),
        fontWeight: 'bold',
        color: '#C2030B',
        fontFamily: 'SVN-Gotham',
        textAlign: 'center',

    },
    image: {
        width: scaleWidth(41.74),
        height: scaleHeight(53.22),
        margin: scale(6)
    }
});
export default LiXiVang;