import React from "react";
import { DndProvider } from "react-dnd";
import { HashRouter } from "react-router-dom";
import { Provider } from "react-redux";
import Backend from "react-dnd-html5-backend";

import store from "./store";
import BaseRouter from "./Routes";

import AppContainer from "./containers/AppContainer";
import { useAuth } from "./utils/hookUtils";

const App = () => {
  const [authenticated, user, loading] = useAuth();

  return (
    <Provider store={store}>
      <HashRouter>
        <DndProvider backend={Backend}>
          <AppContainer auth={{ ...user, authenticated }} loading={loading}>
            <BaseRouter />
          </AppContainer>
        </DndProvider>
      </HashRouter>
    </Provider>
  );
};
export default App;
