import { lazy, Suspense } from "react";
import { Outlet } from "react-router-dom";
import useResize from "../../hooks/useResize";
import { useSidebar } from "../../context/SidebarContext";
const Header = lazy(() => import("../Header"));
const Footer = lazy(() => import("../Footer"));
const Sidebar = lazy(() => import("../Sidebar"));
function DefaultLayout() {
  const { width } = useResize();
  const isMobile = width < 768;
  const { isOpenSidebar } = useSidebar();
  return (
    <div className="relative flex w-full flex-col  overflow-hidden transition-colors z-0 bg-white  text-gray-800 h-screen font-mono">
      <Suspense>
        <Header />
      </Suspense>

      <div className="flex  h-full pt-[var(--header-height)] pb-[var(--footer-height)]">
        <Suspense>
          <Sidebar />
        </Suspense>

        <div
          className={`${
            isOpenSidebar && !isMobile
              ? "w-[calc(100%-var(--sidebar-width))]"
              : "w-full"
          }  h-full overflow-y-auto duration-300`}
        >
          <Outlet />
        </div>
      </div>
      <Suspense>
        <Footer />
      </Suspense>
    </div>
  );
}

export default DefaultLayout;
