import React from "react";
import "./css/index.css";
import { render } from "react-dom";
import App from "./js/App";

render(<App />, document.getElementById("app"));

// Needed for Hot Module Replacement
if (typeof module.hot !== "undefined") {
  module.hot.accept(); // eslint-disable-line no-undef
}
