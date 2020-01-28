"use es6";
import { combineReducers } from "redux";

import authReducer from "./authReducer";
import boardsReducer from "./boardReducer";
import boardDetailsReducer from "./boardDetailsReducer";
import newBoardReducer from "./newBoardReducer";

export default combineReducers({
  authReducer,
  boards: boardsReducer,
  boardDetails: boardDetailsReducer,
  newBoard: newBoardReducer
});
