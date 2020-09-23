import App from "./js/App";
import "./assets/scss/styles.scss";
import React from "react";
import ReactDOM from "react-dom";
import Modal from "react-modal";

Modal.setAppElement("#root");

ReactDOM.render(<App />, document.getElementById("root"));
