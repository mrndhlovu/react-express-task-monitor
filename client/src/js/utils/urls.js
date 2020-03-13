export const getRootUrl = () =>
  process.env.NODE_ENV === "production"
    ? "https://moneat.herokuapp.com"
    : "http://127.0.0.1:5000";

export const BOARDS_EP = `${getRootUrl()}/boards`;
export const UPLOAD_EP = `${getRootUrl()}/upload`;
export const CARDS_EP = `${getRootUrl()}/cards`;
export const AUTH_EP = `${getRootUrl()}/auth`;

export const params = {
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  },
  credentials: "same-origin",
  withCredentials: true
};
