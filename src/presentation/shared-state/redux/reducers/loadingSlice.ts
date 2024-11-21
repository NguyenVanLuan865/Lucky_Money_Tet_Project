import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LoadingState {
  isLoading: boolean;
  message: string | null;
}

const initialState: LoadingState = {
  isLoading: false,
  message: null,
};

const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    showLoading(state, action: PayloadAction<string | null>) {
      state.isLoading = true;
      state.message = action.payload || null;
    },
    hideLoading(state) {
      state.isLoading = false;
      state.message = null;
    },
  },
});

export const { showLoading, hideLoading } = loadingSlice.actions;
export default loadingSlice.reducer;
