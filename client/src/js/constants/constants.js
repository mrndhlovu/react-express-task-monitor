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

export const PERMISSIONS = { private: false, public: false, team: false };

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

export const listMenuOptions = [
  { key: 1, value: "Move List" },
  { key: 2, value: "Copy List" },
  { key: 3, value: "Move All Cards in This List" },
  { key: 4, value: "Delete All Lists" },
  { key: 5, value: "Delete List" }
];

export const DEFAULT_NAV_COLOR = "#026aa7";
