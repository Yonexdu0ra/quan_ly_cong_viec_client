import { createContext, useContext, useEffect, useState } from "react";
import request from "../utils/request";
export const authenticationContext = createContext({});
export const useAuth = () => {
  return useContext(authenticationContext);
};
const AuthenticationProvider = ({ children }) => {
  const [isLoadingPage, setIsLoadingPage] = useState(true);
  const [loginData, setLoginData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (loginData?.id) return;

        const { data } = await request("/me", {
          method: "GET",
          body: null,
        });
        if (!data) return;
        setLoginData(data);
      } catch (error) {
        console.log(error);

        localStorage.clear();
        return;
      } finally {
        setIsLoadingPage(false);
      }
    };
    fetchData();
  }, []);

  return (
    <authenticationContext.Provider
      value={{
        isLoadingPage,
        setIsLoadingPage,
        loginData,
        setLoginData,
      }}
    >
      {children}
    </authenticationContext.Provider>
  );
};

export default AuthenticationProvider;
