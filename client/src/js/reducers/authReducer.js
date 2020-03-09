"use es6";

import {
  INITIALIZE_AUTH,
  AUTH_FAIL,
  AUTH_SUCCESS
} from "../actions/ActionTypes";

import { fetchingData, hasError, dataReceived } from "../utils/reducersUtil";

const authReducer = (state = {}, action) => {
  switch (action.type) {
    case INITIALIZE_AUTH:
      return fetchingData(state, action);
    case AUTH_FAIL:
      return hasError(state, action);
    case AUTH_SUCCESS:
      return dataReceived(state, action);
    default:
      return state;
  }
};

export default authReducer;
