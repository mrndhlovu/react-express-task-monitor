import React from "react";
import PropTypes from "prop-types";

import { Icon } from "semantic-ui-react";

const ImagePreviewButtons = ({
  editAttachments,
  handleMakeCover,
  setOpenDocument,
  file,
}) => {
  return (
    <>
      <div
        className="img-preview-edit-buttons"
        onClick={() => {
          editAttachments(file, null, true);
          setOpenDocument(false);
        }}
      >
        <Icon name="delete" />
        <span>Delete</span>
      </div>
      <div
        className="img-preview-edit-buttons"
        onClick={() => handleMakeCover(file.url)}
      >
        <Icon name="image" />
        <span>Make cover</span>
      </div>
    </>
  );
};

ImagePreviewButtons.propTypes = {
  editAttachments: PropTypes.func.isRequired,
  handleMakeCover: PropTypes.func.isRequired,
  setOpenDocument: PropTypes.func.isRequired,
  file: PropTypes.shape({
    filetype: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    uploadDate: PropTypes.number.isRequired,
  }).isRequired,
};

export default ImagePreviewButtons;
