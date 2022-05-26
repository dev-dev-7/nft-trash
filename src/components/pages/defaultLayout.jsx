import React, { useState } from "react";
import { Outlet } from "react-router-dom";
// import { makeStyles } from "@mui/styles";
// import bg from "../../assets/images/bg.svg";
// const useStyles = makeStyles((theme) => ({
//   mainBg: {
//     backgroundImage: `url(${bg})`,
//     backgroundRepeat: "no-repeat",
//     width: "100%",
//     padding: "2% 8%",
//   },
// }));
const DefaultLayout = () => {
  // const classes = useStyles();
  return (
    // <div className={classes.mainBg}>
    <Outlet />
    // </div>
  );
};

export default DefaultLayout;
