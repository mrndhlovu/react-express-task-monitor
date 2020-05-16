import React from "react";
import { Icon } from "semantic-ui-react";

const ImagePreviewButtons = ({ editAttachments, handleMakeCover, file }) => {
  return (
    <>
      <div
        className="img-preview-edit-buttons"
        onClick={() => editAttachments(file, "image", null, true)}
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
