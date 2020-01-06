"use es6";

import {
  FAIL_BOARD_DETAIL_REQUEST,
  FAIL_BOARD_LIST_REQUEST,
  RECEIVE_BOARD_DETAIL,
  RECEIVE_BOARD_LIST,
  REQUEST_BOARD_DETAIL,
  REQUEST_BOARD_LIST,
  REQUEST_UPDATE_BOARD,
  FAIL_UPDATE_BOARD_REQUEST,
  RECEIVE_UPDATE_BOARD
} from "./ActionTypes";

import {
  requestBoardList,
  requestBoardDetail,
  requestBoardUpdate
} from "../apis/apiRequests";

import { makeRequest, dataRequestFail, requestSuccess } from "./index";

export const getBoardList = () => {
  return dispatch => {
    dispatch(makeRequest(REQUEST_BOARD_LIST));
    dispatch(requestBoardList()).then(
      response => {
        dispatch(requestSuccess(RECEIVE_BOARD_LIST, response.data));
      },
      error => {
        dispatch(dataRequestFail(FAIL_BOARD_LIST_REQUEST, error.message));
      }
    );
  };
};

export const getBoardDetail = id => {
  return dispatch => {
    dispatch(makeRequest(REQUEST_BOARD_DETAIL));
    dispatch(requestBoardDetail(id)).then(
      response => {
        dispatch(requestSuccess(RECEIVE_BOARD_DETAIL, response.data));
      },
      error => {
        dispatch(dataRequestFail(FAIL_BOARD_DETAIL_REQUEST, error.message));
      }
    );
  };
};

export const getBoardUpdate = () => {
  return dispatch => {
    dispatch(makeRequest(REQUEST_UPDATE_BOARD));
    dispatch(requestBoardUpdate()).then(
      response => {
        dispatch(requestSuccess(RECEIVE_UPDATE_BOARD, response.data));
      },
      error => {
        dispatch(dataRequestFail(FAIL_UPDATE_BOARD_REQUEST, error.message));
      }
    );
  };
};
