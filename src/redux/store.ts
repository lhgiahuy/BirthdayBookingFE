import { configureStore } from '@reduxjs/toolkit';
import multiStepReducer from './slice/multiStepSlice'
import ServiceStateReducer from './slice/serviceSlice';

export const store = configureStore({
  reducer: {
<<<<<<< HEAD
    auth: authReducer,
    roleCheck: roleSlice,
   
=======
    multiStep: multiStepReducer,
    serviceState: ServiceStateReducer,
>>>>>>> 4523cdf7115677352fd6ceafef4d4837644d8ba0
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type PayloadAction<T, Type extends string, Payload = T> = {
  payload?: Payload;
  type: Type;
};
