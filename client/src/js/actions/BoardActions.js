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
  RECEIVE_UPDATE_BOARD,
  FAIL_NEW_BOARD_REQUEST,
  RECEIVE_NEW_BOARD,
  REQUEST_NEW_BOARD
} from "./ActionTypes";

import {
  requestBoardList,
  requestBoardDetail,
  requestBoardUpdate,
  requestNewBoard
} from "../apis/apiRequests";

import { makeRequest, requestFail, requestSuccess } from "./index";

export const getBoardList = () => {
  return dispatch => {
    dispatch(makeRequest(REQUEST_BOARD_LIST));
    requestBoardList().then(
      response => {
        dispatch(requestSuccess(RECEIVE_BOARD_LIST, response.data));
      },
      error => {
        dispatch(requestFail(FAIL_BOARD_LIST_REQUEST, error.message));
      }
    );
  };
};

export const getBoardDetail = id => {
  return dispatch => {
    dispatch(makeRequest(REQUEST_BOARD_DETAIL));
    requestBoardDetail(id).then(
      response => {
        dispatch(requestSuccess(RECEIVE_BOARD_DETAIL, response.data));
      },
      error => {
        dispatch(requestFail(FAIL_BOARD_DETAIL_REQUEST, error.message));
      }
    );
  };
};

export const makeNewBoard = newBoard => {
  return dispatch => {
    dispatch(makeRequest(REQUEST_NEW_BOARD));
    requestNewBoard(newBoard).then(
      response => {
        console.log("response: ", response.status);
        dispatch(requestSuccess(RECEIVE_NEW_BOARD, response.data));
      },
      error => {
        dispatch(requestFail(FAIL_NEW_BOARD_REQUEST, error.message));
      }
    );
  };
};

export const makeBoardUpdate = (id, board) => {
  return dispatch => {
    dispatch(makeRequest(REQUEST_UPDATE_BOARD));
    requestBoardUpdate(id, board).then(
      response => {
        console.log("response: ", response.status);
        dispatch(requestSuccess(RECEIVE_UPDATE_BOARD, response.data));
      },
      error => {
        console.log("error: ", error);
        dispatch(requestFail(FAIL_UPDATE_BOARD_REQUEST, error.message));
      }
    );
  };
};
