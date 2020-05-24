const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY;

export const getRootUrl = () =>
  process.env.NODE_ENV === "production"
    ? "https://moneat.herokuapp.com"
    : "http://localhost:3000";

export const BOARDS_EP = `${getRootUrl()}/boards`;
export const UPLOAD_EP = `${getRootUrl()}/upload`;
export const CARDS_EP = `${getRootUrl()}/cards`;
export const AUTH_EP = `${getRootUrl()}/auth`;

export const IMAGES_EP = `https://api.unsplash.com/search/photos?client_id=${UNSPLASH_ACCESS_KEY}`;

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
