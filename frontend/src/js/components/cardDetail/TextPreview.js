import React from "react";
import PropTypes from "prop-types";

import UIWrapper from "../shared/UIWrapper";

const TextPreview = ({ file }) => {
  const renderText = () => {
    let fileText;
    const rawFile = new XMLHttpRequest();
    rawFile.open("GET", file.url, false);

    rawFile.onreadystatechange = () => {
      if (
        rawFile.readyState === 4 &&
        (rawFile.status === 200 || rawFile.status === 0)
      ) {
        fileText = rawFile.responseText.split("\n");
      }
    };
    rawFile.send(null);

    return (
      <UIWrapper className="txt-preview">
        {fileText.map((text, index) => (
          <p key={index}>{text}</p>
        ))}
      </UIWrapper>
    );
  };

  return renderText();
};

TextPreview.propTypes = {
  file: PropTypes.shape({
    filetype: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    uploadDate: PropTypes.number.isRequired,
  }).isRequired,
};

export default TextPreview;
