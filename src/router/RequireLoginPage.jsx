import { Navigate } from "react-router-dom";

const RequireLoginPage = () => {
  return <Navigate to="/login" />;
};

export default RequireLoginPage;
