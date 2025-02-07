import { Spinner } from "@material-tailwind/react";
import { useAuth } from "../context/authenticationContext";
import { Outlet } from "react-router-dom";

function LoadingRoutes() {
  const { isLoadingPage } = useAuth();

  return isLoadingPage ? (
    <div className="bg-bg flex justify-center items-center h-screen">
      <Spinner />
    </div>
  ) : (
    <Outlet />
  );
}

export default LoadingRoutes;
