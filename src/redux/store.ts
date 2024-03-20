import { configureStore } from '@reduxjs/toolkit';
import multiStepReducer from './slice/multiStepSlice'
import ServiceStateReducer from './slice/serviceSlice';

export const store = configureStore({
  reducer: {
    multiStep: multiStepReducer,
    serviceState: ServiceStateReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type PayloadAction<T, Type extends string, Payload = T> = {
  payload?: Payload;
  type: Type;
};
