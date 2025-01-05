import { createRoot } from "react-dom/client";
import "./index.css";

import { ThemeProvider } from "@material-tailwind/react";

import { RouterProvider } from "react-router-dom";
import router from "./router";
createRoot(document.getElementById("root")).render(
  <ThemeProvider>
    <RouterProvider router={router}></RouterProvider>
  </ThemeProvider>
);
