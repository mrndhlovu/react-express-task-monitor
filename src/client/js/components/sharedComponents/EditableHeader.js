import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import UIFormInput from "../sharedComponents/UIFormInput";

const Span = styled.span`
  font-size: ${({ fontSize }) => fontSize};
  color: ${({ color }) => color} !important;
`;

const EditableHeader = ({
  className,
  color,
  editItem,
  field = "title",
  fontSize,
  handleEditTitle,
}) => {
  const [editable, setEditable] = useState(false);
  const [newTitle, setNewTitle] = useState(editItem[field]);

  const handleChange = (e) => setNewTitle(e.target.value);

  const handleUpdate = () => {
    handleEditTitle({ ...editItem, [field]: newTitle });
    return setEditable(false);
  };

  return (
    <div className={`${className} editable-header`}>
      {!editable ? (
        <Span
          color={color}
          fontSize={fontSize}
          className={`${className ? className : "editable-header-text"}`}
          onClick={() => setEditable(!editable)}
        >
          {newTitle}
        </Span>
      ) : (
        <UIFormInput
          className="editable-header-input"
          defaultValue={newTitle}
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
  className: PropTypes.string,
  color: PropTypes.string,
  field: PropTypes.string,
  fontSize: PropTypes.string,
  handleEditTitle: PropTypes.func.isRequired,
  editItem: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
    title: PropTypes.string,
  }),
};

export default EditableHeader;
