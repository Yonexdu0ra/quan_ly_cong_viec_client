import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/authenticationContext";

function PublicRoutes() {
  const { loginData } = useAuth();
  if (loginData?.id) return <Navigate to={"/"} replace />;
  return <Outlet />;
}

export default PublicRoutes;
