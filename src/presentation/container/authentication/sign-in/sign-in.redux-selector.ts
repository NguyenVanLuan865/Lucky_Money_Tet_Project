import { RootState } from '../../../shared-state';

export const selectIsLoading = (state: RootState) => state.loading.isLoading;
