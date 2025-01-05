import {
 
  Menu,
  Navbar,
  MenuHandler,
  MenuList,
  Typography,
  MenuItem,
} from "@material-tailwind/react";
import { useContext } from "react";
import { authenticationContext } from "../context/authenticationContext";
import { Link } from "react-router-dom";
import useResize from "../hooks/useResize";

function Header() {
  const { loginData, setLoginData } = useContext(authenticationContext);
  const { width } = useResize();
  const handleLogout = () => {
    localStorage.clear();
    setLoginData({});
  };
  ;
  const name =
    loginData.fullname.length > 15
      ? "..." + loginData.fullname.slice(15)
      : loginData.fullname;
  return (
    <header className="absolute w-full top-0 left-0 h-[var(--header-height)] z-10">
      <Navbar
        fullWidth={true}
        color="transparent"
        className="h-[64px] rounded-bl-md rounded-br-md justify-between w-full shadow"
      >
        <div className="flex gap-2 items-center justify-between w-full">
          <Link to='/' className="text-2xl">QL công việc</Link>
          <Menu>
            <MenuHandler>
              <Typography color="white" className="cursor-pointer">
                {name}
              </Typography>
            </MenuHandler>
            <MenuList color="white">
              <MenuItem onClick={handleLogout} color="white">
                Logout
              </MenuItem>
            </MenuList>
          </Menu>
        </div>
      </Navbar>
    </header>
  );
}

export default Header;
