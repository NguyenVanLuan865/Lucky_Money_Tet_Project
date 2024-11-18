import { createSlice } from '@reduxjs/toolkit';
import { fetchUserAndSubCollectionsAsync } from '../action';

interface UserState {
  user: Record<string, any> | null; // Thông tin người dùng
  laclocvang: any[]; // Sub-collection `laclocvang`
  lixi: any[]; // Sub-collection `lixi`
//   masomayman: any[]; // Sub-collection `masomayman`
  isLoading: boolean; // Trạng thái loading
  error: string | null; // Lỗi nếu có
}

const initialState: UserState = {
  user: null,
  laclocvang: [],
  lixi: [],
//   masomayman: [],
  isLoading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserAndSubCollectionsAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUserAndSubCollectionsAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user || null;

        state.laclocvang = action.payload.laclocvang; 
        state.lixi = action.payload.lixi; 

      })
      .addCase(fetchUserAndSubCollectionsAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export default userSlice.reducer;
