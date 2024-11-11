import React from 'react';
import { View, Text, ImageBackground, Image } from 'react-native';
import { FlatButton , } from '../../../component';
import { BACKGROUND_GODENLUCKYMONEY, MINI_BANNER } from '../../../../../assets';
import { scaleHeight, scaleWidth, scale, HEIGHT, LightTheme, WITDH } from '../../../resource/values';
import { RoundBackButton } from '../../../component/button/RoundBackButton';
import { styles } from './LuckeyMoney.style';
import LinearGradient from 'react-native-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';
import { useNavigation } from '@react-navigation/native';
const _LuckeyMoney: React.FC = () => {

   const navigation = useNavigation();

    const handlePress = () => {
        navigation.navigate('FindOpponents'); 
    };

  return (
    <View style={styles.background}>
      <RoundBackButton
        containerStyle={styles.buttonBack}
      />
      <MaskedView
        style={styles.header}
        maskElement={
          <Text style={styles.textheader}>THÁNH LÌ XÌ</Text>
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
        onPress={handlePress}
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

