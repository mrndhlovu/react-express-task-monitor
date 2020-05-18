import React from "react";
import UIWrapper from "../sharedComponents/UIWrapper";

const TextPreview = ({ file }) => {
  const renderText = () => {
    let fileText;
    const rawFile = new XMLHttpRequest();
    rawFile.open("GET", file.url, false);

    rawFile.onreadystatechange = () => {
      if (
        rawFile.readyState === 4 &&
        (rawFile.status === 200 || rawFile.status == 0)
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

export default TextPreview;
