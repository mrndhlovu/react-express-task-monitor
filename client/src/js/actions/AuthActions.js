"use es6";

import {
  INITIALIZE_AUTH,
  AUTH_FAIL,
  AUTH_SUCCESS,
  SIGNUP_FAIL,
  SIGNUP_SUCCESS,
  REQUEST_SIGNUP
} from "./ActionTypes";
import { userInfo, requestAuthSignup } from "../apis/apiRequests";
import { makeRequest, requestSuccess, requestFail } from "./index";

export const getAuth = () => {
  return dispatch => {
    dispatch(makeRequest(INITIALIZE_AUTH));
    userInfo().then(
      response => dispatch(requestSuccess(AUTH_SUCCESS, response.data)),
      error => dispatch(requestFail(AUTH_FAIL, error.message))
    );
  };
};

export const requestSignup = data => {
  return dispatch => {
    dispatch(makeRequest(REQUEST_SIGNUP));
    requestAuthSignup(data).then(
      response => {
        dispatch(requestSuccess(SIGNUP_SUCCESS, response.data));
        localStorage.setItem("token", response.data.token);
      },
      error => dispatch(requestFail(SIGNUP_FAIL, error.message))
    );
  };
};
