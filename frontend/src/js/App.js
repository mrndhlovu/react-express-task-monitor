import React from "react";
import { DndProvider } from "react-dnd";
import { HashRouter } from "react-router-dom";
import { Provider } from "react-redux";
import Backend from "react-dnd-html5-backend";

import BaseRouter from "./Routes";
import AuthContainer from "./containers/AuthContainer";
import store from "./store";

const App = () => {
  return (
    <Provider store={store}>
      <DndProvider backend={Backend}>
        <HashRouter>
          <AuthContainer>
            <BaseRouter />
          </AuthContainer>
        </HashRouter>
      </DndProvider>
    </Provider>
  );
};
export default App;
