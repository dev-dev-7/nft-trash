import React from "react";
import { makeStyles } from "@mui/styles";
import star2 from "../../../assets/image/star2.svg";
import { useMediaQuery, Button, IconButton, Grid } from "@mui/material";
import trash from "../../../assets/image/trash.svg";
import msg from "../../../assets/image/msg.svg";
import msg2 from "../../../assets/image/msg2.svg";

import twitter from "../../../assets/image/twitter.svg";
import discord from "../../../assets/image/discord.svg";
import opensea from "../../../assets/image/opensea.svg";

const useStyles = makeStyles((theme) => ({}));

const Menu = () => {
  const classes = useStyles();
  const isMobile = useMediaQuery("(max-width:600px)");
  return (
    <Grid container>
      <Grid
        item
        xs={12}
        sm={12}
        md={12}
        style={{ display: "flex", flexDirection: "column" }}
      >
        <Button variant="text">About</Button>
        <Button variant="text">Soldout</Button>
        <Button variant="text">Roadmap</Button>
        <Button variant="text">FAQ</Button>
        <Button variant="text">Marketplace</Button>
      </Grid>

      <Grid item xs={12} sm={12} md={12} style={{ textAlign: "center" }}>
        <IconButton size="large" edge="start" color="inherit" sx={{ mr: 2 }}>
          <img src={twitter} />
        </IconButton>{" "}
        <IconButton size="large" edge="start" color="inherit" sx={{ mr: 2 }}>
          <img src={opensea} />
        </IconButton>
        <IconButton size="large" edge="start" color="inherit" sx={{ mr: 2 }}>
          <img src={discord} />
        </IconButton>
      </Grid>
    </Grid>
  );
};
export default Menu;
