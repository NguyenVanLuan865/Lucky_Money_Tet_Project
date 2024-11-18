import { createSlice } from '@reduxjs/toolkit';

interface GameRoomState {
  roomId: string | null;
  gameType: string | null;
  player1: string | null;
  player2: string | null;
  scores: Record<string, number>;
  gameStatus: 'idle' | 'ongoing' | 'completed';
}

const initialState: GameRoomState = {
  roomId: null,
  gameType: null,
  player1: null,
  player2: null,
  scores: {},
  gameStatus: 'idle',
};

const gameRoomSlice = createSlice({
  name: 'gameRoom',
  initialState,
  reducers: {
    setGameRoom: (state, action) => {
      state.roomId = action.payload.roomId;
      state.gameType = action.payload.gameType;
      state.player1 = action.payload.player1;
      state.player2 = action.payload.player2;
      state.scores = action.payload.scores;
      state.gameStatus = 'ongoing';
    },
    updateScores: (state, action) => {
      state.scores = action.payload.scores;
    },
    completeGame: (state) => {
      state.gameStatus = 'completed';
    },
  },
});

export const { setGameRoom, updateScores, completeGame } = gameRoomSlice.actions;
export default gameRoomSlice.reducer;
