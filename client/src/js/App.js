import React from "react";
import { DndProvider } from "react-dnd";
import { HashRouter } from "react-router-dom";
import { Provider } from "react-redux";
import Backend from "react-dnd-html5-backend";

import BaseRouter from "./Routes";
import store from "./store";

const App = () => {
  return (
    <Provider store={store}>
      <DndProvider backend={Backend}>
        <HashRouter>
          <BaseRouter />
        </HashRouter>
      </DndProvider>
    </Provider>
  );
};
export default App;
