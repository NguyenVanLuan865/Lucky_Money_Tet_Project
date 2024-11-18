import { createAsyncThunk } from '@reduxjs/toolkit';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export const signOutAsync = createAsyncThunk(
  'authentication/signOut',
  async (_, { rejectWithValue }) => {
    try {
      await auth().signOut();
      localStorage.removeItem('authToken'); 
      return true;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Sign-out failed');
    }
  }
);