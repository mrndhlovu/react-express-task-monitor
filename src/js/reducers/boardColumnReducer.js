"use es6";

import {
  REQUEST_UPDATE_CARD,
  REQUEST_UPDATE_COLUMN,
  FAIL_UPDATE_COLUMN
} from "../actions/ActionTypes";

const authReducer = (state = {}, action) => {
  switch (action.type) {
    case INITIALIZE_AUTH:
      return {
        user: action.user
      };
    default:
      return state;
  }
};

export default authReducer;
