import { Navigate } from "react-router-dom";
import { useAuth } from "../context/authenticationContext";

function ProtectedRoutes({ children }) {
  const { loginData } = useAuth();

  if (!loginData?.id) return <Navigate to={"/login"} replace />;

  return children;
}

export default ProtectedRoutes;
