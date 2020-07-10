import React, { useState, useEffect } from "react";

import { findArrayItem, stringsEqual } from "../../utils/appUtils";
import UIFormInput from "../sharedComponents/UIFormInput";

const EditableHeader = ({
  board,
  handleBoardUpdate,
  sourceId,
  title,
  type,
  checklist,
  updatedChecklistTitle,
  handleEditAttachmentName,
  attachment,
}) => {
  let sourceList = board && findArrayItem(board.lists, sourceId, "_id");

  const [editable, setEditable] = useState(false);
  const [newTitle, setNewTitle] = useState(null);
  const [newBoard, setNewBoard] = useState(null);

  const handleChange = (e) => {
    setNewTitle(e.target.value);
  };

  const handleUpdate = () => {
    setEditable(false);
    switch (type) {
      case "boardTitle":
        return setNewBoard({ ...board, title: newTitle });
      case "checklist":
        newTitle && updatedChecklistTitle({ ...checklist, name: newTitle });
        return setNewTitle(null);
      case "listHeader":
        sourceList.title = newTitle;
        board.lists.splice(board.lists.indexOf(sourceList), 1, sourceList);
        return setNewBoard({ ...board });
      case "imageTitle":
        newTitle && handleEditAttachmentName({ ...attachment, name: newTitle });
        return;
      default:
        break;
    }

    setEditable(false);
  };

  useEffect(() => {
    if (!newBoard) return;
    newTitle &&
      handleBoardUpdate(
        newBoard,
        stringsEqual(type, "boardTitle") ? "title" : "lists"
      );
    setNewBoard(null);
  }, [newBoard, handleBoardUpdate, newTitle]);

  return (
    <div
      className={`${
        stringsEqual(type, "listHeader") ? "list" : "board"
      }-header-editable`}
    >
      {!editable ? (
        <span
          className="editable-header-text"
          onClick={() => setEditable(!editable)}
        >
          {title}
        </span>
      ) : (
        <UIFormInput
          className="editable-header-input"
          defaultValue={title}
          onBlur={() => handleUpdate()}
          onChange={(e) => handleChange(e)}
          autoFocus={true}
          onKeyDown={(e) => (e.key === "Enter" ? handleUpdate() : null)}
        />
      )}
    </div>
  );
};

export default EditableHeader;
