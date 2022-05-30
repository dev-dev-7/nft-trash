import React from "react";
import { useRoutes } from "react-router-dom";
import DefaultLayout from "./components/pages/defaultLayout.jsx";
import Home from "./components/pages/home/home.jsx";
import Welcome from "./components/pages/home/Welcome.jsx";
const routesList = (isLoggedIn) => [
  {
    path: "/",
    element: <DefaultLayout />,
    children: [{ path: "", element: <Home /> }],
  },
];

const Routes = () => {
  const routing = useRoutes(routesList(false));
  return routing;
};

export default Routes;
