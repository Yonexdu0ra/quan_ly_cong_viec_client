import { Button, Drawer } from "@material-tailwind/react";
import { useSidebar } from "../context/SidebarContext";
import useResize from "../hooks/useResize";
import { NavLink } from "react-router-dom";
import { XMarkIcon} from '@heroicons/react/24/solid';
const listData = [
  {
    title: "Quản lý công việc",
    link: "/",
  },
  {
    title: "Quản lý thông báo",
    link: "/notification-manager",
  },
  {
    title: "Phản hồi",
    link: "/feedback",
  },
];

const PC = ({ isOpenSidebar, toggleSidebar }) => {
  return (
    <div
      className={`${
        isOpenSidebar ? "w-[var(--sidebar-width)]" : "w-0"
      } h-full bg-secondary-50 duration-300 overflow-hidden truncate`}
    >
      <div className="flex flex-col rounded-lg">
        {listData.map((item, index) => (
          <NavLink
            key={index}
            to={item.link}
            className={({ isActive }) =>
              `${
                isActive
                  ? "bg-primary-100 text-primary-500 hover:bg-primary-200"
                  : "text-gray-950 hover:bg-secondary-200"
              } px-4 py-2 duration-300 rounded-lg max-w-[var(--sidebar-width)] truncate`
            }
          >
            {item.title}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

const Mobile = ({ isOpenSidebar, toggleSidebar }) => {
  return (
    <Drawer
      open={isOpenSidebar}
      onClose={toggleSidebar}
      className="bg-secondary-50"
    >
      <div className="flex justify-between items-center p-2"> 
        <p className="text-2xl text-primary-500 font-bold">QLCV</p>
        <Button variant="text" color="red" onClick={toggleSidebar}>
          <XMarkIcon className="h-5 w-5"/>
        </Button>
      </div>
      <div className="flex flex-col rounded-lg">
        {listData.map((item, index) => (
          <NavLink
            key={index}
            to={item.link}
            className={({ isActive }) =>
              `${
                isActive
                  ? "bg-primary-100 text-primary-500 hover:bg-primary-200"
                  : "text-gray-950 hover:bg-secondary-200"
              } px-4 py-2 duration-300 rounded-lg max-w-[var(--sidebar-width)] truncate`
            }
          >
            {item.title}
          </NavLink>
        ))}
      </div>
    </Drawer>
  );
};

function Sidebar() {
  const { isOpenSidebar, toggleSidebar } = useSidebar();
  const { width } = useResize();
  const isMobile = width < 768;
  return isMobile ? (
    <Mobile isOpenSidebar={isOpenSidebar} toggleSidebar={toggleSidebar} />
  ) : (
    <PC isOpenSidebar={isOpenSidebar} toggleSidebar={toggleSidebar} />
  );
}

export default Sidebar;
