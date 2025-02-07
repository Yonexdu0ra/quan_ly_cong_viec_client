import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";

import LoadingRoutes from "./LoadingRoutes";
import AuthenticationProvider from "../context/authenticationContext";
import RequireLoginPage from "./RequireLoginPage";
import AuthenticationRoute from "./AuthenticationRoute";
import LoadingPage from "./LoadingPage";
import JobProvider from "../context/jobContext";
import DefaultLayout from "../component/layout/DefaultLayout";
const Register = lazy(() => import("../pages/Register"));
const Home = lazy(() => import("../pages/Home"));
const ChangePassword = lazy(() => import("../pages/ChangePassword"));
const Profile = lazy(() => import("../pages/Profile"));
const Login = lazy(() => import("../pages/Login"));
const Error = lazy(() => import("../pages/Error"));

const router = createBrowserRouter([
  {
    element: (
      <AuthenticationProvider>
        <LoadingRoutes />
      </AuthenticationProvider>
    ),
    errorElement: <RequireLoginPage />,
    children: [
      {
        element: <AuthenticationRoute />,
        errorElement: (
          <Suspense fallback={<LoadingPage />}>
            <Error />
          </Suspense>
        ),
        children: [
          {
            element: (
              <JobProvider>
                <DefaultLayout />
              </JobProvider>
            ),
            children: [
              {
                element: (
                  <Suspense fallback={<LoadingPage />}>
                    <Home />
                  </Suspense>
                ),
                path: "/",
              },
              {
                element: (
                  <Suspense fallback={<LoadingPage />}>
                    <ChangePassword />
                  </Suspense>
                ),
                path: "/change-password",
              },
              {
                element: (
                  <Suspense fallback={<LoadingPage />}>
                    <Profile />
                  </Suspense>
                ),
                path: "/profile",
              },
            ],
          },
        ],
      },
      {
        element: (
          <Suspense fallback={<LoadingPage />}>
            <Login />
          </Suspense>
        ),
        path: "/login",
      },
      {
        element: (
          <Suspense fallback={<LoadingPage />}>
            <Register />
          </Suspense>
        ),
        path: "/register",
      },
    ],
  },
]);

export default router;
