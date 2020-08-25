import React from "react";
import PropTypes from "prop-types";
// import { Document, Page } from "react-pdf/dist/entry.webpack";

import UIWrapper from "../sharedComponents/UIWrapper";

const options = {
  cMapUrl: "cmaps/",
  cMapPacked: true,
};

const PDFPreview = ({ file, setNumPages, pageNumber, scale }) => {
  return (
    <UIWrapper className="pdf-preview">
      {/* <Document
        file={file.url}
        options={options}
        onLoadSuccess={({ numPages }) => setNumPages(numPages)}
      >
        <Page scale={scale} pageNumber={pageNumber} />
      </Document> */}
    </UIWrapper>
  );
};

PDFPreview.propTypes = {
  setNumPages: PropTypes.func.isRequired,
  scale: PropTypes.number.isRequired,
  pageNumber: PropTypes.number.isRequired,
  file: PropTypes.shape({
    filetype: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    uploadDate: PropTypes.number.isRequired,
  }).isRequired,
};

export default PDFPreview;
