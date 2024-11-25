import React from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  Modal,
  ImageBackground,
  Image,
  TouchableOpacity
} from 'react-native';
import { BACKGROUND_SHAKEGOLDENFORTUNE, LABEL_LAC1LAN, LABEL_LAC10LAN, FRAME_LUCKYCODE } from '../../../../../assets';
import { FlatButton, RoundBackButton } from '../../../component';
import { useGoldenFortuneLogic } from './shakegoldenfortune.logic';
import { styles } from './shakegoldenfortune.style';
import { scaleHeight, scaleWidth, scale, HEIGHT, LightTheme, WITDH } from '../../../resource/values';
import { Loading } from '../../../component';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../shared-state';
import { useLoadingOnFocus } from '../../../hook';

export const ShakeGoldenFortune: React.FC = () => {
  const {
    lacloc,
    showPopup,
    isTenTimes,
    results,
    currentIndex,
    onShakeOnce,
    onShakeTenTimes,
    onAcceptReward,
    closePopup,
    rewardDisplayMap,
    rewardIconMap,
    handleNextReward,
    handlePreviousReward,
    isProcess,
  } = useGoldenFortuneLogic();
  const { isLoading, message } = useSelector((state: RootState) => state.loading);
  useLoadingOnFocus('Đang tải dữ liệu...', 3000);
  return (
    <ImageBackground style={styles.container} source={BACKGROUND_SHAKEGOLDENFORTUNE} resizeMode="stretch">
      <>
        {!isProcess && (
          <>
            <RoundBackButton containerStyle={styles.buttonBack} />
            <Text style={[styles.text2, { textAlign: 'center' }]}>
              Bạn có{' '}
              <Text style={[{ color: LightTheme.colorScheme.primaryText, fontSize: scale(24) }]}>{lacloc}</Text>
              {' '} lượt lắc
            </Text>
            <FlatButton
              title="Lắc 1 lượt"
              buttonWidth={scaleWidth(180)}
              buttonHeight={scaleHeight(44)}
              containerStyle={{ marginTop: scaleHeight(11) }}
              onPress={onShakeOnce}
            />
            <FlatButton
              title="Lắc 10 lượt"
              buttonWidth={scaleWidth(180)}
              buttonHeight={scaleHeight(44)}
              containerStyle={{ marginTop: scaleHeight(12) }}
              onPress={onShakeTenTimes}
            />
          </>
        )}

      </>
      <Modal visible={showPopup} transparent animationType="slide">
        <View style={styles.popup}>
          {isTenTimes ? (
            <>
              {isLoading && <Loading message="Đang xử lý..." />}
              <ImageBackground source={LABEL_LAC10LAN} style={styles.labellac10lan} resizeMode='stretch'>
                <Text style={styles.text4}>LỘC TỚI NGẬP TRÀN</Text>
                <Text style={[styles.popupText2, { marginTop: scaleHeight(10) }]}>
                  {rewardDisplayMap[results[currentIndex]?.reward.id] || 'Phần thưởng không xác định'}
                </Text>
                <Text style={styles.popupText2}>
                  1 Mã số may mắn
                </Text>
                <View style={{ width: '100%', flexDirection: 'row', marginTop: scaleHeight(18), justifyContent: 'center' }}>
                  <Image source={rewardIconMap[results[currentIndex]?.reward.id]} style={[styles.icon]} />
                  <ImageBackground style={[styles.frameluckycode]} source={FRAME_LUCKYCODE}>
                    <Text style={[styles.textluckycode, { marginTop: scaleHeight(9), }]}>
                      {results[currentIndex]?.luckyCode.prefix}
                    </Text>
                    <Text style={styles.textluckycode}>
                      {results[currentIndex]?.luckyCode.codes}
                    </Text>
                  </ImageBackground>
                </View>
                <View style={{ width: scaleWidth(124), flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: scaleHeight(24.5) }}>
                  <TouchableOpacity
                    style={styles.button}
                    disabled={currentIndex === 0}
                    onPress={handlePreviousReward}
                  >
                    <Text style={styles.buttontext1}>{'<'}</Text>
                  </TouchableOpacity>
                  <Text style={styles.text5}>{`${currentIndex + 1}/${results.length}`}</Text>
                  <TouchableOpacity
                    style={styles.button}
                    disabled={currentIndex === results.length - 1}
                    onPress={handleNextReward}
                  >
                    <Text style={styles.buttontext1}>{'>'}</Text>
                  </TouchableOpacity>
                </View>
                <Text style={styles.text6}>
                  Chúc mừng thánh lắc,{"\n"}
                  rinh lộc mát tay anh em ơi!{"\n"}
                  Tích cực săn thêm lượt lắc thôi nào!</Text>
              </ImageBackground>
              <FlatButton
                title="Chia sẻ"
                buttonWidth={scaleWidth(186)}
                buttonHeight={scaleHeight(44)}
                containerStyle={{ marginTop: scaleHeight(27) }}
              />
              <FlatButton
                title="Nhận quà"
                buttonWidth={scaleWidth(186)}
                buttonHeight={scaleHeight(44)}
                containerStyle={{ marginTop: scaleHeight(12) }}
                onPress={onAcceptReward}
              />
            </>
          ) : (
            <>
              {isLoading && <Loading message="Đang xử lý..." />}
              <ImageBackground source={LABEL_LAC1LAN} style={styles.labellac1lan} resizeMode='stretch'>
                <Text style={[styles.popupText, { marginTop: scaleHeight(146) }]}>
                  {rewardDisplayMap[results[0]?.reward.id] || 'Phần thưởng không xác định'}
                </Text>
                <Text style={styles.popupText}>
                  1 Mã số may mắn
                </Text>
                <View style={{ width: '100%', flexDirection: 'row', marginTop: scaleHeight(18), justifyContent: 'center' }}>
                  <Image source={rewardIconMap[results[0]?.reward.id]} style={styles.icon} />
                  <ImageBackground style={styles.frameluckycode} source={FRAME_LUCKYCODE}>
                    <Text style={[styles.textluckycode, { marginTop: scaleHeight(9), }]}>
                      {results[currentIndex]?.luckyCode.prefix}
                    </Text>
                    <Text style={styles.textluckycode}>
                      {results[currentIndex]?.luckyCode.codes}
                    </Text>
                  </ImageBackground>
                </View>
                <Text style={styles.text3}>
                  WOW, THÁNH LẮC VÀNG ĐÂY RỒI,
                  {"\n\n"}
                  GIÀU TO RỒI ANH EM ƠI!
                </Text>

              </ImageBackground>
              <FlatButton
                title="Chia sẻ"
                buttonWidth={scaleWidth(186)}
                buttonHeight={scaleHeight(44)}
                containerStyle={{ marginTop: scaleHeight(27) }}
              />
              <FlatButton
                title="Nhận quà"
                buttonWidth={scaleWidth(186)}
                buttonHeight={scaleHeight(44)}
                containerStyle={{ marginTop: scaleHeight(8) }}
                onPress={onAcceptReward}
              />
            </>

          )}
        </View>
      </Modal>

    </ImageBackground>
  );
};


// import React, { useState } from 'react';
// import { View, Text, Button, TextInput, StyleSheet, Alert } from 'react-native';
// import firestore from '@react-native-firebase/firestore';

// export const ShakeGoldenFortune: React.FC = () => {
//   const [numberOfCodes, setNumberOfCodes] = useState<string>('10'); // Số lượng mã cần tạo
//   const [documentId, setDocumentId] = useState<string>('luckycode_1'); // ID của document

//   // Hàm tạo mã code ngẫu nhiên 6 số
//   function generateRandomCode(): string {
//     return Math.floor(100000 + Math.random() * 900000).toString(); // Mã từ 100000 đến 999999
//   }

//   // Hàm thêm mã code vào Firestore
//   const addCodesToFirestore = async () => {
//     try {
//       if (!documentId.trim() || !numberOfCodes) {
//         Alert.alert('Lỗi', 'Vui lòng nhập ID document và số lượng mã code!');
//         return;
//       }

//       const codes = [];
//       const numCodes = parseInt(numberOfCodes);

//       for (let i = 0; i < numCodes; i++) {
//         codes.push(generateRandomCode());
//       }

//       const luckyCodeRef = firestore().collection('luckycode').doc(documentId);

//       // Kiểm tra document hiện tại
//       const doc = await luckyCodeRef.get();

//       if (!doc.exists) {
//         await luckyCodeRef.set({
//           available: codes.length,
//           codes: codes,
//           prefix: 'MB01C',
//         });
//       } else {
//         const existingCodes = doc.data()?.codes || [];
//         await luckyCodeRef.update({
//           codes: [...existingCodes, ...codes],
//           available: firestore.FieldValue.increment(codes.length),
//         });
//       }

//       Alert.alert('Thành công', `Đã tạo ${codes.length} mã code!`);
//     } catch (error) {
//       console.error('Lỗi khi thêm mã code vào Firestore:', error);
//       Alert.alert('Lỗi', 'Không thể tạo mã code.');
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Tạo Mã Code Lucky</Text>

//       <TextInput
//         style={styles.input}
//         placeholder="Nhập ID Document"
//         value={documentId}
//         onChangeText={setDocumentId}
//       />

//       <TextInput
//         style={styles.input}
//         placeholder="Nhập số lượng mã code"
//         value={numberOfCodes}
//         onChangeText={setNumberOfCodes}
//         keyboardType="numeric"
//       />

//       <Button title="Tạo Mã Code" onPress={addCodesToFirestore} />

//       <Text style={styles.note}>
//         Nhấn nút để tạo và thêm mã code vào Firestore.
//       </Text>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 16,
//     backgroundColor: '#fff',
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//     color: '#333',
//   },
//   input: {
//     width: '100%',
//     height: 50,
//     borderColor: '#ccc',
//     borderWidth: 1,
//     borderRadius: 8,
//     marginBottom: 20,
//     paddingHorizontal: 10,
//     fontSize: 16,
//   },
//   note: {
//     marginTop: 20,
//     fontSize: 14,
//     color: '#666',
//   },
// });
