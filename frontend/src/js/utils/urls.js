export const baseURL =
  process.env.NODE_ENV === "production"
    ? "https://trello-clone.ndhlovu.com"
    : "http://localhost:5000";

export const BOARDS_EP = `${baseURL}/api/boards`;
export const UPLOAD_EP = `${baseURL}/api/upload`;
export const CARDS_EP = `${baseURL}/api/cards`;
export const AUTH_EP = `${baseURL}/api/auth`;

export const PARAMS = {
  baseURL,
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
