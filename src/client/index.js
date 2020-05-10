import React from "react";
import "../assets/scss/global.scss";

import { render } from "react-dom";
import App from "./js/App";

if (module.hot) {
  render(<App />, document.getElementById("app"));
}
