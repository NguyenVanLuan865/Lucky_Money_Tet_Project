import React, { useEffect, useState } from 'react';
import { View, Text, ImageBackground, Image, Alert } from 'react-native';
import { FlatButton, AddButton, SubtractButton, RoundBackButton } from '../../../component';
import { BACKGROUND_MARKET, LABEL_MARKET2, ICON_CHANGE_100K, ICON_CHANGE_50K, LABEL_MARKET3 } from '../../../../../assets';
import { scaleHeight, scaleWidth, scale, HEIGHT, LightTheme, WITDH } from '../../../resource/values';
import { LABEL_MARKET } from '../../../../../assets';
import { styles } from './Supermarket.style';
import LinearGradient from 'react-native-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../../shared-state';
import { listenToRewards } from '../../../../data/data-source/user';
import { useUserData } from './Supermarket.hook';
import { redeemRewardAsync } from '../../../shared-state';
import { useNavigation } from '@react-navigation/native';

const _Supermarket: React.FC = () => {
  const [rewards, setRewards] = useState<any[]>([]);
  const token = useSelector((state: RootState) => state.authentication.token);
  const { userData } = useUserData(token!);
  const [initialMaxQuantity, setInitialMaxQuantity] = useState<number>(0);
  const [transferphieu100k, setPhieu100k] = useState<number>(0);;
  const [transferphieu50k, setPhieu50k] = useState<number>(0);;
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    if (userData && userData.lixi !== undefined) {
      setInitialMaxQuantity(userData.lixi);
    }
  }, [userData]);
  console.log(userData)
  useEffect(() => {
    const unsubscribe = listenToRewards(setRewards);
    return () => unsubscribe();
  }, []);

  const phieu100k = rewards.find((reward) => reward.id === "phieu_100k");
  const soluongPhieu100k = phieu100k ? phieu100k.soluong : 0;
  const phieu50k = rewards.find((reward) => reward.id === "phieu_50k");
  const soluongPhieu50k = phieu100k ? phieu50k.soluong : 0;

  console.log(rewards)
  const Add100K = () => {
    if (transferphieu100k <= soluongPhieu100k && transferphieu100k < (initialMaxQuantity - 44)) {
      setPhieu100k(transferphieu100k + 1);
      setInitialMaxQuantity(initialMaxQuantity - 44)

    }
  }
  const Sub100K = () => {
    if (transferphieu100k > 0) {
      setPhieu100k(transferphieu100k - 1);
      setInitialMaxQuantity(initialMaxQuantity + 44)
    }
  }

  const Add50K = () => {
    if (transferphieu50k <= soluongPhieu50k && transferphieu50k < (initialMaxQuantity - 22)) {
      setPhieu50k(transferphieu50k + 1);
      setInitialMaxQuantity(initialMaxQuantity - 22)

    }
  }
  const Sub50K = () => {
    if (transferphieu50k > 0) {
      setPhieu50k(transferphieu50k - 1);
      setInitialMaxQuantity(initialMaxQuantity + 22)

    }
  }
  const handleRedeem = (
    redemptionData: {
      phieu_100k: { quantity: number; lixiCost: number };
      phieu_50k: { quantity: number; lixiCost: number };
    }
  ) => {
    const { phieu_100k, phieu_50k } = redemptionData;

    if (phieu_100k.quantity <= 0 && phieu_50k.quantity <= 0) {
      console.log('Không có phiếu nào được đổi.');
      return;
    }

    const promises = [];

    if (phieu_100k.quantity > 0) {
      promises.push(
        dispatch(
          redeemRewardAsync({
            userId: token!,
            rewardType: 'phieu_100k',
            quantity: phieu_100k.quantity,
            lixiCost: phieu_100k.lixiCost,
          })
        ).unwrap()
      );
    }

    if (phieu_50k.quantity > 0) {
      promises.push(
        dispatch(
          redeemRewardAsync({
            userId: token!,
            rewardType: 'phieu_50k',
            quantity: phieu_50k.quantity,
            lixiCost: phieu_50k.lixiCost,
          })
        ).unwrap()
      );
    }

    Promise.all(promises)
      .then(() => {
        console.log('Đổi thưởng thành công!');
      })
      .catch((err) => {
        console.error('Lỗi:', err);
      });
  };

  const navigation = useNavigation()
  return (
    <ImageBackground source={BACKGROUND_MARKET} style={styles.background} resizeMode='stretch'>
      <RoundBackButton containerStyle={styles.buttonBack} onPress={() => navigation.goBack()} />
      <Text style={styles.headertext}>SIÊU THỊ PHỤ KIỆN</Text>

      <ImageBackground source={LABEL_MARKET} style={[styles.label, { top: scaleHeight(122) }]} resizeMode='stretch'>
        <View style={styles.iconContainer}>

          <View style={styles.iconTextContainer}>
            <Image source={ICON_CHANGE_100K} style={styles.icon} />
            <Text style={styles.text}>Còn lại: {soluongPhieu100k}</Text>
          </View>


          <View style={styles.productInfoContainer}>
            <MaskedView
              style={styles.header}
              maskElement={
                <Text style={styles.textheader}>Phiếu mua hàng 100K</Text>
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
            <Text style={styles.notetextheader}>Yêu cầu: 44 lì xì</Text>
            <View style={styles.quantityContainer}>
              <SubtractButton
                containerStyle={styles.quantityControlAdd}
                onPress={Sub100K}
              />
              <Text style={[{ color: '#FFE933', fontSize: scale(16), fontFamily: 'SVN-Cookies', }]}>{transferphieu100k}</Text>
              <AddButton
                containerStyle={styles.quantityControlAdd}
                onPress={Add100K}
              />
            </View>
          </View>
        </View>
      </ImageBackground>

      <ImageBackground source={LABEL_MARKET} style={[styles.label, { top: scaleHeight(378) }]} resizeMode='stretch' >
        <View style={styles.iconContainer}>

          <View style={styles.iconTextContainer}>
            <Image source={ICON_CHANGE_50K} style={styles.icon} />
            <Text style={styles.text}>(Còn lại: {soluongPhieu50k})</Text>
          </View>


          <View style={styles.productInfoContainer}>
            <MaskedView
              style={styles.header}
              maskElement={
                <Text style={styles.textheader}>Phiếu mua hàng 50K</Text>
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
            <Text style={styles.notetextheader}>Yêu cầu: 22 lì xì</Text>
            <View style={styles.quantityContainer}>
              <SubtractButton
                containerStyle={styles.quantityControlAdd}
                onPress={Sub50K}
              />
              <Text style={[{ color: '#FFE933', fontSize: scale(16), fontFamily: 'SVN-Cookies', }]}>{transferphieu50k}</Text>
              <AddButton
                containerStyle={styles.quantityControlAdd}
                onPress={Add50K}
              />
            </View>
          </View>
        </View>
      </ImageBackground>

      <ImageBackground source={LABEL_MARKET2} style={styles.label2} resizeMode='stretch' >
        <Text style={styles.text2}>Bạn đang có{` `}
          <Text style={styles.highlightedNumber}>{initialMaxQuantity}</Text>
          {' '}lì xì
        </Text>
        <FlatButton
          title="Đổi ngay"
          buttonWidth={scaleWidth(132)}
          buttonHeight={scaleHeight(44)}
          containerStyle={styles.button}
          onPress={() =>
            handleRedeem({
              phieu_100k: { quantity: transferphieu100k, lixiCost: 44 },
              phieu_50k: { quantity: transferphieu50k, lixiCost: 22 },
            })
          }
        />
        {/* <Image source={LABEL_MARKET3} style={styles.lable3} /> */}
      </ImageBackground>
    </ImageBackground>
  );
};

export const Supermarket = React.memo(_Supermarket)

