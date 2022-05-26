import React from "react";
import { makeStyles } from "@mui/styles";
const useStyles = makeStyles((theme) => ({
  mainBg: {
    width: "100%",
    padding: "2% 8%",
  },
}));

const Home = () => {
  const classes = useStyles();
  return (
    <>
      <h1>WELCOME TO NFT TRASH</h1>
    </>
  );
};
export default Home;
