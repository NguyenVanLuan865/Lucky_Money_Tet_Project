import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import { useSelector } from 'react-redux';
import { RootState } from '../../../shared-state';
import  Question  from './FindOpponents.view';

export const useFindOpponentsHandlers = () => {
  const navigation = useNavigation();
  const userId = useSelector((state: RootState) => state.authentication.token);
  const [countdown, setCountdown] = useState(5);
  const [username, setUsername] = useState<string>('Unknown');
  const [opponentName, setOpponentName] = useState<string>('Unknown');

  useEffect(() => {
    const fetchNames = async () => {
    };

    fetchNames();
  }, [userId]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    if (countdown === 0) {
      clearInterval(timer);
      handleStartGame();
    }

    return () => clearInterval(timer);
  }, [countdown]);

  const handleStartGame = async () => {
    try {
    } catch (err) {
      console.error('Error starting game:', err);
    }
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes < 10 ? '0' : ''}${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  return {
    countdown,
    username,
    opponentName,
    formatTime,
    handleStartGame,
    handleGoBack,
  };
};
