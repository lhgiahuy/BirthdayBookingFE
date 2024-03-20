import { PayloadAction, createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import agent from '../../utils/agent2';

import { FormValues } from '../../Models/Authentication';
import { AxiosError } from 'axios';
export interface CurrentUser {
  id: string;
  email: string,
  password: string,
  name: string,
  phone: string,
  role: number,
  deleteFlag: number,
}

export interface User {
  currentUser: CurrentUser;
  isFetching: boolean;
  error: boolean;
  displayError: string;
}

const initialState: User = {
  currentUser: {} as CurrentUser,
  isFetching: false,
  error: false,
  displayError: '',
};

export const handleLoginSubmit = createAsyncThunk(
  "auth/handleLoginSubmit", 
  async (requestData: FormValues) => {
    try{
        const response = await agent.Authentication.login(requestData);
        console.log(response);
        return response;
    } catch(error){
if (error instanceof AxiosError) {
        return {
          message: error.response?.data.error.message,
          status: error.response?.status,
        };
      }
    }
  }
)

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.isFetching = true;
    },
    loginSuccess: (state, action: PayloadAction<CurrentUser>) => {
      state.isFetching = false;
      state.currentUser = action.payload;
      state.error = false;
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.isFetching = false;
      state.error = true;
      state.displayError = action.payload;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure } = authSlice.actions;

export default authSlice.reducer;
