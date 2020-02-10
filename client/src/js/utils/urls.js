"use es6";

export const getRootUrl = () =>
  process.env.NODE_ENV === "production"
    ? "https://moneat.herokuapp.com/"
    : process.env.REACT_APP_DEV_API_URL;

export const BOARDS_EP = `${getRootUrl()}`;

export const authQueryParams = {
  headers: {
    "Content-Type": "application/json"
  }
};
