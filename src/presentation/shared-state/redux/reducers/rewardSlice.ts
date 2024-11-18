import { createSlice } from '@reduxjs/toolkit';
import { redeemRewardAsync } from '../action';

interface RewardState {
  isLoading: boolean;
  error: string | null;
}

const initialState: RewardState = {
  isLoading: false,
  error: null,
};

const rewardSlice = createSlice({
  name: 'reward',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(redeemRewardAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(redeemRewardAsync.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(redeemRewardAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export default rewardSlice.reducer;
