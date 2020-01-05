import React, { Component } from "react";
import { Provider } from "react-redux";
import { Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import { BrowserRouter } from "react-router-dom";

import store from "./store";
import BaseRouter from "./Routes";
import Alerts from "./utils/Alerts";
import "../App.css";
import AppContainer from "./containers/AppContainer";

const alertStyle = {
  timeout: 3000,
  position: "top center"
};

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <AlertProvider template={AlertTemplate} {...alertStyle}>
            <AppContainer>
              <Alerts />
              <BaseRouter />
            </AppContainer>
          </AlertProvider>
        </BrowserRouter>
      </Provider>
    );
  }
}
export default App;
