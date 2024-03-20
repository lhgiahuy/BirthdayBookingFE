import { AxiosResponse } from "axios";
import apiJWT from "./api";
import { FormValues } from "../Models/Authentication";

const responseBody = (response: AxiosResponse) => response.data;
const requests = {
  get: <T>(url: string, params?: T) =>
    apiJWT.get(url, { params }).then(responseBody),
  post: <T>(url: string, body: T) => apiJWT.post(url, body).then(responseBody),
  put: <T>(url: string, body: T) => apiJWT.put(url, body).then(responseBody),
  del: <T>(url: string, params?: T) =>
    apiJWT.delete(url, { params }).then(responseBody),
};

const Authentication = {
  login : (input : FormValues) => requests.post('https://swdbirthdaypartybooking.somee.com/api/auth/signin', {...input})
}

const Account = {
  getHostAccount : () => requests.get('https://swdbirthdaypartybooking.somee.com/api/getallhost')
}

// const Role = {
//   checkRole: () => requests.get("role/get-role"),
// };



const agent = {
//   Role,
  Authentication,
  Account,
};
export default agent;
