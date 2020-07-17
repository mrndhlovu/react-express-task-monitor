import React from "react";
import PropTypes from "prop-types";

import { X } from "react-feather";

const TextFilePreviewButtons = ({ editAttachments, file, setOpenDocument }) => {
  return (
    <>
      <div
        className="txt-preview-edit-buttons"
        onClick={() => {
          editAttachments(file, null, true);
          setOpenDocument(false);
        }}
      >
        <X />
        <span>Delete</span>
      </div>
    </>
  );
};

TextFilePreviewButtons.propTypes = {
  editAttachments: PropTypes.func.isRequired,
  setOpenDocument: PropTypes.func.isRequired,
  file: PropTypes.shape({
    filetype: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    uploadDate: PropTypes.number.isRequired,
  }).isRequired,
};

export default TextFilePreviewButtons;
