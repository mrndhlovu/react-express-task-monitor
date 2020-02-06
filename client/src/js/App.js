import React, { Component } from "react";
import { HashRouter } from "react-router-dom";
import { Provider } from "react-redux";

import store from "./store";
import BaseRouter from "./Routes";
import "../App.css";

import AppContainer from "./containers/AppContainer";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <HashRouter>
          <AppContainer>
            <BaseRouter />
          </AppContainer>
        </HashRouter>
      </Provider>
    );
  }
}
export default App;
