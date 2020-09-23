import React from "react";
import PropTypes from "prop-types";

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
      <Icon link name="minus" onClick={() => setScale(scale - 0.25)} />
      <Icon link name="zoom in" />
      <Icon link name="add" onClick={() => setScale(scale + 0.25)} />
    </>
  );
};

DocumentPreviewButtons.propTypes = {
  firstPage: PropTypes.bool.isRequired,
  lastPage: PropTypes.bool.isRequired,
  numPages: PropTypes.number.isRequired,
  pageNumber: PropTypes.number.isRequired,
  scale: PropTypes.number.isRequired,
  setPageNumber: PropTypes.func.isRequired,
  setScale: PropTypes.func.isRequired,
};

export default DocumentPreviewButtons;
