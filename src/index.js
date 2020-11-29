/* eslint-disable react/jsx-filename-extension */
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import store from "./config/store";
import { Provider } from "react-redux";

import "fontsource-roboto";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
document.getElementsByTagName("html")[0].setAttribute("dir", "rtl");
