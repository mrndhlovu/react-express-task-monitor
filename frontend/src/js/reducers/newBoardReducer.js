import {
  FAIL_NEW_BOARD_REQUEST,
  RECEIVE_NEW_BOARD,
  REQUEST_NEW_BOARD
} from "../actions/ActionTypes";

import { fetchingData, hasError, dataReceived } from "../utils/reducersUtil";
import { INITIAL_STATE } from "../constants/constants";

const newBoardReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FAIL_NEW_BOARD_REQUEST:
      return hasError(state, action);
    case REQUEST_NEW_BOARD:
      return fetchingData(state, action);
    case RECEIVE_NEW_BOARD:
      return dataReceived(state, action);
    default:
      return state;
  }
};

export default newBoardReducer;
