import React from "react";
import { DndProvider } from "react-dnd";
import { HashRouter } from "react-router-dom";
import { Provider } from "react-redux";
import Backend from "react-dnd-html5-backend";

import BaseRouter from "./Routes";
import AppContainer from "./containers/AppContainer";
import store from "./store";
import withAlert from "./HOC/withAlert";

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
export default withAlert(App);
