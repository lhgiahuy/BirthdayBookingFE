import { Navigate } from "react-router-dom";
import { useAppSelector } from "../redux/hook";
interface PrivateRouteProps {
  inverted: boolean;
  children: React.ReactNode;
  requiredRoles?: string[];
}

const PrivateRoute = ({
  inverted,
  children,
  requiredRoles,
}: PrivateRouteProps) => {
  const access_token = localStorage.getItem("access_token");
  const isAuth = access_token ? true : false;
  // const user = localStorage.getItem('user');
  // const userObj = user ? JSON.parse(user) : {};
  // const isFirstLogin = userObj.user.isFirstLogin;

  // if (isFirstLogin && window.location.pathname !== '/account/change-password') {
  //   return <Navigate to='/account/change-password' />;
  // }

<<<<<<< HEAD
    if (inverted) {
        return isAuth ? <Navigate to="/account" /> : children;
    }

    if (currentRole.role && !requiredRoles?.some((r) => currentRole.role === r)) return;

    return isAuth ? children : <Navigate to="/login" />;
=======
  if (inverted) {
    return isAuth ? <Navigate to="/Event" /> : children;
  }

  return isAuth ? children : <Navigate to="/login" />;
>>>>>>> 4523cdf7115677352fd6ceafef4d4837644d8ba0
};

export default PrivateRoute;
