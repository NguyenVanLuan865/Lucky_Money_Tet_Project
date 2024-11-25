import { useNavigation } from '@react-navigation/native';
import { useState , useEffect} from 'react';
import firestore from '@react-native-firebase/firestore';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../shared-state';

export const useGoldenLuckyMoneyHandlers = () => {
  const navigation = useNavigation();
  const [lixi, setLiXi] =  useState<number>(0);
  const userId = useSelector((state: RootState) => state.authentication.token);

  useEffect(() => {
    const userRef = firestore().collection('users').doc(userId!);
    const unsubscribe = userRef.onSnapshot((doc) => {
      setLiXi( doc.data()?.lixi || 0)
    });

    return () => unsubscribe();
}, []);
  const handlePressBack = () => {
    navigation.goBack();
  };

  const handlePressLuckeyMoney = () => {
    navigation.navigate('LuckeyMoney');
  };

  const handlePressSupermarket = () => {
    navigation.navigate('Supermarket');
  };

  return {
    handlePressBack,
    handlePressLuckeyMoney,
    handlePressSupermarket,
    lixi,
  };
};
