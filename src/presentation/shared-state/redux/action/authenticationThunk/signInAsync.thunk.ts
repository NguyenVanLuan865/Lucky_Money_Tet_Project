// src/shared-state/redux/actions/authenticationThunk.ts
import { createAsyncThunk } from '@reduxjs/toolkit';
import { SignInUseCase } from '../../../../../domain';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FirebaseAuthenticationRepository } from '../../../../../data';
import { Credential } from '../../../../../domain';
import auth from '@react-native-firebase/auth';
const TOKEN_KEY = 'authToken';

// Khởi tạo repository và use-case
const authenticationRepository = new FirebaseAuthenticationRepository();
const signInUseCase = new SignInUseCase(authenticationRepository);

// Async Thunk: Đăng nhập từ xa
export const signInAsync = createAsyncThunk(
  'authentication/signIn',
  async ({ email, password }: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const userCredential = await auth().signInWithEmailAndPassword(email, password);

      if (!userCredential.user) {
        throw new Error('Không thể đăng nhập. Vui lòng thử lại.');
      }

      const token = userCredential.user.uid;

      // Lưu token vào AsyncStorage
      await AsyncStorage.setItem(TOKEN_KEY, token);

      console.log('Token from Firebase:', token);
      console.log(token)

      return token;
    } catch (error: any) {
      console.error('Lỗi đăng nhập từ Firebase:', error.message);
      return rejectWithValue(error.message || 'Lỗi đăng nhập không xác định');
    }
  }
);

export const localSignInAsync = createAsyncThunk(
  'authentication/localSignIn',
  async (_, { rejectWithValue }) => {
    try {
      const result = await signInUseCase.execute().toPromise(); // Gọi localSignIn
      if (!result || !result.token) {
        throw new Error('Không tìm thấy token');
      }
      return result;
    } catch (error: any) {
      console.log('Lỗi localSignInAsync:', error.message);
      if (error.message === 'Không tìm thấy token') {
        return rejectWithValue('Không tìm thấy token. Vui lòng đăng nhập lại.');
      }
      return rejectWithValue(error.message || 'Local sign-in failed');
    }
  }
);

  
