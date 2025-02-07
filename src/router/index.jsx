import { lazy, Suspense } from "react";
import { createBrowserRouter, Outlet } from "react-router-dom";
import DefaultLayout from "../component/layout/DefaultLayout";
import SidebarProvider from "../context/SidebarContext";
import AuthenticationProvider from "../context/authenticationContext";
import ToastProvider from "../context/ToastContext";
import JobProvider from "../context/jobContext";
import ProtectedRoutes from "./ProtectedRoute";
import PublicRoutes from "./PublicRoutes";
import { Spinner } from "@material-tailwind/react";
import RedirectRoutes from "./RedirectRoutes";
import LoadingRoutes from "./LoadingRoutes";
import ScheduleProvider from "../context/scheduleContext";
const Feedback = lazy(() => import("../pages/Feedback"));
const ErrorPage = lazy(() => import("../pages/Error"));
const Home = lazy(() => import("../pages/Home"));
const Login = lazy(() => import("../pages/Login"));
const Register = lazy(() => import("../pages/Register"));
const ForgotPassword = lazy(() => import("../pages/ForgotPassword"));
const Profile = lazy(() => import("../pages/Profile"));
const NotificationManager = lazy(() => import("../pages/NotificationManager"));
const ChangePassword = lazy(() => import("../pages/ChangePassword"));

// Component bọc Suspense cho lazy loading
const LazyWrapper = ({ children }) => (
  <Suspense
    fallback={
      <div className="flex justify-center items-center h-screen bg-bg">
        <Spinner />
      </div>
    }
  >
    {children}
  </Suspense>
);

// Định nghĩa các route công khai (không cần xác thực)
const publicRoutes = [
  {
    path: "/login",
    element: (
      <LazyWrapper>
        <Login />
      </LazyWrapper>
    ),
  },
  {
    path: "/register",
    element: (
      <LazyWrapper>
        <Register />
      </LazyWrapper>
    ),
  },
  {
    path: "/forgot-password",
    element: (
      <LazyWrapper>
        <ForgotPassword />
      </LazyWrapper>
    ),
  },
];

// Định nghĩa các route riêng (cần xác thực)
const privateRoutes = [
  {
    path: "/",
    element: (
      <LazyWrapper>
        <JobProvider>
          <Home />
        </JobProvider>
      </LazyWrapper>
    ),
  },
  {
    path: "/feedback",
    element: (
      <LazyWrapper>
        <Feedback />
      </LazyWrapper>
    ),
  },
  {
    path: "/notification-manager",
    element: (
      <LazyWrapper>
        <ScheduleProvider>
          <NotificationManager />
        </ScheduleProvider>
      </LazyWrapper>
    ),
  },
  {
    path: "/Profile",
    element: (
      <LazyWrapper>
        <Profile />
      </LazyWrapper>
    ),
  },
  {
    path: "/change-password",
    element: (
      <LazyWrapper>
        <ChangePassword />
      </LazyWrapper>
    ),
  },
];

const router = createBrowserRouter([
  {
    element: (
      <AuthenticationProvider>
        <ToastProvider>
          <SidebarProvider>
            <LoadingRoutes>
              <Outlet />
            </LoadingRoutes>
          </SidebarProvider>
        </ToastProvider>
      </AuthenticationProvider>
    ),
    errorElement: (
      <LazyWrapper>
        <ErrorPage />
      </LazyWrapper>
    ),
    children: [
      {
        element: (
          <LazyWrapper>
            <ProtectedRoutes>
              <DefaultLayout />
            </ProtectedRoutes>
          </LazyWrapper>
        ),
        children: [...privateRoutes],
      },
      {
        element: <PublicRoutes />,
        children: [...publicRoutes],
      },
      {
        path: "*",
        element: <RedirectRoutes />,
      },
    ],
  },
]);

export default router;
