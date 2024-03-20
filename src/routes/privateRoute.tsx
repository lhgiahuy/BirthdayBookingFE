import { Navigate } from "react-router-dom";
import { useAppSelector } from "../redux/hook";
interface PrivateRouteProps {
    inverted: boolean;
    children: React.ReactNode;
    requiredRoles?: string[];
}

const PrivateRoute = ({ inverted, children, requiredRoles }: PrivateRouteProps) => {
    const access_token = localStorage.getItem("access_token");
    const isAuth = access_token ? true : false;
    const { role: currentRole } = useAppSelector((state) => state.roleCheck);
    // const user = localStorage.getItem('user');
    // const userObj = user ? JSON.parse(user) : {};
    // const isFirstLogin = userObj.user.isFirstLogin;

    // if (isFirstLogin && window.location.pathname !== '/account/change-password') {
    //   return <Navigate to='/account/change-password' />;
    // }

    if (inverted) {
        return isAuth ? <Navigate to="/Event" /> : children;
    }

    if (currentRole.role && !requiredRoles?.some((r) => currentRole.role === r)) return (<div></div>)

        ;

    return isAuth ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
