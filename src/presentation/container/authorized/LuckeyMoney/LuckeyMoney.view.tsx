import React from 'react';
import { View, Text, ImageBackground, Image } from 'react-native';
import { FlatButton, RoundBackButton } from '../../../component';
import { BACKGROUND_GODENLUCKYMONEY, MINI_BANNER } from '../../../../../assets';
import { styles } from './LuckeyMoney.style';
import { useLuckeyMoneyHandlers } from './LuckeyMoney.hook';
import MaskedView from '@react-native-masked-view/masked-view';
import LinearGradient from 'react-native-linear-gradient';

const LuckeyMoney: React.FC = () => {
  const { handlePressBack, handlePressFindOpponent, name } = useLuckeyMoneyHandlers();

  return (
    <View style={styles.background}>
      <RoundBackButton
        containerStyle={styles.buttonBack}
        onPress={handlePressBack}
      />
      <MaskedView
        style={styles.header}
        maskElement={
          <Text style={styles.textheader}>THÁNH LÌ XÌ</Text>
        }
      >
        <LinearGradient
          colors={['#FCD60E', '#FFF9E1', '#FCD60E']}
          locations={[0.06, 0.23, 0.46, 0.65, 0.83, 0.96]}
          start={{ x: 0.75, y: 1 }}
          end={{ x: 0, y: 0 }}
          style={{ flex: 1, height: '100%' }}
        />
      </MaskedView>
      <ImageBackground source={BACKGROUND_GODENLUCKYMONEY} style={styles.label} resizeMode="cover">
        <Text style={[styles.text, { marginTop: 16 }]}>Đáp nhanh tranh lì xì</Text>
        <View style={styles.mission}>
          <Text style={[styles.text, { fontSize: 16 }]}>Nhiệm vụ</Text>
          <Text style={styles.text2}>Trả lời đúng và nhanh nhất 5 câu hỏi bạn sẽ chiến thắng!</Text>
        </View>
        <Image source={MINI_BANNER} style={styles.minibaner} />
        <FlatButton
          title="Tìm đối thủ"
          containerStyle={styles.button}
          onPress={handlePressFindOpponent}
        />
        <View style={styles.notebaner}>
          <Text style={[styles.text2, { color: '#FFF', textAlign: 'center' }]}>
            Lưu ý: Người chơi chiến thắng sẽ nhận được{' '}
            <Text style={[styles.text, { color: '#FFD700', fontSize: 16 }]}>+1 lì xì</Text>.
          </Text>
        </View>
      </ImageBackground>
    </View>
  );
};

export default LuckeyMoney;
