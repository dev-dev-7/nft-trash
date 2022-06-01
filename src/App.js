import React, { useEffect } from "react";
import "../src/assets/css/app.css";
import Routes from "./routes";
import GlobalStyles from "../src/assets/styles/globalStyles";
import Jss from "./Jss";
import { MoralisProvider } from "react-moralis";

const App = ({}) => {
  useEffect(() => {}, []);
  return (
    <>
      <MoralisProvider
        serverUrl="https://xwkvuaavdt4d.usemoralis.com:2053/server"
        appId="QwERi5ZaWg4Ex0PGtc0AzWHKSk07dWEp0ODIqD06"
      >
        <Jss>
          <GlobalStyles />
          <Routes />
        </Jss>
      </MoralisProvider>
    </>
  );
};

export default App;
