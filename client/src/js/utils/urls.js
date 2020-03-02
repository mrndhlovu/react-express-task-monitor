"use es6";

export const getRootUrl = () =>
  process.env.NODE_ENV === "production"
    ? "https://moneat.herokuapp.com"
    : process.env.REACT_APP_DEV_API_URL;

export const BOARDS_EP = `${getRootUrl()}/boards`;
export const UPLOAD_EP = `${getRootUrl()}/upload`;
export const CARDS_EP = `${getRootUrl()}/cards`;

export const authQueryParams = {
  headers: {
    "Content-Type": "application/json"
  }
};
