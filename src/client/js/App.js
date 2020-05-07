import React from "react";
import { DndProvider } from "react-dnd";
import { HashRouter } from "react-router-dom";
import { Provider } from "react-redux";
import Backend from "react-dnd-html5-backend";

import BaseRouter from "./Routes";
import AppContainer from "./containers/AppContainer";
import store from "./store";

const App = () => {
  return (
    <Provider store={store}>
      <DndProvider backend={Backend}>
        <HashRouter>
          <AppContainer>
            <BaseRouter />
          </AppContainer>
        </HashRouter>
      </DndProvider>
    </Provider>
  );
};
export default App;
