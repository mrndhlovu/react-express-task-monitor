import React from "react";

import { Icon } from "semantic-ui-react";

const DocumentPreviewButtons = ({
  setScale,
  scale,
  setPageNumber,
  firstPage,
  pageNumber,
  numPages,
  lastPage,
}) => {
  return (
    <>
      <Icon link name="zoom out" onClick={() => setScale(scale - 0.25)} />
      <Icon
        link={!firstPage}
        disabled={firstPage}
        name="arrow left"
        onClick={() => setPageNumber(firstPage ? 1 : pageNumber - 1)}
      />
      <span className="page-tracker">
        {`Page ${pageNumber} of ${numPages}`}
      </span>
      <Icon
        link={!lastPage}
        disabled={lastPage}
        name="arrow right"
        onClick={() => setPageNumber(lastPage ? numPages : pageNumber + 1)}
      />
      <Icon link name="zoom in" onClick={() => setScale(scale + 0.25)} />
    </>
  );
};

export default DocumentPreviewButtons;
