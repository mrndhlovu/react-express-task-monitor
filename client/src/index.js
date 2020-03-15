import React from "react";
import App from "./js/App";
import "./css/index.css";
import { render } from "react-dom";
import * as serviceWorker from "./serviceWorker";

render(<App />, document.getElementById("app"));

serviceWorker.unregister();
