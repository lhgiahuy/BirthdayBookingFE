import { configureStore } from '@reduxjs/toolkit';
import multiStepReducer from './slice/multiStepSlice'
import ServiceStateReducer from './slice/serviceSlice';
import authReducer from "./slice/loginSlice";
import roleSlice from './slice/roleSlice';
import orderSliceReducer from './slice/orderSlice';


export const store = configureStore({
  reducer: {
    auth: authReducer,
    roleCheck: roleSlice,
    multiStep: multiStepReducer,
    serviceState: ServiceStateReducer,
    orderSlice: orderSliceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type PayloadAction<T, Type extends string, Payload = T> = {
  payload?: Payload;
  type: Type;
};
