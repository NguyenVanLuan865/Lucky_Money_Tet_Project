import { createAsyncThunk } from '@reduxjs/toolkit';
import firestore from '@react-native-firebase/firestore';

export const fetchRewardsAsync = createAsyncThunk(
    'rewards/fetchRewards',
    async (_, { rejectWithValue }) => {
      try {
        const snapshot = await firestore().collection('reward').get();
        return snapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            soLuong: data.soLuong || 0, 
            ...data,
          };
        });
      } catch (error: any) {
        console.error('Error fetching rewards:', error.message);
        return rejectWithValue(error.message || 'Failed to fetch rewards');
      }
    }
  );
  