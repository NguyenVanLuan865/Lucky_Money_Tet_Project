import React from 'react';
import { View, Text, ImageBackground, Image, Alert } from 'react-native';
import { FlatButton, } from '../../../component';
import { BACKGROUND_GODENLUCKYMONEY, FRAME_WIN, LOGO_1 } from '../../../../../assets';
import { scaleHeight, scaleWidth, scale, HEIGHT, LightTheme, WITDH } from '../../../resource/values';
import { RoundBackButton } from '../../../component/button/RoundBackButton';
import { styles } from './Win.style';
import LinearGradient from 'react-native-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
const _Win: React.FC = ({ route }: any) => {
    const { roomId, userId, userScore, game } = route.params;
    const navigation = useNavigation();


    const handlePress = async () => {
        try {
            const userRef = firestore().collection('users').doc(userId);
            await firestore().runTransaction(async (transaction) => {
                const userDoc = await transaction.get(userRef);
                if (!userDoc.exists) {
                    throw new Error('Người dùng không tồn tại.');
                }
                const currentLixi = userDoc.data()?.lixi || 0;
                transaction.update(userRef, {
                    lixi: currentLixi + 1,
                });
            });

            console.log('Đã cộng thêm 1 vào lixi thành công!');
            navigation.replace('Rankings'); // Điều hướng đến màn hình chính
        } catch (error) {
            console.error('Lỗi khi cập nhật lixi:', error);
            Alert.alert('Lỗi', 'Không thể cập nhật lì xì.');
        }
    };
    return (
        <View style={styles.background}>
            <RoundBackButton
                containerStyle={styles.buttonBack}
            />
            <MaskedView
                style={styles.header}
                maskElement={
                    <Text style={styles.textheader}>
                        {game === 'game1'
                            ? `THÁNH LÌ XÌ`
                            : `TẾT TRANH TÀI`}</Text>
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
            <Image source={LOGO_1} style={styles.logo} resizeMode='stretch' />
            <ImageBackground source={FRAME_WIN} style={styles.label} resizeMode='cover'>
                <View style={styles.mission}>
                    <Text style={[styles.text, { fontSize: scale(16), }]}>
                        {game === 'game1'
                            ? `Bạn đạt ${userScore}/5 câu đúng`
                            : `Bạn đạt ${userScore} điểm`}
                    </Text>
                    <Text style={styles.text2}>
                        {game === 'game1'
                            ? `Xuất sắc quá! Thánh đáp nhanh trúng lớn đây rồi! Tích cực tham gia mỗi ngày để
                        có thêm nhiều lì xì nhé!`
                            : `Tuyệt vời! Bạn đúng là một cao thủ trong trò chơi này! Hãy tiếp tục chinh phục thử thách mỗi ngày để tích lũy thêm thật nhiều điểm thưởng nhé!`}
                    </Text>

                </View>
                <FlatButton
                    title="Chia sẻ"
                    containerStyle={styles.button}
                    onPress={handlePress}
                />
                <FlatButton
                    title="Nhận lộc"
                    containerStyle={[styles.button, { marginTop: scaleHeight(19) }]}
                    onPress={handlePress}
                />
            </ImageBackground>
        </View>
    );
};

export const Win = React.memo(_Win)
// import React, { useState } from 'react';
// import { StyleSheet, View, Text, Animated, Dimensions } from 'react-native';

// // Kích thước màn hình
// const { width, height } = Dimensions.get('window');

// const _Win: React.FC = React.memo(() => {
//     const [score, setScore] = useState(0);
//     const [touchPosition, setTouchPosition] = useState<{ x: number; y: number } | null>(null);
//     const [fadeAnim] = useState(new Animated.Value(1)); // Hiệu ứng mờ dần của "+1"

//     const handleTouch = (event: any) => {
//         const touches = event.nativeEvent.touches;
//         setScore(prevScore => prevScore + touches.length); // Cộng điểm dựa trên số ngón tay chạm

//         // Vị trí chạm mới cho "+1"
//         const newTouchPosition = {
//             x: touches[0].pageX - 10,
//             y: touches[0].pageY - 10,
//         };
//         setTouchPosition(newTouchPosition);

//         // Thiết lập hiệu ứng mờ dần cho text "+1"
//         fadeAnim.setValue(1); // Đặt lại giá trị ban đầu
//         Animated.timing(fadeAnim, {
//             toValue: 0,
//             duration: 500, // Thời gian mờ dần
//             useNativeDriver: true,
//         }).start();
//     };

//     return (
//         <View
//             style={styles.container}
//             onStartShouldSetResponder={() => true}
//             onResponderGrant={handleTouch} // Đảm bảo sự kiện được xử lý khi vừa chạm vào
//         >
//             <Text style={styles.score}>Điểm: {score}</Text>
//             {touchPosition && (
//                 <Animated.Text
//                     style={[
//                         styles.plusOne,
//                         { left: touchPosition.x, top: touchPosition.y, opacity: fadeAnim },
//                     ]}
//                 >
//                     +1
//                 </Animated.Text>
//             )}
//         </View>
//     );
// });

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#F2F2F2',
//     },
//     score: {
//         fontSize: 24,
//         fontWeight: 'bold',
//         marginTop: 40,
//         textAlign: 'center',
//     },
//     plusOne: {
//         position: 'absolute',
//         fontSize: 18,
//         fontWeight: 'bold',
//         color: '#FF0000',
//     },
// });

// export const Win = React.memo(_Win)

