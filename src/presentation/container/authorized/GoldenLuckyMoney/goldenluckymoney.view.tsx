import React from 'react';
import { View, Text, ImageBackground, ScrollView } from 'react-native';
import { BACKGROUND_GOLDENLUCKY } from '../../../../../assets';
import { styles } from './goldenluckymoney.style';
import { FlatButton } from '../../../component';
import { RoundBackButton } from '../../../component/button/RoundBackButton';
import { useNavigation } from '@react-navigation/native';

const _GoldenLuckyMoney: React.FC = () => {
  const navigation = useNavigation();

  const handlePress1 = () => {
    navigation.navigate('Supermarket');
  };
  const handlePress2 = () => {
    navigation.navigate('LuckeyMoney');
  };
  // const handlePress2 = () => {
  //   navigation.navigate('LuckeyMoney');
  // };
  return (
    <ImageBackground source={BACKGROUND_GOLDENLUCKY} style={styles.background} resizeMode='stretch'>
      <RoundBackButton
        containerStyle={styles.buttonBack}
        onPress={() => navigation.goBack()}
      />
      <Text style={styles.text}>
        Bạn đang có{' '}
        <Text style={styles.highlightedNumber}>11</Text>
        {' '}lì xì
      </Text>
      <FlatButton
        title="Thánh lì xì"
        containerStyle={styles.buttonLuckeyMoney}
        onPress={handlePress2}
      />
      <FlatButton
        title="Siêu thị phụ kiện"
        containerStyle={styles.buttonSupermarket}

        onPress={handlePress1}

      />
    </ImageBackground>
  );
};

export const GoldenLuckyMoney = React.memo(_GoldenLuckyMoney)

