import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LoadingState {
  isLoading: boolean;
  message: string | null;
  isSuccess: boolean;
}

const initialState: LoadingState = {
  isLoading: false,
  message: null,
  isSuccess: false,
};

const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    showLoading(state, action: PayloadAction<string | null>) {
      state.isLoading = true;
      state.message = action.payload || null;
      state.isSuccess = false;
    },
    hideLoading(state, action: PayloadAction<string | null>) {
      state.isLoading = false;
      state.message = null;
      state.isSuccess = !!action.payload; 
    },
    resetSuccess(state) {
      state.isSuccess = false; 
    },
  },
});

export const { showLoading, hideLoading, resetSuccess } = loadingSlice.actions;
export default loadingSlice.reducer;
