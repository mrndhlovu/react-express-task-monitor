export const allowedUpdates = [
  "title",
  "lists",
  "category",
  "styleProperties",
  "accessLevel",
  "archived",
  "activities"
];

export const filterObject = data => {
  const filtered = Object.keys(data)
    .filter(key => allowedUpdates.includes(key))
    .reduce((obj, key) => {
      obj[key] = data[key];
      return obj;
    }, {});

  return filtered;
};

export const getLocation = () => window.location;

export const checkDuplicate = (collection, item) => collection.includes(item);

export const resetForm = id => document.getElementById(id).reset();

export const getBoard = (boards, id) => boards.find(board => board._id === id);

export const getUserInitials = name => {
  const splitName = name.toUpperCase().split(" ");
  const initials = splitName.map(name => `${name.split("").shift()}`);
  return initials;
};

export const getActivity = (user, action) => {
  const BOARD_ACTIVITIES = {
    boardHeader: "changed board header to",
    cardHeader: "changed card header to",
    changedCardList: "moved card from list",
    addNewList: "added new list",
    addNewCard: "added new card",
    addAttachment: "attached",
    movedCard: "moved this card to",
    movedList: "moved this card to",
    addChecklist: "added Checklist to this card",
    deletedCard: "deleted card",
    deletedList: "deleted list",
    newBoard: "created this board",
    changeAccess: "changed board access level",
    color: "changed board color",
    starred: "added board to starred list",
    removeStar: "removed board from starred list"
  };
  const getAction = () => {
    switch (action) {
      case "movedCard":
        return BOARD_ACTIVITIES.movedCard;
      case "newBoard":
        return BOARD_ACTIVITIES.newBoard;
      case "newList":
        return BOARD_ACTIVITIES.addNewList;
      case "addCard":
        return BOARD_ACTIVITIES.addNewCard;
      case "deleteCard":
        return BOARD_ACTIVITIES.deletedCard;
      case "deleteList":
        return BOARD_ACTIVITIES.deleteList;
      case "moveList":
        return BOARD_ACTIVITIES.movedList;
      case "changeAccess":
        return BOARD_ACTIVITIES.changeAccess;
      case "color":
        return BOARD_ACTIVITIES.color;
      case "starred":
        return BOARD_ACTIVITIES.starred;
      case "removeStar":
        return BOARD_ACTIVITIES.removeStar;
      default:
        break;
    }
  };
  return `${user} ${getAction()}`;
};

export const emptyFunction = () => {};

export const getFormattedString = string =>
  string
    .trim()
    .replace(" ", "-")
    .toLowerCase();

export const capitalize = string =>
  string.charAt(0).toUpperCase() + string.slice(1);
