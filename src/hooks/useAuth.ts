import { useAppDispatch, useAppSelector } from '../redux/hook';
import { loginFailure, loginStart, loginSuccess } from '../redux/slice/loginSlice';
import { FormValues } from '../Models/Authentication';
import { NavigateFunction } from 'react-router-dom';
import baseApi from '../utils/baseApi';
import { AxiosError } from 'axios';
import { LoginError } from '../constants/login';

export function useAuth() {
  const state = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();


  const handleLogin = async (value: FormValues, navigate: NavigateFunction) => {
    dispatch(loginStart());
    try {
      const { data } = await baseApi.post(`/api/auth/signin`, {
        email: value.email,
        password: value.password,
      });
      const  access_token  = data.data;

      localStorage.setItem('access_token', access_token);
  
    } catch (error) {
      if (error instanceof AxiosError) {
        const errorResponse = error?.response?.data?.error?.message;
        if (errorResponse in LoginError) {
          const translatedError = LoginError[errorResponse as keyof typeof LoginError];
          dispatch(loginFailure(translatedError));
        } else {
          dispatch(loginFailure(errorResponse));
        }
      } else {
        dispatch(loginFailure('Đã có lỗi xảy ra'));
      }
    }
  };

  return { state, handleLogin };
}
