import React, { useState, useEffect } from "react";
import pdfjsLib from "pdfjs-dist";

import { Document, Page } from "react-pdf/dist/entry.webpack";

import { Modal, Icon } from "semantic-ui-react";

import { emptyFunction } from "../../utils/appUtils";
import UIWrapper from "../sharedComponents/UIWrapper";

const DocumentModal = ({ file, setOpenDocument }) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const lastPage = pageNumber === numPages;
  const firstPage = pageNumber === 1;

  useEffect(() => {
    if (!file) return emptyFunction();

    pdfjsLib
      .getDocument(file.document)
      .promise.then((doc) => setNumPages(doc.numPages));

    return () => {
      setNumPages(null);
      setNumPages(null);
      setPageNumber(1);
    };
  }, [file]);

  return (
    <Modal
      className="document-modal"
      open={file !== null}
      onClose={() => setOpenDocument(null)}
    >
      <Modal.Content image>
        <Document file={file && file.document}>
          <Page pageNumber={pageNumber} pageIndex={0} />
        </Document>
        <UIWrapper className="doc-modal-menu-wrap">
          <Icon
            link
            disabled={firstPage}
            name="arrow left"
            onClick={() => setPageNumber(firstPage ? 1 : pageNumber - 1)}
          />
          <Icon
            link
            disabled={lastPage}
            name="arrow right"
            onClick={() => setPageNumber(lastPage ? numPages : pageNumber + 1)}
          />
        </UIWrapper>
      </Modal.Content>
    </Modal>
  );
};

export default DocumentModal;
