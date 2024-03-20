import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAppSelector } from "../redux/hook";

interface Props {
    roles?: string[];
}

export default function RequireAuth({ roles }: Props) {
    const { role: currentRole } = useAppSelector((state) => state.roleCheck);

    const location = useLocation();

    if (!currentRole) {
        return <Navigate to="/login" state={{ from: location }} />;
    }

    if (roles && !roles.some((r) => currentRole.role.includes(r))) {
        return <Navigate to="/own-tickets" />;
    }

    return <Outlet />;
}
