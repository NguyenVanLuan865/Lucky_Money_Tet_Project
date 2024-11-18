import { createAsyncThunk } from '@reduxjs/toolkit';
import firestore from '@react-native-firebase/firestore';

export const findOpponentAsync = createAsyncThunk(
  'matchQueue/findOpponent',
  async (userId: string, { rejectWithValue }) => {
    try {
      const userRef = firestore().collection('matchQueue').doc(userId);

      await userRef.set({
        userId,
        status: 'waiting',
        opponentId: null,
        gameType: 'game1',
        createdAt: firestore.FieldValue.serverTimestamp(),
      });

      const unsubscribe = userRef.onSnapshot((snapshot) => {
        if (snapshot.exists) {
          const data = snapshot.data();
          if (data?.opponentId) {
            unsubscribe(); 
          }
        }
      });

      return 'Đã vào hàng chờ tìm trận';
    } catch (error: any) {
      return rejectWithValue(error.message || 'Không thể tìm trận');
    }
  }
);
