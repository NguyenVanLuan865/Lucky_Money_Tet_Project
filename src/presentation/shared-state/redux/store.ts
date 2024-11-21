import { configureStore } from '@reduxjs/toolkit';
import {authenticationReducer , userReducer,  matchQueueReducer, gameRoomReducer , loadingReducer} from './reducers';

const store = configureStore({
  reducer: {
    authentication: authenticationReducer,
    user: userReducer, 
    // reward: rewardReducer,
    matchQueue: matchQueueReducer,
    gameRoom: gameRoomReducer,
    loading: loadingReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
