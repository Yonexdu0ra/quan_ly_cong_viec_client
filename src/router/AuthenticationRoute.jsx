import { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { authenticationContext } from "../context/authenticationContext";

function AuthenticationRoute() {
  const { loginData } = useContext(authenticationContext);

  if (!loginData.id) {
    return <Navigate to={"/login"} replace={true} />;
  }
    
  return <Outlet />;
}

export default AuthenticationRoute;
