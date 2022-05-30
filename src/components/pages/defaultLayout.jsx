import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { makeStyles } from "@mui/styles";
const useStyles = makeStyles((theme) => ({
  mainBg: {
    backgroundColor: "#F8EFEF",
    height: "100vh",
    padding: "3%",
  },
}));
const DefaultLayout = () => {
  const classes = useStyles();
  return (
    <div className={classes.mainBg}>
      <Outlet />
    </div>
  );
};

export default DefaultLayout;
