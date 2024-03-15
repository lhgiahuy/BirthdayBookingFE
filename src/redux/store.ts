import { configureStore } from '@reduxjs/toolkit';
import multiStepReducer from './slice/multiStepSlice'

export const store = configureStore({
  reducer: {
    multiStep: multiStepReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; // để tạm vì lỗi