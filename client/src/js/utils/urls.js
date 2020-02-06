"use es6";

const getBaseUrl = () => "/react-boiler-plate";

export const getRootUrl = () => getBaseUrl();

export const BOARDS_EP = "http://localhost:5000/boards";

export const authQueryParams = {
  headers: {
    "Content-Type": "application/json"
  }
};
