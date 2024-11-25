import React from 'react';
import { ImageBackground, Text } from 'react-native';
import { BACKGROUND_GOLDENLUCKY } from '../../../../../assets';
import { styles } from './goldenluckymoney.style';
import { FlatButton } from '../../../component';
import { RoundBackButton } from '../../../component/button/RoundBackButton';
import { useGoldenLuckyMoneyHandlers } from './goldenluckymoney.hook';

const GoldenLuckyMoney: React.FC = () => {
  const {
    handlePressBack,
    handlePressSupermarket,
    handlePressLuckeyMoney,
    lixi,
  } = useGoldenLuckyMoneyHandlers();

  return (
    <ImageBackground source={BACKGROUND_GOLDENLUCKY} style={styles.background} resizeMode="stretch">
      <RoundBackButton containerStyle={styles.buttonBack} onPress={handlePressBack} />
      <Text style={styles.text}>
        Bạn đang có <Text style={styles.highlightedNumber}>{lixi}</Text> lì xì
      </Text>
      <FlatButton
        title="Thánh lì xì"
        containerStyle={styles.buttonLuckeyMoney}
        onPress={handlePressLuckeyMoney}
      />
      <FlatButton
        title="Siêu thị phụ kiện"
        containerStyle={styles.buttonSupermarket}
        onPress={handlePressSupermarket}
      />
    </ImageBackground>
  );
};

export default GoldenLuckyMoney;
