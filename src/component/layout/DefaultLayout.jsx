import { lazy, Suspense } from "react";
import { Outlet } from "react-router-dom";
import useResize from "../../hooks/useResize";
const Header = lazy(() => import("../Header"));
function DefaultLayout() {
  const { height } = useResize();

  return (
    <div className="relative flex w-full overflow-hidden transition-colors z-0 bg-secondary text-white h-screen font-mono ">
      <div className="relative flex h-full max-w-full flex-1 flex-col overflow-hidden">
        <Suspense
          fallback={
            <div className="h-[var(--header-height)]  animate-pulse absolute top-0 left-0 w-full"></div>
          }
        >
          <Header />
        </Suspense>
        <main
          className="mt-[var(--header-height)] overflow-y-auto"
          style={{
            height: `${height}px`,
          }}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default DefaultLayout;
