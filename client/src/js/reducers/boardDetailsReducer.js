import {
  FAIL_BOARD_DETAIL_REQUEST,
  RECEIVE_BOARD_DETAIL,
  REQUEST_BOARD_DETAIL
} from "../actions/ActionTypes";

import { fetchingData, hasError, dataReceived } from "../utils/reducersUtil";
import { INITIAL_STATE } from "../constants/constants";

const boardDetailsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FAIL_BOARD_DETAIL_REQUEST:
      return hasError(state, action);
    case REQUEST_BOARD_DETAIL:
      return fetchingData(state, action);
    case RECEIVE_BOARD_DETAIL:
      return dataReceived(state, action);
    default:
      return state;
  }
};

export default boardDetailsReducer;
