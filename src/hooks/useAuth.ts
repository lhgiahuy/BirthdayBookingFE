import { useAppDispatch, useAppSelector } from "../redux/hook";
import {
  loginFailure,
  loginStart,
  loginSuccess,
} from "../redux/slice/loginSlice";
import { FormValues } from "../Models/Authentication";
import { NavigateFunction } from "react-router-dom";
import baseApi from "../utils/baseApi";
import { AxiosError } from "axios";
import { LoginError } from "../constants/login";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { ROLE } from "../constants/role";
import { JwtPayload } from "jwt-decode";

interface roleJwt extends JwtPayload {
  role: string;
}
export function useAuth() {
  const state = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogin = async (value: FormValues, navigate: NavigateFunction) => {
    dispatch(loginStart());
    try {
      const { data } = await baseApi.post(`/api/auth/signin`, {
        email: value.email,
        password: value.password,
      });
      const access_token = data.data;
      const decodeToken = jwtDecode(access_token) as roleJwt;
      console.log(decodeToken);
      switch (decodeToken?.role) {
        case ROLE.role1:
          navigate("/Event");
          break;
        case ROLE.role2:
          navigate("/Homehost");
          break;
        case ROLE.role3:
          navigate("/Index");
          break;
        default:
          break;
      }

      localStorage.setItem("access_token", access_token);
    } catch (error) {
      if (error instanceof AxiosError) {
        const errorResponse = error?.response?.data?.error?.message;
        if (errorResponse in LoginError) {
          const translatedError =
            LoginError[errorResponse as keyof typeof LoginError];
          dispatch(loginFailure(translatedError));
        } else {
          dispatch(loginFailure(errorResponse));
        }
      } else {
        dispatch(loginFailure("Đã có lỗi xảy ra"));
      }
    }
  };

  return { state, handleLogin };
}
