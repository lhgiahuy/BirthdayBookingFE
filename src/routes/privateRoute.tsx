import { Navigate } from "react-router-dom";

import Forbidden from "../pages/error/forbidden";
import { JwtPayload, jwtDecode } from "jwt-decode";

interface roleJwt extends JwtPayload {
  role: string;
}
interface PrivateRouteProps {
  inverted: boolean;
  children: JSX.Element;
  requiredRoles?: string[];
}

const PrivateRoute = ({ inverted, children, requiredRoles }: PrivateRouteProps) => {
  const access_token = localStorage.getItem("access_token");
  const isAuth = access_token ? true : false;
  if (inverted) {

    return isAuth ? <Navigate to="/" /> : children;

  }
  if (access_token) {
    const decodeToken = jwtDecode(access_token) as roleJwt;
    console.log("Asdsad")
    if (decodeToken.role && !requiredRoles?.some((r) => decodeToken.role === r)) return <Navigate to="/error" />;
  }


  return isAuth ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
