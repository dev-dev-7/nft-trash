import React from "react";
import { makeStyles } from "@mui/styles";
import star from "../../../assets/image/star.svg";
import star2 from "../../../assets/image/star2.svg";
import { useMediaQuery, IconButton, Grid } from "@mui/material";
import twitter from "../../../assets/image/twitterb.svg";
import discord from "../../../assets/image/discordb.svg";
import trash from "../../../assets/image/trash.svg";
import msg from "../../../assets/image/msg.svg";
import msg2 from "../../../assets/image/msg2.svg";
const useStyles = makeStyles((theme) => ({
  socialbtn: {
    margin: "1.5% 1%",
  },
  trash: {
    width: "54%",
    padding: "15% 0%",
    [theme.breakpoints.down("sm")]: { width: "40%" },
  },
  div1: {
    alignItems: "flex-start!important",
    display: "flex",
    flexDirection: "column !important",
    justifyContent: "center !important",
    [theme.breakpoints.down("sm")]: { alignItems: "center !important" },
  },
  div2: {
    alignItems: "center !important",
    justifyContent: "flex-end !important",
    display: "flex !important",
    [theme.breakpoints.down("sm")]: { justifyContent: "center !important" },
  },
}));

const Welcome = () => {
  const classes = useStyles();
  const isMobile = useMediaQuery("(max-width:600px)");
  return (
    <Grid
      container
      style={{ backgroundColor: "#ff5c5c", padding: "4% ", height: "100vh" }}
    >
      <Grid item xs={12} sm={12} md={12}>
        <img src={star} style={{ width: "100%" }} />
      </Grid>
      <Grid item xs={12} sm={12} md={8} className={classes.div1}>
        <img src={isMobile ? msg2 : msg} style={{ width: "70%" }} />
        <div className={classes.socialbtn}>
          <IconButton
            size="large"
            edge="start"
            href={"#"}
            color="inherit"
            sx={{ mr: 2 }}
          >
            <img src={twitter} />
          </IconButton>{" "}
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            sx={{ mr: 2 }}
            href={"#"}
          >
            <img src={discord} />
          </IconButton>
        </div>
      </Grid>
      <Grid item xs={12} sm={12} md={4} className={classes.div2}>
        <img src={trash} className={classes.trash} />
      </Grid>
      <Grid item xs={12} sm={12} md={12}>
        <img src={star2} style={{ width: "100%" }} />
      </Grid>
    </Grid>
  );
};
export default Welcome;
