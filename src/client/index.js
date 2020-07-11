import React from "react";

import { render } from "react-dom";
import App from "./js/App";
import Modal from "react-modal";

Modal.setAppElement("#app");
render(<App />, document.getElementById("app"));

if (module.hot) module.hot.accept();
