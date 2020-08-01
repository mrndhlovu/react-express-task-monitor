export const getRootUrl = () =>
  process.env.NODE_ENV === "production"
    ? "http://moneat.herokuapp.com"
    : "http://localhost:3000";

export const BOARDS_EP = `${getRootUrl()}/boards`;
export const UPLOAD_EP = `${getRootUrl()}/upload`;
export const CARDS_EP = `${getRootUrl()}/cards`;
export const AUTH_EP = `${getRootUrl()}/auth`;

export const params = {
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  credentials: "same-origin",
  withCredentials: true,
};

export const parseUrl = (search) => {
  const searchParams = search.replace(/^\?/, "").split("&");
  let result = {};
  searchParams.map((query) => {
    const data = query.split("=");
    return (result = {
      ...result,
      [`${data.shift()}`]: data.shift(),
    });
  });

  return result;
};

export const getQueryString = (location) => location.search.slice(1);

export const getSearchQueryString = (query) =>
  query.toLowerCase().replace(" ", "+");
