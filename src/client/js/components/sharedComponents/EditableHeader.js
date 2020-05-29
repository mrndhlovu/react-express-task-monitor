import React, { useState, useContext, useEffect } from "react";

import { BoardContext } from "../../utils/contextUtils";
import { findArrayItem, stringsEqual } from "../../utils/appUtils";
import UIFormInput from "../sharedComponents/UIFormInput";

const EditableHeader = ({ title, type, sourceId }) => {
  const { handleBoardUpdate, board } = useContext(BoardContext);
  let sourceList = findArrayItem(board.lists, sourceId, "_id");

  const [editable, setEditable] = useState(false);
  const [newTitle, setNewTitle] = useState(null);
  const [newBoard, setNewBoard] = useState(null);

  const handleChange = (e) => {
    setNewTitle(e.target.value);
  };

  const handleUpdate = () => {
    switch (type) {
      case "boardTitle":
        setNewBoard({ ...board, title: newTitle });
        break;
      case "listHeader":
        sourceList.title = newTitle;
        board.lists.splice(board.lists.indexOf(sourceList), 1, sourceList);
        setNewBoard({ ...board });
        break;
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
          {title}{" "}
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
