import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./provider/AuthProvider";

export const ProtectedRoute = () => {
    const { tokenGL } = useAuth();

    if (!tokenGL) {
        return <Navigate to="/login" />;
    }

    return <Outlet />;
};
