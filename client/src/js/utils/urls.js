export const getRootUrl = () =>
  process.env.NODE_ENV === "production"
    ? "https://moneat.herokuapp.com"
    : "http://127.0.0.1:5000";

export const BOARDS_EP = `${getRootUrl()}/boards`;
export const UPLOAD_EP = `${getRootUrl()}/upload`;
export const CARDS_EP = `${getRootUrl()}/cards`;
export const AUTH_EP = `${getRootUrl()}/auth`;
export const IMAGES_EP = `https://pixabay.com/api/?key=${process.env.REACT_APP_PIXABAY_API_KEY}`;

export const params = {
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  credentials: "same-origin",
  withCredentials: true,
};

export const parseSearchQuery = (query) => {
  const queryArray = query.split("=");
  return { [`${queryArray.shift()}`]: queryArray.shift() === "true" };
};

export const getQueryString = (location) => location.search.slice(1);

export const getSearchQueryString = (query) =>
  query.toLowerCase().replace(" ", "+");

export const getBoardId = (history) => {
  const query = history.location.pathname.split("/");
  return query.pop();
};
