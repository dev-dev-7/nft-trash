import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import { MoralisProvider } from "react-moralis";

ReactDOM.render(
  <BrowserRouter basename="/">
    <MoralisProvider
      serverUrl="https://bqtpzv3z42zl.usemoralis.com:2053/server"
      appId="f3n004E2PHlj7rsyCyTVaTzRbCcUsRzwi0ygixOu"
    >
      <App />
    </MoralisProvider>
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
