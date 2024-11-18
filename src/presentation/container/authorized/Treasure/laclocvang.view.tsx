import React from 'react';
import { View, Text, FlatList, Image, StyleSheet, ImageBackground } from 'react-native';
import {
    FRAME_PHIEU_500K,
    FRAME_PHIEU_200K,
    FRAME_PHIEU_100K,
    FRAME_PHIEU_PHUKIEN,
    FRAME_PHIEU_MOTCHI,
    FRAME_PHIEU_NUACHI,
} from '../../../../../assets';
import { useTreasureData } from './treasure.hook';
import { scaleHeight, scaleWidth, scale, WITDH, HEIGHT } from '../../../resource/values';

const frameMap: Record<string, any> = {
    phieu500k: FRAME_PHIEU_500K,
    phieu200k: FRAME_PHIEU_200K,
    phieu100k: FRAME_PHIEU_100K,
    phukien: FRAME_PHIEU_PHUKIEN,
    motchivang: FRAME_PHIEU_MOTCHI,
    nuachivang: FRAME_PHIEU_NUACHI,
};

const frameOrder = Object.keys(frameMap);


export const LacLocVang: React.FC<{ userId: string }> = ({ userId }) => {
    const { lacLocVang } = useTreasureData(userId);
    const filteredData = lacLocVang
        .filter((item) => item.soLuong > 0) 
        .sort((a, b) => frameOrder.indexOf(a.id) - frameOrder.indexOf(b.id)); 

    console.log(filteredData)
    const renderItem = ({ item }: { item: any }) => {
        const frame = frameMap[item.id];
        console.log(frame)
        return (
            <ImageBackground style={styles.card} source={frame} resizeMode='center'>
                <View style={{ marginTop: scaleHeight(61.57) }}>
                    <Text style={styles.text}>{item.name}</Text>
                    <Text style={[styles.text, { marginTop: scaleHeight(16.21) }]}>Số lượng: {item.soLuong}</Text>
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
            data={filteredData}
            keyExtractor={(item) => (item.id)}
            renderItem={renderItem}
            numColumns={3}
            columnWrapperStyle={styles.row}
            style={{marginTop: scaleHeight(16)}}
        />
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    row: {
        flexDirection: 'row',
        // marginTop: scaleHeight(5),
    },
    card: {
        width: scaleWidth(96),
        height: scaleHeight(155),
        alignItems: 'center',
        margin: scale(5)
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

    }
});
export default LacLocVang;