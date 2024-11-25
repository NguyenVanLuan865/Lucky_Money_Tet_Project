import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

export const useOnboardHandlers = () => {
  const navigation = useNavigation();
  const [isPopupVisible, setIsPopupVisible] = useState<boolean>(true); 

  const handlePress = () => {
    if (isPopupVisible) return; 
    navigation.navigate('Main');
  };

  const handlePopupClose = () => {
    setIsPopupVisible(false); 
  };

  return {
    handlePress,
    isPopupVisible,
    handlePopupClose,
  };
};
