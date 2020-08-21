import { CREATE_ALERT } from "../actions/ActionTypes";

import { updateObject } from "../utils/updateObject";

const initialState = {
  errorMsg: "",
  successMsg: ""
};

const withMessage = (state, action) => {
  const { payload } = action;

  return payload.successMsg
    ? updateObject(state, {
        successMsg: payload
      })
    : updateObject(state, {
        errorMsg: payload
      });
};

export default function(state = initialState, action) {
  switch (action.type) {
    case CREATE_ALERT:
      return withMessage(state, action);
    default:
      return state;
  }
}
