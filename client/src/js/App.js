import React, { Component } from "react";
import { HashRouter } from "react-router-dom";
import { Provider } from "react-redux";
import Backend from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";

import store from "./store";
import BaseRouter from "./Routes";
import "../App.css";

import AppContainer from "./containers/AppContainer";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <HashRouter>
          <DndProvider backend={Backend}>
            <AppContainer>
              <BaseRouter />
            </AppContainer>
          </DndProvider>
        </HashRouter>
      </Provider>
    );
  }
}
export default App;
