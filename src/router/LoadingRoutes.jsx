import { useContext } from "react";
import { Outlet } from "react-router-dom";

import { Spinner } from "@material-tailwind/react";
import { authenticationContext } from "../context/authenticationContext";

function LoadingRoute() {
  const { loadingPage } = useContext(authenticationContext);
  
  
  if (loadingPage)
    return (
      <div className="flex justify-center items-center bg-black min-h-screen">
        <Spinner />
      </div>
    );

  return <Outlet />;
}

export default LoadingRoute;
