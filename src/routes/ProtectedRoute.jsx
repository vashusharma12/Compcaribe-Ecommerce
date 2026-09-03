import { Navigate } from "react-router-dom";
import { getCurrentUser } from "../utils/auth";

const ProtectedRoute = ({ children }) => {

    const user = getCurrentUser();

    if (!user) {
        return <Navigate to="/shop-index/login" replace />;
    }

    return children;
};

export default ProtectedRoute;