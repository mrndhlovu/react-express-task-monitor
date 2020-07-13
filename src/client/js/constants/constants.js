export const INITIAL_STATE = {
  authenticated: false,
  data: {},
  dataReceived: false,
  hasError: false,
  isLoading: false,
};

export const DRAG_TYPES = {
  LIST: "list",
  CARD: "card",
};

export const ALLOWED_TEMPLATE_FIELDS = [
  "description",
  "isTemplate",
  "lists",
  "styleProperties",
  "title",
];

export const ACCESS_LEVELS = [
  {
    option: "Private",
    icon: "lock",
    description: "Only board members can see this board.",
  },
  {
    option: "Public",
    icon: "world",
    description: "All members can see this board.",
  },
  { option: "Team", icon: "users", description: "Anyone can see this board" },
];

export const PERMISSIONS = { private: false, public: false, team: false };

export const BG_COLORS = [
  "#0079be",
  "#d29034",
  "#519839",
  "#b04532",
  "#88609e",
  "#cd5991",
  "#58bf6b",
  "#32aecc",
  "#828c90",
  "#172b4d",
];

export const LIST_MENU_OPTIONS = [
  { key: 1, value: "Move List" },
  { key: 2, value: "Copy List" },
  { key: 3, value: "Move All Cards in This List" },
  { key: 4, value: "Delete All Lists" },
  { key: 5, value: "Delete List" },
];

export const DEFAULT_NAV_COLOR = "#026aa7";

export const ADD_TO_CARD_OPTIONS = [
  { key: 1, value: "Members", icon: "users" },
  { key: 2, value: "Labels", icon: "tags" },
  { key: 3, value: "Checklist", icon: "check square" },
  { key: 4, value: "Due Date", icon: "clock" },
  { key: 5, value: "Attachment", icon: "attach" },
];

export const CARD_ACTIONS = [
  { key: 1, value: "Move", icon: "move" },
  { key: 2, value: "Copy", icon: "copy outline" },
];

export const NEW_CARD_TEMPLATE = {
  title: "",
  position: "",
  attachments: {
    images: [],
    documents: [],
  },
  cardCover: "",
  comments: [],
  activities: [],
};

export const BOARD_ACTIVITIES = {
  boardHeader: "changed board header to",
  cardHeader: "changed card header to",
  changedCardList: "moved card from list",
  addNewList: "added new list",
  addNewCard: "added new card",
  addAttachment: "attached",
  movedCard: "moved this card from",
  addChecklist: "added Checklist to this card",
  deletedCard: "deleted card",
  deletedList: "deleted list",
};

export const SUGGESTED_COVERS = [
  "Productivity",
  "Perspective",
  "Organization",
  "Colorful",
  "Nature",
  "Business",
  "Minimal",
  "Space",
  "Animals",
];

export const ALLOWED_IMAGE_TYPES = ["png", "jpg", "gif", "jpeg"];
export const ALLOWED_DOCUMENT_TYPES = [
  "pdf",
  "doc",
  "docx",
  // "ppt",
  // "pptx",
  // "xlsx",
  // "xls",
  // "txt",
];

export const SOCIAL_AUTH_OPTIONS = [
  {
    key: "google",
    name: "Google",
  },
  {
    key: "spotify",
    name: "Spotify",
  },
];
