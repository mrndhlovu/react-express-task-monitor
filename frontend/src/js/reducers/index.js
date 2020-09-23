"use es6";
import { combineReducers } from "redux";

import authReducer from "./authReducer";
import signReducer from "./signUpReducer";

export default combineReducers({ auth: authReducer, newUser: signReducer });
