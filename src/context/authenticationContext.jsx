import { createContext, useEffect, useState } from "react";
import { request } from "../utils/request";
export const authenticationContext = createContext({});

const AuthenticationProvider = ({ children }) => {
  const [loadingPage, setLoadingPage] = useState(true);
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
        setLoadingPage(false);
      }
    }
    fetchData()


  }, []);

  return (
    <authenticationContext.Provider
      value={{
        loadingPage,
        setLoadingPage,
        loginData,
        setLoginData,
      }}
    >
      {children}
    </authenticationContext.Provider>
  );
};

export default AuthenticationProvider;
