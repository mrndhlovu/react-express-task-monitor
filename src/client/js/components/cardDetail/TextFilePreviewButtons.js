import React from "react";
import { Icon } from "semantic-ui-react";

const TextFilePreviewButtons = ({
  editAttachments,
  file,
  setOpenDocument,
  type,
}) => {
  return (
    <>
      <div
        className="txt-preview-edit-buttons"
        onClick={() => {
          editAttachments(file, type, null, true);
          setOpenDocument(false);
        }}
      >
        <Icon name="delete" />
        <span>Delete</span>
      </div>
    </>
  );
};

export default TextFilePreviewButtons;
