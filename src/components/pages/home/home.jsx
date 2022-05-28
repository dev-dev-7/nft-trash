import React from "react";
import { makeStyles } from "@mui/styles";
import twitter from "../../../assets/image/twitter.svg";
import discord from "../../../assets/image/discord.svg";
import opensea from "../../../assets/image/opensea.svg";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Button,
  Typography,
  MenuItem,
  Menu,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import { Twitter } from "@mui/icons-material";

const useStyles = makeStyles((theme) => ({
  mainBg: {
    width: "100%",
    padding: "2% 8%",
  },
}));

const Home = () => {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <MailIcon />
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <NotificationsIcon />
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton size="large" edge="start" color="inherit" sx={{ mr: 2 }}>
            <img src={twitter} />
          </IconButton>{" "}
          <IconButton size="large" edge="start" color="inherit" sx={{ mr: 2 }}>
            <img src={opensea} />
          </IconButton>
          <IconButton size="large" edge="start" color="inherit" sx={{ mr: 2 }}>
            <img src={discord} />
          </IconButton>
          <Button variant="text">About</Button>
          <Button variant="text">Soldout</Button>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { md: "flex" } }}>
            <Button variant="text">Roadmap</Button>
            <Button variant="text">FAQ</Button>
            <Button variant="text">Marketplace</Button>
            <Button variant="contained">Connect</Button>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
    </Box>
  );
};
export default Home;
