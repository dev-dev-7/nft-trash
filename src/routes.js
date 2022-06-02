import React from "react";
import { useRoutes } from "react-router-dom";
import DefaultLayout from "./components/pages/defaultLayout.jsx";
import Home from "./components/pages/home/home.jsx";
import Menu from "./components/pages/home/menu.jsx";
const routesList = (isLoggedIn) => [
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      { path: "", element: <Home /> },
      { path: "menu", element: <Menu /> },
    ],
  },
];

const Routes = () => {
  const routing = useRoutes(routesList(false));
  return routing;
};

export default Routes;
