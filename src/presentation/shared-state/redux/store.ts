import { configureStore } from '@reduxjs/toolkit';
import {authenticationReducer , userReducer,  matchQueueReducer, gameRoomReducer } from './reducers';

const store = configureStore({
  reducer: {
    authentication: authenticationReducer,
    user: userReducer, 
    // reward: rewardReducer,
    matchQueue: matchQueueReducer,
    gameRoom: gameRoomReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
