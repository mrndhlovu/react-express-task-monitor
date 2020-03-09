import {
  SIGNUP_FAIL,
  REQUEST_SIGNUP,
  SIGNUP_SUCCESS
} from "../actions/ActionTypes";

import { fetchingData, hasError, dataReceived } from "../utils/reducersUtil";
import { INITIAL_STATE } from "../constants/constants";

const signUpReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case REQUEST_SIGNUP:
      return hasError(state, action);
    case SIGNUP_FAIL:
      return fetchingData(state, action);
    case SIGNUP_SUCCESS:
      return dataReceived(state, action);
    default:
      return state;
  }
};

export default signUpReducer;
