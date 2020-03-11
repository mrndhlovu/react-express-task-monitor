import React from "react";
import { DndProvider } from "react-dnd";
import { HashRouter } from "react-router-dom";
import { Provider } from "react-redux";
import Backend from "react-dnd-html5-backend";

import { useAuth } from "./utils/hookUtils";
import AppContainer from "./containers/AppContainer";
import BaseRouter from "./Routes";
import store from "./store";

const App = () => {
  const [authenticated, user, loading] = useAuth();

  return (
    <Provider store={store}>
      <DndProvider backend={Backend}>
        <HashRouter>
          <AppContainer auth={{ ...user, authenticated }} loading={loading}>
            <BaseRouter />
          </AppContainer>
        </HashRouter>
      </DndProvider>
    </Provider>
  );
};
export default App;
