import React, { useState , useEffect} from 'react';
import {
  View,
  Button,
  Text,
  ActivityIndicator,
  Modal,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Image,
  Alert
} from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../../../shared-state';
import useGoldenFortune from './shakegoldenfortune.hook';
import firestore from '@react-native-firebase/firestore';
import { BACKGROUND_SHAKEGOLDENFORTUNE, LABEL_LAC1LAN, ICON_CHANGE_100K, ICON_GOLDEN, ICON_PHUKIEN, FRAME_LUCKYCODE, LABEL_LAC10LAN } from '../../../../../assets';
import { FlatButton, RoundBackButton } from '../../../component';
import { scaleHeight, scaleWidth, scale, HEIGHT, LightTheme, WITDH } from '../../../resource/values';
import { styles } from './shakegoldenfortune.style';
import { useNavigation } from '@react-navigation/native';


const _ShakeGoldenFortune: React.FC = () => {
  const userId = useSelector((state: RootState) => state.authentication.token);
  const [results, setResults] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isAccepting, setIsAccepting] = useState(false);
  const { isProcessing, handleShakeOnce } = useGoldenFortune();
  const [showPopup, setShowPopup] = useState(false);
  const [isTenTimes, setIsTenTimes] = useState(false);
  const [lacloc, setLacloc] = useState<number>(0);
  const navigation = useNavigation();


  const listenToLacloc = () => {
    const userRef = firestore().collection('users').doc(userId!); 

    return userRef.onSnapshot((doc) => {
      if (doc.exists) {
        setLacloc(doc.data()?.lacloc || 0);
      } else {
        console.error('Document không tồn tại');
      }
    });
  };
  useEffect(() => {
    const unsubscribe = listenToLacloc();
    return () => unsubscribe();
  }, []);
  
  const rewardDisplayMap: Record<string, string> = {
    phieu_100k: '1 Phiếu mua hàng 100k',
    phieu_200k: '1 Phiếu mua hàng 200k',
    phieu_500k: '1 Phiếu mua hàng 500k',
    phieu_motchivang: '1 Chỉ vàng PNJ 999',
    phieu_nuachivang: 'Nửa chỉ vàng PNJ 999',
    phieu_phukien: '1 Phiếu mua phụ kiện',
  };

  const rewardIconMap: Record<string, any> = {
    phieu_100k: ICON_CHANGE_100K,
    phieu_200k: ICON_CHANGE_100K,
    phieu_500k: ICON_CHANGE_100K,
    phieu_motchivang: ICON_GOLDEN,
    phieu_nuachivang: ICON_GOLDEN,
    phieu_phukien: ICON_PHUKIEN,
  };


  const onShakeOnce = async () => {
    if (lacloc <= 0) {
      Alert.alert('Thông báo', 'Bạn không đủ số lượt lắc lộc. Vui lòng chờ hoặc nạp thêm lượt lắc!');
      return;
    }
    try {
      setIsLoading(true);
      const { reward, luckyCode } = await handleShakeOnce(userId!);

      if (!reward || !luckyCode) {
        throw new Error('Không nhận được phần thưởng hoặc mã code');
      }

      setResults([{ reward, luckyCode }]);
      const userRef = firestore().collection('users').doc(userId!);

      await userRef.update({
        lacloc: firestore.FieldValue.increment(-1), // Trừ đi 1 lượt
      });
  
  
      setShowPopup(true);
    } catch (error) {
      console.error('Error during shake:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const onShakeTenTimes = async () => {
    if (lacloc < 10) {
      Alert.alert('Thông báo', 'Bạn không đủ số lượt lắc lộc. Vui lòng chờ hoặc nạp thêm lượt lắc!');
      return;
    }
    try {
      setIsLoading(true);
      const newResults = [];
      for (let i = 0; i < 10; i++) {
        const { reward, luckyCode } = await handleShakeOnce(userId!);
        if (reward && luckyCode) {
          newResults.push({ reward, luckyCode });
        }
      }
      const userRef = firestore().collection('users').doc(userId!);

      await userRef.update({
        lacloc: firestore.FieldValue.increment(-10), // Trừ đi 1 lượt
      });
      setResults(newResults);
      setCurrentIndex(0);
      setIsTenTimes(true);
      setShowPopup(true);
    } catch (error) {
      console.error('Error during shake:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const onAcceptReward = async () => {
    try {
      setIsAccepting(true);
      for (const { reward, luckyCode } of results) {
        if (reward) {
          const rewardNameMap: Record<string, string> = {
            phieu_100k: 'phieu100k',
            phieu_200k: 'phieu200k',
            phieu_500k: 'phieu500k',
            phieu_motchivang: 'motchivang',
            phieu_nuachivang: 'nuachivang',
            phieu_phukien: 'phukien',
          };

          const rewardKey = rewardNameMap[reward.id];
          if (rewardKey) {
            const rewardRef = firestore()
              .collection('users')
              .doc(userId)
              .collection('laclocvang')
              .doc(rewardKey);

            const rewardDoc = await rewardRef.get();
            if (rewardDoc.exists) {
              await rewardRef.update({
                soLuong: firestore.FieldValue.increment(1),
              });
            } else {
              await rewardRef.set({
                soLuong: 1,
                trangThai: false,
              });
            }
          }
        }

        if (luckyCode) {
          await firestore()
            .collection('users')
            .doc(userId)
            .collection('masomayman')
            .add({
              codes: luckyCode.codes,
              prefix: luckyCode.prefix,
            });
        }
      }
      setShowPopup(false);
      setResults([]);
      setIsTenTimes(false);
    } catch (error) {
      console.error('Error accepting rewards:', error);
    } finally {
      setIsAccepting(false);
    }
  };

  return (
    <ImageBackground style={styles.container} source={BACKGROUND_SHAKEGOLDENFORTUNE} resizeMode='stretch'>
      {isProcessing || isLoading ? (
        <ActivityIndicator size="large" color="#FCD60E" />
      ) : (
        <>
          <RoundBackButton 
          containerStyle={styles.buttonBack} 
          onPress={() => navigation.goBack()}
          />
          <Text style={[styles.text2, { textAlign: 'center' }]}>Bạn có{` `}
            <Text style={[{ color: LightTheme.colorScheme.primaryText, fontSize: scale(24) }]}>{lacloc}</Text>
            {' '} lượt lắc{` `}
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

      <Modal visible={showPopup} transparent animationType="slide">
        <View style={styles.popup}>
          {isTenTimes ? (
            <>
              <ImageBackground source={LABEL_LAC10LAN} style={styles.labellac10lan} resizeMode='stretch'>
                <Text style={styles.text4}>LỘC TỚI NGẬP TRÀN</Text>
                <Text style={[styles.popupText2, { marginTop: scaleHeight(10) }]}>
                  {rewardDisplayMap[results[currentIndex]?.reward.id] || 'Phần thưởng không xác định'}
                </Text>
                <Text style={styles.popupText2}>
                  1 Mã số may mắn
                </Text>
                <View style={{ width: '100%', flexDirection: 'row', marginTop: scaleHeight(18) }}>
                  <Image source={rewardIconMap[results[0]?.reward.id]} style={[styles.icon,]} />
                  <ImageBackground style={[styles.frameluckycode,]} source={FRAME_LUCKYCODE}>
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
                    disabled={currentIndex === 0}
                    style={styles.button}
                    onPress={() => setCurrentIndex((prev) => prev - 1)}>
                    <Text style={styles.buttontext1}>{'<'}</Text>
                  </TouchableOpacity>
                  <Text style={styles.text5}>
                    {currentIndex + 1}/{results.length}
                  </Text>
                  <TouchableOpacity
                    disabled={currentIndex === results.length - 1}
                    style={styles.button}
                    onPress={() => setCurrentIndex((prev) => prev + 1)}>
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

              <ImageBackground source={LABEL_LAC1LAN} style={styles.labellac1lan} resizeMode='stretch'>
                <Text style={[styles.popupText, { marginTop: scaleHeight(146) }]}>
                  {rewardDisplayMap[results[0]?.reward.id] || 'Phần thưởng không xác định'}
                </Text>
                <Text style={styles.popupText}>
                  1 Mã số may mắn
                </Text>
                <View style={{ width: '100%', flexDirection: 'row', marginTop: scaleHeight(18) }}>
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
                containerStyle={{ marginTop: scaleHeight(2) }}
                onPress={onAcceptReward}
              />
            </>
          )}
        </View>
      </Modal>
    </ImageBackground>
  );
};

export const ShakeGoldenFortune = React.memo(_ShakeGoldenFortune);


