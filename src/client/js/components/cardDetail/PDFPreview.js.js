import React from "react";
import UIWrapper from "../sharedComponents/UIWrapper";

// import { Document, Page } from "react-pdf/dist/entry.webpack";
// import "react-pdf/dist/Page/AnnotationLayer.css";

// const options = {
//   cMapUrl: "cmaps/",
//   cMapPacked: true,
// };

const PDFPreview = () => {
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

export default PDFPreview;
