import { useState, useEffect } from 'react';
import { listenToUserData } from '../../../../data/data-source/user';



export const useSimpleQuantity = (initialMax: number) => {
    const [quantity, setQuantity] = useState<number>(1); // Giá trị khởi tạo
    const [max, setMax] = useState<number>(initialMax/44); // Giá trị tối đa
  
    const increase = () => {
      if (quantity < max) {
        setQuantity((prev) => prev + 1); 
      }
    };
  
    const decrease = () => {
      if (quantity > 1) {
        setQuantity((prev) => prev - 1); 
      }
    };
  
    const reset = () => {
      setQuantity(1); 
    };
  
    return { quantity, increase, decrease, reset };
  };
export const useUserData = (userId: string) => {
    const [userData, setUserData] = useState<any>(null);

    useEffect(() => {
        if (!userId) return;

        const unsubscribeUser = listenToUserData(userId, setUserData);
        return () => {
            unsubscribeUser();
        };
    }, [userId]);

    return { userData };
};

