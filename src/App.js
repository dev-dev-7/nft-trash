import React, { useEffect } from "react";
import "../src/assets/css/app.css";
import Routes from "./routes";
import GlobalStyles from "../src/assets/styles/globalStyles";
import Jss from "./Jss";
// import { Web3ReactProvider } from "@web3-react/core";
// import Web3 from "web3";

const App = ({}) => {
  useEffect(() => {}, []);
  return (
    <>
      <Jss>
        <GlobalStyles />
        <Routes />
      </Jss>
    </>
  );
};

export default App;
