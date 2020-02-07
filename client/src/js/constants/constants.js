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

export const allowed = ["title", "lists", "section", "color"];

export const bgColors = [
  "#0079be",
  "#d29034",
  "#519839",
  "#b04532",
  "#88609e",
  "#cd5991",
  "#58bf6b",
  "#32aecc",
  "#828c90"
];
