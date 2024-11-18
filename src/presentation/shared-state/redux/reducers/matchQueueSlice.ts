import { createSlice } from '@reduxjs/toolkit';
import { joinMatchQueueAsync } from '../action';

interface MatchQueueState {
  userId: string | null;
  userName: string | null;
  status: 'idle' | 'searching' | 'matched' | 'error';
  opponentId: string | null;
  gameType: string | null;
  error: string | null;
}

const initialState: MatchQueueState = {
  userId: null,
  userName: null,
  status: 'idle',
  opponentId: null,
  gameType: null,
  error: null,
};

const matchQueueSlice = createSlice({
  name: 'matchQueue',
  initialState,
  reducers: {
    resetMatchQueue: (state) => {
      state.status = 'idle';
      state.opponentId = null;
      state.gameType = null;
      state.error = null;
    },
    setOpponent: (state, action) => {
      state.opponentId = action.payload.opponentId; 
      state.status = 'matched'; 
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(joinMatchQueueAsync.pending, (state) => {
        state.status = 'searching';
        state.error = null;
      })
      .addCase(joinMatchQueueAsync.fulfilled, (state, action) => {
        state.status = 'searching';
        state.gameType = action.payload.gameType;
        state.userId = action.payload.userId;
        state.userName = action.payload.name;
      })
      .addCase(joinMatchQueueAsync.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.payload as string;
      });
  },
});

export const { resetMatchQueue, setOpponent } = matchQueueSlice.actions; // Export cả setOpponent
export default matchQueueSlice.reducer;
