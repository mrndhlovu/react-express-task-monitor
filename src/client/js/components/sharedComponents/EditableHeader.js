import React, { useState } from "react";
import PropTypes from "prop-types";

import { findArrayItem, stringsEqual } from "../../utils/appUtils";
import UIFormInput from "../sharedComponents/UIFormInput";
import { useBoardContext } from "../../utils/hookUtils";

const EditableHeader = ({
  sourceId,
  title,
  type,
  checklist,
  handleEditTitle,
  attachment,
}) => {
  const { boardUpdateHandler, board } = useBoardContext();

  let sourceList = board && findArrayItem(board.lists, sourceId, "_id");

  const [editable, setEditable] = useState(false);
  const [newTitle, setNewTitle] = useState(null);

  const handleChange = (e) => setNewTitle(e.target.value);

  const handleUpdate = () => {
    setEditable(false);
    switch (type) {
      case "boardTitle":
        board.title = newTitle;
        return boardUpdateHandler(board, "title");
      case "checklist":
        newTitle && handleEditTitle({ ...checklist, name: newTitle });
        return setNewTitle(null);
      case "listHeader":
        sourceList.title = newTitle;
        board.lists.splice(board.lists.indexOf(sourceList), 1, sourceList);
        return boardUpdateHandler(board);
      case "imageTitle":
        newTitle && handleEditTitle({ ...attachment, name: newTitle });
        return;
      default:
        break;
    }

    setEditable(false);
  };

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

EditableHeader.propTypes = {
  sourceId: PropTypes.string,
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  handleEditTitle: PropTypes.func,
  checklist: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }),
  attachment: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }),
};

export default EditableHeader;
