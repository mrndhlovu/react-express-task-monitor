import { updateObject } from "./updateObject";
import { INITIAL_STATE } from "../constants/constants";

export const hasError = state => {
  return updateObject(state, {
    ...INITIAL_STATE,
    hasError: true
  });
};

export const fetchingData = state => {
  return updateObject(state, {
    ...INITIAL_STATE,
    isLoading: true
  });
};

export const dataReceived = (state, action) => {
  return updateObject(state, {
    ...INITIAL_STATE,
    data: action.payload,
    dataReceived: true,
    authenticated: true
  });
};
