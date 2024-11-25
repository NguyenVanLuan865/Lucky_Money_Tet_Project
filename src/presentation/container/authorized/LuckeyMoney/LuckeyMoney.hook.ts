import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { Alert } from 'react-native';
import { RootState, AppDispatch } from '../../../shared-state';
import { joinMatchQueueWithUserData } from '../../../../data/data-source/user/matchService';

export const useLuckeyMoneyHandlers = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch<AppDispatch>();
  const userId = useSelector((state: RootState) => state.authentication.token);
  const [name, setName] = useState<string>('');

  const handlePressBack = () => {
    navigation.goBack();
  };

  const handlePressFindOpponent = async () => {
    try {
      const playerName = await joinMatchQueueWithUserData(userId!, 'game1');
      setName(playerName);
      navigation.navigate('WaitingLuckeyMoney', { name: playerName, game: 'game1' });
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Không thể tham gia hàng đợi.';
      Alert.alert('Lỗi', errorMessage);
    }
  };

  return {
    handlePressBack,
    handlePressFindOpponent,
    name,
  };
};
