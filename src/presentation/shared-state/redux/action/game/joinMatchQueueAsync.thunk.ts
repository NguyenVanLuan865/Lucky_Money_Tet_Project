import { createAsyncThunk } from '@reduxjs/toolkit';
import firestore from '@react-native-firebase/firestore';


export const joinMatchQueueAsync = createAsyncThunk(
    'matchQueue/join', 
    async (
      { userId, gameType }: { userId: string; gameType: string },
      { rejectWithValue }
    ) => {
      try {
        const userDoc = await firestore().collection('users').doc(userId).get();
  
        if (!userDoc.exists) {
          throw new Error('Không tìm thấy thông tin người dùng.');
        }
  
        const userData = userDoc.data();
        const name = userData?.name || 'Unknown';
  
        const userRef = firestore().collection('matchQueue').doc(userId);
        await userRef.set({
          userId,
          name,
          status: 'waiting',
          opponentId: null,
          gameType,
          createdAt: firestore.FieldValue.serverTimestamp(),
        });

        return { userId, gameType, name };
      } catch (error: any) {
        return rejectWithValue(error.message || 'Không thể tham gia hàng đợi.');
      }
    }
  );
  