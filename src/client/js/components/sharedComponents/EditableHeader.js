import React, { useState } from "react";
import PropTypes from "prop-types";

import { findArrayItem, stringsEqual } from "../../utils/appUtils";
import UIFormInput from "../sharedComponents/UIFormInput";
import { useBoardContext } from "../../utils/hookUtils";
import styled from "styled-components";

const Span = styled.span`
  font-size: ${({ fontSize }) => fontSize};
  color: ${({ color }) => color} !important;
`;

const EditableHeader = ({
  sourceId,
  title,
  type,
  editItem,
  handleEditTitle,
  attachment,
  fontSize,
  color,
  className,
}) => {
  const { boardUpdateHandler, board } = useBoardContext();

  const sourceList =
    stringsEqual(type, "listHeader") &&
    findArrayItem(board.lists, sourceId, "_id");

  const [editable, setEditable] = useState(false);
  const [newTitle, setNewTitle] = useState(title);

  const handleChange = (e) => setNewTitle(e.target.value);

  const handleUpdate = () => {
    setEditable(false);
    switch (type) {
      case "boardTitle":
        board.title = newTitle;
        return boardUpdateHandler(board, "title");
      case "checklist":
        newTitle && handleEditTitle({ ...editItem, name: newTitle });
        return setNewTitle(null);
      case "listHeader":
        sourceList.title = newTitle;
        board.lists.splice(board.lists.indexOf(sourceList), 1, sourceList);
        return boardUpdateHandler(board);
      case "imageTitle":
        newTitle && handleEditTitle({ ...attachment, name: newTitle });
        return;
      case "checkListTask":
        return handleEditTitle(sourceId, null, newTitle);
      default:
        break;
    }

    setEditable(false);
  };

  return (
    <div
      className={`${
        stringsEqual(type, "listHeader")
          ? "list"
          : stringsEqual(type, "board")
          ? "board"
          : className
      }-header-editable`}
    >
      {!editable ? (
        <Span
          color={color}
          fontSize={fontSize}
          className={`${className ? className : "editable-header-text"}`}
          onClick={() => setEditable(!editable)}
        >
          {title}
        </Span>
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
  color: PropTypes.string,
  fontSize: PropTypes.string,
  sourceId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  handleEditTitle: PropTypes.func,
  editItem: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
  }),
  attachment: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }),
};

export default EditableHeader;
