import { createContext, useCallback, useContext, useState } from "react";

export const sidebarContext = createContext({});
export const useSidebar = () => {
  return useContext(sidebarContext);
};
function SidebarContext({ children }) {
  const [isOpenSidebar, setIsOpenSidebar] = useState(false);
  const toggleSidebar = () => setIsOpenSidebar(!isOpenSidebar);
  return (
    <sidebarContext.Provider value={{ toggleSidebar, isOpenSidebar }}>
      {children}
    </sidebarContext.Provider>
  );
}

export default SidebarContext;
