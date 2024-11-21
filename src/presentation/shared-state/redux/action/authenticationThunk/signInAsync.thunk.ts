// src/shared-state/redux/actions/authenticationThunk.ts
import { createAsyncThunk } from '@reduxjs/toolkit';
import { SignInUseCase } from '../../../../../domain';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FirebaseAuthenticationRepository } from '../../../../../data';
import { Credential } from '../../../../../domain';
import auth from '@react-native-firebase/auth';
import { showLoading, hideLoading } from '../../reducers/loadingSlice';

const TOKEN_KEY = 'authToken';

// Khởi tạo repository và use-case
const authenticationRepository = new FirebaseAuthenticationRepository();
const signInUseCase = new SignInUseCase(authenticationRepository);

// Async Thunk: Đăng nhập từ xa
export const signInAsync = createAsyncThunk(
  'authentication/signIn',
  async (
    { email, password }: { email: string; password: string },
    { dispatch, rejectWithValue }
  ) => {
    try {
      // Hiển thị trạng thái loading
      dispatch(showLoading('Đang đăng nhập...'));

      const userCredential = await auth().signInWithEmailAndPassword(email, password);

      if (!userCredential.user) {
        throw new Error('Không thể đăng nhập. Vui lòng thử lại.');
      }

      const token = userCredential.user.uid;

      // Lưu token vào AsyncStorage
      await AsyncStorage.setItem(TOKEN_KEY, token);

      console.log('Token from Firebase:', token);

      // Tắt trạng thái loading sau khi thành công
      dispatch(hideLoading());

      return token;
    } catch (error: any) {
      console.error('Lỗi đăng nhập từ Firebase:', error.message);

      // Tắt trạng thái loading nếu gặp lỗi
      dispatch(hideLoading());

      return rejectWithValue(error.message || 'Lỗi đăng nhập không xác định');
    }
  }
);


export const localSignInAsync = createAsyncThunk(
  'authentication/localSignIn',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      // Hiển thị trạng thái loading
      dispatch(showLoading('Đang kiểm tra đăng nhập...'));

      const result = await signInUseCase.execute().toPromise(); // Gọi localSignIn
      if (!result || !result.token) {
        throw new Error('Không tìm thấy token');
      }

      // Tắt trạng thái loading sau khi thành công
      dispatch(hideLoading());

      return result;
    } catch (error: any) {
      console.log('Lỗi localSignInAsync:', error.message);

      // Tắt trạng thái loading nếu gặp lỗi
      dispatch(hideLoading());

      if (error.message === 'Không tìm thấy token') {
        return rejectWithValue('Không tìm thấy token. Vui lòng đăng nhập lại.');
      }
      return rejectWithValue(error.message || 'Local sign-in failed');
    }
  }
);


  
