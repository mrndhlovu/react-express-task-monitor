"use es6";

import {
  FAIL_CARD_DETAIL_REQUEST,
  RECEIVE_CARD_DETAIL,
  REQUEST_CARD_DETAIL,
  REQUEST_UPDATE_CARD,
  FAIL_UPDATE_CARD_REQUEST,
  RECEIVE_UPDATE_CARD
} from "./ActionTypes";

import { requestCardDetail, requestCardUpdate } from "../apis/apiRequests";
import { makeRequest, requestFail, requestSuccess } from "./index";

export const getCardDetail = id => {
  return dispatch => {
    dispatch(makeRequest(REQUEST_CARD_DETAIL));
    dispatch(requestCardDetail(id)).then(
      response => {
        dispatch(requestSuccess(RECEIVE_CARD_DETAIL, response.data));
      },
      error => {
        dispatch(requestFail(FAIL_CARD_DETAIL_REQUEST, error.message));
      }
    );
  };
};

export const getCardUpdate = id => {
  return dispatch => {
    dispatch(makeRequest(REQUEST_UPDATE_CARD));
    dispatch(requestCardUpdate(id)).then(
      response => {
        dispatch(requestSuccess(RECEIVE_UPDATE_CARD, response.data));
      },
      error => {
        dispatch(requestFail(FAIL_UPDATE_CARD_REQUEST, error.message));
      }
    );
  };
};
