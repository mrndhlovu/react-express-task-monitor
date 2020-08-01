import {
  FAIL_BOARD_LIST_REQUEST,
  RECEIVE_BOARD_LIST,
  REQUEST_BOARD_LIST
} from "../actions/ActionTypes";

import { fetchingData, hasError, dataReceived } from "../utils/reducersUtil";
import { INITIAL_STATE } from "../constants/constants";

const boardsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FAIL_BOARD_LIST_REQUEST:
      return hasError(state, action);
    case REQUEST_BOARD_LIST:
      return fetchingData(state, action);
    case RECEIVE_BOARD_LIST:
      return dataReceived(state, action);
    default:
      return state;
  }
};

export default boardsReducer;
