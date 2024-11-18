import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

export const selectAuthentication = createSelector(
  (state: RootState) => state.authentication,
  (authentication) => ({
    isAuthenticating: authentication.isAuthenticating,
    isAuthorized: authentication.isAuthorized,
    token: authentication.token,
  })
);
