import React from "react";
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
        onClick={() => handleMakeCover(file.image)}
      >
        <Icon name="image" />
        <span>Make cover</span>
      </div>
    </>
  );
};

export default ImagePreviewButtons;
