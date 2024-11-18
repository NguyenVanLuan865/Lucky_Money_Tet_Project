import React, { useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import {
    FRAME_PHIEU_500K,
    FRAME_PHIEU_200K,
    FRAME_PHIEU_100K,
    FRAME_PHIEU_PHUKIEN,
    FRAME_PHIEU_MOTCHI,
    FRAME_PHIEU_NUACHI,
    FRAME_LUCKYCODE,
    FRAME_PHIEU,
} from '../../../../../assets';
import { useTreasureData } from './treasure.hook';
import { scaleHeight, scaleWidth, scale, WITDH, HEIGHT, LightTheme } from '../../../resource/values';

// const frameMap: Record<string, any> = {
//     phieu500k: FRAME_PHIEU_500K,
//     phieu200k: FRAME_PHIEU_200K,
//     phieu100k: FRAME_PHIEU_100K,
//     phukien: FRAME_PHIEU_PHUKIEN,
//     motchivang: FRAME_PHIEU_MOTCHI,
//     nuachivang: FRAME_PHIEU_NUACHI,
// };

// const frameOrder = Object.keys(frameMap);

const button_tabview = [
    { id: 1, title: 'KÌ QUAY SỐ 1' },
    { id: 2, title: 'KÌ QUAY SỐ 2' },
];

export const MaSoMayMan: React.FC<{ userId: string }> = ({ userId }) => {
    const [selectedButtonId, setSelectedButtonId] = useState(button_tabview[0].id);
    const handlePress = (id: number) => {
        setSelectedButtonId(id);
    };
    const { maSoMayMan } = useTreasureData(userId);
    console.log(maSoMayMan)
    const renderItem = ({ item }: { item: any }) => {
        const frame = maSoMayMan[item.id];
        console.log(frame)
        return (
            <ImageBackground style={styles.card} source={FRAME_PHIEU} resizeMode='center'>
                <ImageBackground source={FRAME_LUCKYCODE} style={styles.frameluckycode}>
                    <Text style={[styles.text, { marginTop: scaleHeight(8) }]}>{item.prefix}</Text>
                    <Text style={styles.text}>{item.codes}</Text>

                    <Text style={[styles.text, { marginTop: scaleHeight(43), height: 12 }]}>Trạng thái</Text>
                    <Text style={[item.trangThai ? styles.receivedtext : styles.Unreceived,]}>
                        {item.status ? 'Đã nhận' : 'Chưa nhận'}
                    </Text>
                </ImageBackground>
            </ImageBackground>
        );
    };

    return (
        <View>
            <View style={styles.tabview}>
                {button_tabview.map((button) => (
                    <TouchableOpacity
                        key={button.id}
                        style={[
                            styles.button,
                            selectedButtonId === button.id && styles.selectedButton,
                        ]}
                        onPress={() => handlePress(button.id)}
                    >
                        <Text
                            style={[
                                styles.tilteButton,
                                selectedButtonId === button.id && styles.selectedTilteButton,
                            ]}
                        >
                            {button.title}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            {selectedButtonId == 1 &&
                <View style={{height: scaleHeight(455)}}>
                    <FlatList
                        data={maSoMayMan}
                        keyExtractor={(item) => (item.id)}
                        renderItem={renderItem}
                        numColumns={3}
                        columnWrapperStyle={styles.row}
                    />
                </View>

            }
        </View>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
        color: 'black',
        fontFamily: 'SVN-Gotham-Light',
        textAlign: 'center',
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
    frameluckycode: {
        width: scaleWidth(74),
        height: scaleHeight(43),
        marginTop: scaleHeight(28),
        alignItems: 'center',
    },
    tabview: {
        width: scaleWidth(331),
        height: scaleHeight(48),
        backgroundColor: LightTheme.colorScheme.backgroundLabel,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    tilteButton: {
        fontSize: scale(14),
        width: '80%',
        textAlign: 'center',
        color: LightTheme.colorScheme.primaryText,
        fontFamily: 'SVN-Cookies',
    },
    button: {
        flex: 1,
        height: scaleHeight(40),
        alignItems: 'center',
        justifyContent: 'center',
    },
    selectedButton: {
        width: scaleWidth(331) / 3,
        height: scaleHeight(40),
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: LightTheme.colorScheme.primaryText,
        borderRadius: 6
    },
    selectedTilteButton: {
        fontSize: scale(14),
        width: '80%',
        textAlign: 'center',
        color: LightTheme.colorScheme.backgroundLabel,
        fontFamily: 'SVN-Cookies',
    },
});
export default MaSoMayMan;