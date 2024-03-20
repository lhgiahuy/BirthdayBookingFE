// store.js

import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/loginSlice";
import roleSlice from "./slice/roleSlice";


export const store = configureStore({
  reducer: {
    auth: authReducer,
    roleCheck: roleSlice,
   
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type PayloadAction<T, Type extends string, Payload = T> = {
  payload?: Payload;
  type: Type;
};
