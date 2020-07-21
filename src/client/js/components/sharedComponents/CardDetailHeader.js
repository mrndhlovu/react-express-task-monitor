import React from "react";
import PropTypes from "prop-types";

import { Header } from "semantic-ui-react";

import EditableHeader from "./EditableHeader";

const CardDetailHeader = ({
  editable = false,
  handleEditTitle,
  editItem,
  field = "title",
  fontSize,
  description,
  icon,
}) => {
  const Icon = icon;
  return (
    <div className="card-section-header">
      <div className="section-header-container">
        <Icon />
      </div>
      {editable ? (
        <EditableHeader
          handleEditTitle={handleEditTitle}
          editItem={editItem}
          field={field}
          fontSize={fontSize}
        />
      ) : (
        <div>
          <Header content={description || editItem[field]} as="h5" />
        </div>
      )}
    </div>
  );
};

CardDetailHeader.propTypes = {
  description: PropTypes.string,
  editable: PropTypes.bool,
  editItem: PropTypes.object,
  field: PropTypes.string,
  fontSize: PropTypes.string,
  handleEditTitle: PropTypes.func,
  section: PropTypes.string,
  icon: PropTypes.func,
};

export default CardDetailHeader;
