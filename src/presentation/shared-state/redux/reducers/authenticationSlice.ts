import { createSlice } from '@reduxjs/toolkit';
import { signInAsync, signOutAsync, registerAsync, localSignInAsync } from '../action';

interface AuthenticationState {
  isAuthenticating: boolean;
  isAuthorized: boolean;
  error: string | null; 
  token: string | null;
  name: string | null;
}

const initialState: AuthenticationState = {
  isAuthenticating: false,
  isAuthorized: false,
  error: null,
  token: null,
  name: null,
};

const authenticationSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    setError(state, action) {
      state.error = action.payload;
    },
    signOut(state) {
      state.isAuthorized = false;
      state.token = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(signInAsync.pending, (state) => {
        state.isAuthenticating = true;
        state.error = null;
      })
      .addCase(signInAsync.fulfilled, (state, action) => {
        state.isAuthenticating = false;
        state.isAuthorized = true; 
        state.token = action.payload; 
        state.name = action.payload;
      })
      .addCase(signInAsync.rejected, (state, action) => {
        state.isAuthenticating = false;
        state.isAuthorized = false;
        state.token = null;
        state.error = action.payload as string;
      })
      .addCase(localSignInAsync.pending, (state) => {
        state.isAuthenticating = true;
        state.error = null;
      })
      .addCase(localSignInAsync.fulfilled, (state, action) => {
        state.isAuthenticating = false;
        if (action.payload.token) {
          state.isAuthorized = true; 
        }
      })
      .addCase(localSignInAsync.rejected, (state, action) => {
        state.isAuthenticating = false;
        state.isAuthorized = false;
        state.error = action.payload as string;
      })
      .addCase(signOutAsync.fulfilled, (state) => {
        state.isAuthorized = false;
        state.token = null; 
        state.error = null;
      })
      .addCase(registerAsync.pending, (state) => {
        state.isAuthenticating = true;
        state.error = null;
      })   
      .addCase(registerAsync.fulfilled, (state, action) => {
        state.isAuthenticating = false;
        state.isAuthorized = true; 
        state.token = action.payload;
        state.name = action.payload; 
        state.error = null;
      })        
      .addCase(registerAsync.rejected, (state, action) => {
        state.isAuthenticating = false;
        state.isAuthorized = false;
        state.token = null;
        state.error = action.payload as string;
      });
  },
});


export const { setError, signOut } = authenticationSlice.actions;
export default authenticationSlice.reducer;
