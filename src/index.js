import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import "./index.css";
import App from "./App";
import { ContextProvider } from "./context/Context";

axios.interceptors.request.use(function (config) {
  const token = localStorage.getItem("x-auth-token");
  if (
    token &&
    !config?.url?.includes("/login/") &&
    !config?.url?.includes("216.128.135.6")
  ) {
    config.headers.Authorization = `Token ${token}`;
  }
  return config;
});

ReactDOM.render(
  <ContextProvider>
    {/* <React.StrictMode> */}
    <App />
    {/* </React.StrictMode> */}
  </ContextProvider>,
  document.getElementById("root")
);
