import moment from "moment";
import equals from "validator/lib/equals";

export const allowedUpdates = [
  "title",
  "lists",
  "category",
  "styleProperties",
  "accessLevel",
  "archived",
  "activities",
];

export const filterObject = (data) => {
  const filtered = Object.keys(data)
    .filter((key) => allowedUpdates.includes(key))
    .reduce((obj, key) => {
      obj[key] = data[key];
      return obj;
    }, {});

  return filtered;
};

export const checkDuplicate = (collection, item) => collection.includes(item);

export const resetForm = (data) => {
  if (typeof data === "object")
    return data.forEach((id) => (document.getElementById(id).value = ""));
  document.getElementById(data).value = "";
};

export const getBoard = (boards, id) =>
  boards.find((board) => board._id === id);

export const getUserInitials = (name) => {
  const splitName = name.toUpperCase().split(" ");
  const initials = splitName.map((name) => `${name.split("").shift()}`);
  return initials;
};

export const getActivity = (user, action) => {
  const BOARD_ACTIVITIES = {
    boardHeader: "changed board header",
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
    removeStar: "removed board from starred list",
    addLabel: "add a card label.",
    removeLabel: "removed a card label.",
    description: "added card description.",
    updatedChecklist: "updated checklist",
    removeChecklist: "removed checklist",
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
      case "addAttachment":
        return BOARD_ACTIVITIES.addAttachment;
      case "boardHeader":
        return BOARD_ACTIVITIES.boardHeader;
      case "addLabel":
        return BOARD_ACTIVITIES.addLabel;
      case "removeLabel":
        return BOARD_ACTIVITIES.removeLabel;
      case "description":
        return BOARD_ACTIVITIES.description;
      case "updatedChecklist":
        return BOARD_ACTIVITIES.updatedChecklist;
      case "removeChecklist":
        return BOARD_ACTIVITIES.removeChecklist;
      default:
        break;
    }
  };
  return `${user} ${getAction()}`;
};

export const emptyFunction = () => {};

export const getFormattedString = (string) =>
  string.trim().replace(" ", "-").toLowerCase();

export const capitalize = (string) =>
  `${string.charAt(0).toUpperCase()}${string.slice(1)}`;

export const getProgression = (partialValue, totalValue) =>
  (100 * partialValue) / totalValue;

export const getFormattedDate = (date, format, calendar) =>
  calendar ? moment(date).calendar() : moment(date).format(format);

export const stringsEqual = (mainString, comparison) => {
  if (typeof comparison !== "string")
    return comparison.includes(mainString || "");

  return equals(mainString, comparison);
};

export const findArrayItem = (array, itemId, fieldProp) =>
  array.filter((item, index) =>
    fieldProp ? equals(item[fieldProp], itemId) : index === itemId
  )[0];

export const getUpdatedArray = (array, replaceIndex, newObject) => {
  array.splice(replaceIndex, 1, newObject);
  return array;
};
