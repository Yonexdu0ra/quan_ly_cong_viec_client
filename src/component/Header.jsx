import { useSidebar } from "../context/SidebarContext";
import {  useAuth } from "../context/authenticationContext";
import {
  Bars3BottomRightIcon,
  Bars3BottomLeftIcon,
} from "@heroicons/react/24/solid";
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
function Header() {
  const { isOpenSidebar, toggleSidebar } = useSidebar();
  const {setLoginData, loginData} = useAuth()
  const handleLogout = () => {
    localStorage.clear()
    setLoginData({})
  }
  return (
    <div className="fixed top-0 left-0 w-full z-50 h-[var(--header-height)]  bg-primary-50 flex items-center justify-between px-4 select-none">
      <div
        className={`cursor-pointer px-4 py-2 rounded-md hover:bg-secondary-200 duration-300 `}
        onClick={toggleSidebar}
      >
        {isOpenSidebar ? (
          <Bars3BottomRightIcon className="h-5 w-5" />
        ) : (
          <Bars3BottomLeftIcon className="h-5 w-5" />
        )}
      </div>
      <div>
        <h2 className="hidden sm:block text-primary-500 font-bold text-3xl">
          Quản lý Công Việc
        </h2>
        <h2 className="block sm:hidden text-primary-500 font-bold text-3xl">
          QLCV
        </h2>
      </div>
      <div>
        <Menu>
          <MenuHandler>
            <div className="hover:bg-secondary-200 px-4 py-2 duration-300 -w-48  truncate cursor-pointer rounded-md flex items-center gap-2 justify-center">
              <UserCircleIcon className="h-7 w-7" />
              <p className="hidden sm:inline">{loginData.fullname}</p>
            </div>
          </MenuHandler>
          <MenuList className="bg-bg truncate w-52">
            <p className="text-center sm:hidden text-primary-500 max-w-52 truncate">
              {loginData.fullname}
            </p>
            <Link to={"/profile"}>
              <MenuItem>Trang cá nhân</MenuItem>
            </Link>
            <Link to={"/change-password"}>
              <MenuItem>Đổi mật khẩu</MenuItem>
            </Link>
            <MenuItem onClick={handleLogout}>Đăng xuất</MenuItem>
          </MenuList>
        </Menu>
      </div>
    </div>
  );
}

export default Header;
