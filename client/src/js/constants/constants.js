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

export const allowed = [
  "title",
  "lists",
  "styleProperties",
  "permission",
  "category",
  "accessLevel"
];

export const ACCESS_LEVELS = [
  {
    option: "Private",
    icon: "lock",
    description: "Only board members can see this board."
  },
  {
    option: "Public",
    icon: "world",
    description: "All members can see this board."
  },
  { option: "Team", icon: "users", description: "Anyone can see this board" }
];

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

export const DEFAULT_NAV_COLOR = "#026aa7";
