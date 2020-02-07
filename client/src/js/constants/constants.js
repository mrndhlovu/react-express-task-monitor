export const INITIAL_STATE = {
  data: {},
  dataReceived: false,
  hasError: false,
  isLoading: false
};

export const Types = {
  LIST: "list",
  CARD: "card"
};

export const allowed = ["title", "lists", "section"];
