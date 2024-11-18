<<<<<<< HEAD
import React, { useEffect, useState } from 'react';
import { View, Text, ImageBackground, Image, Alert } from 'react-native';
import { FlatButton, } from '../../../component';
// import { BACKGROUND_GODENLUCKYMONEY, MINI_BANNER } from '../../../../../assets';
=======
import React from 'react';
import { View, Text, ImageBackground, Image } from 'react-native';
import { FlatButton , } from '../../../component';
>>>>>>> b19083247395aec8135ea41e63760732b49f483b
import { BACKGROUND_GODENLUCKYMONEY, MINI_BANNER } from '../../../../../assets';
import { scaleHeight, scaleWidth, scale, HEIGHT, LightTheme, WITDH } from '../../../resource/values';
import { RoundBackButton } from '../../../component/button/RoundBackButton';
import { styles } from './LuckeyMoney.style';
import LinearGradient from 'react-native-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';
import { useNavigation } from '@react-navigation/native';
<<<<<<< HEAD
import { RootState, joinMatchQueueAsync, AppDispatch } from '../../../shared-state';
import { joinMatchQueueWithUserData } from '../../../../data/data-source/user/matchService';
import { useSelector, useDispatch } from 'react-redux';

const _LuckeyMoney: React.FC = () => {

  const navigation = useNavigation();
  const dispatch = useDispatch<AppDispatch>();
  const userId = useSelector((state: RootState) => state.authentication.token);
  const [name, setName] = useState<string>(''); 

  const handlePress = async () => {
    try {
      const playerName = await joinMatchQueueWithUserData(userId!, 'game1'); 
      setName(playerName); 

      navigation.navigate('WaitingLuckeyMoney', { name: playerName , game: 'game1'});
    } catch (err) {
      if (err instanceof Error) {
        Alert.alert('Lỗi', err.message);
      } else {
        Alert.alert('Lỗi', 'Không thể tham gia hàng đợi.');
      }
    }
  };
=======
const _LuckeyMoney: React.FC = () => {

   const navigation = useNavigation();

    const handlePress = () => {
        navigation.navigate('FindOpponents'); 
    };
>>>>>>> b19083247395aec8135ea41e63760732b49f483b

  return (
    <View style={styles.background}>
      <RoundBackButton
        containerStyle={styles.buttonBack}
<<<<<<< HEAD
        onPress={() => navigation.goBack()}
=======
>>>>>>> b19083247395aec8135ea41e63760732b49f483b
      />
      <MaskedView
        style={styles.header}
        maskElement={
          <Text style={styles.textheader}>THÁNH LÌ XÌ</Text>
        }
      >
        <LinearGradient
          colors={['#FCD60E', '#FFF9E1', '#FCD60E']}
<<<<<<< HEAD
          locations={[0.06, 0.23, 0.46, 0.65, 0.83, 0.96]}
          start={{ x: 0.75, y: 1 }}
          end={{ x: 0, y: 0 }}
=======
          locations={[0.1, 0.3, 0.9]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
>>>>>>> b19083247395aec8135ea41e63760732b49f483b
          style={{ flex: 1, height: '100%' }}
        />
      </MaskedView>
      <ImageBackground source={BACKGROUND_GODENLUCKYMONEY} style={styles.label} resizeMode='cover'>
        <Text style={[styles.text, { marginTop: scaleHeight(16), }]}>Đáp nhanh tranh lì xì</Text>
        <View style={styles.mission}>
          <Text style={[styles.text, { fontSize: scale(16), }]}>Nhiệm vụ</Text>
          <Text style={styles.text2}>Trả lời đúng và nhanh nhất 5 câu hỏi bạn sẽ chiến thắng!
          </Text>

        </View>
        <Image source={MINI_BANNER} style={styles.minibaner} />
        <FlatButton
          title="Tìm đối thủ"
          containerStyle={styles.button}
<<<<<<< HEAD
          onPress={handlePress}
=======
        onPress={handlePress}
>>>>>>> b19083247395aec8135ea41e63760732b49f483b
        />
        <View style={styles.notebaner}>
          <Text style={[styles.text2, { color: '#FFF', textAlign: 'center' }]}>Lưu ý: Người chơi chiến thắng sẽ nhận được{` `}
            <Text style={[styles.text, { color: LightTheme.colorScheme.borderLabel, fontSize: scale(16) }]}>+1 lì xì</Text>
            {' '}. Mỗi người chơi chỉ nhận được{` `}
            <Text style={[styles.text2, { color: LightTheme.colorScheme.borderLabel }]}>1 lượt chơi 1 ngày</Text>
          </Text>
        </View>
      </ImageBackground>
    </View>
  );
};

export const LuckeyMoney = React.memo(_LuckeyMoney)

