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
<<<<<<< HEAD
    navigation.navigate('Supermarket');
  };
  const handlePress2 = () => {
    navigation.navigate('LuckeyMoney');
  };
  // const handlePress2 = () => {
  //   navigation.navigate('LuckeyMoney');
  // };
=======
      navigation.navigate('Supermarket'); 
  };
  const handlePress2 = () => {
    navigation.navigate('TetCompetition'); 
};
>>>>>>> b19083247395aec8135ea41e63760732b49f483b
  return (
    <ImageBackground source={BACKGROUND_GOLDENLUCKY} style={styles.background} resizeMode='stretch'>
      <RoundBackButton
        containerStyle={styles.buttonBack}
<<<<<<< HEAD
        onPress={() => navigation.goBack()}
=======
>>>>>>> b19083247395aec8135ea41e63760732b49f483b
      />
      <Text style={styles.text}>
        Bạn đang có{' '}
        <Text style={styles.highlightedNumber}>11</Text>
        {' '}lì xì
      </Text>
      <FlatButton
        title="Thánh lì xì"
        containerStyle={styles.buttonLuckeyMoney}
<<<<<<< HEAD
        onPress={handlePress2}
=======
      onPress={handlePress2}
>>>>>>> b19083247395aec8135ea41e63760732b49f483b
      />
      <FlatButton
        title="Siêu thị phụ kiện"
        containerStyle={styles.buttonSupermarket}
<<<<<<< HEAD
        onPress={handlePress1}
=======
      onPress={handlePress1}
>>>>>>> b19083247395aec8135ea41e63760732b49f483b
      />
    </ImageBackground>
  );
};

export const GoldenLuckyMoney = React.memo(_GoldenLuckyMoney)

