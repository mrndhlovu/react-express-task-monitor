"use es6";
import { combineReducers } from "redux";

import authReducer from "./authReducer";
import alertsReducer from "./alertsReducer";

export default combineReducers({
  authReducer,
  alert: alertsReducer
});
