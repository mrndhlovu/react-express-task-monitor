import React from "react";
import "../assets/scss/index.scss";

import { render } from "react-dom";
import App from "./js/App";

if (module.hot) {
  render(<App />, document.getElementById("app"));
}
