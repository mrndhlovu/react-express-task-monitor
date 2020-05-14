import React, { useState, useEffect } from "react";
import pdfjsLib from "pdfjs-dist";

import { Modal, Icon } from "semantic-ui-react";

import { emptyFunction } from "../../utils/appUtils";
import UIWrapper from "../sharedComponents/UIWrapper";

const DocumentModal = ({ file, setOpenDocument }) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [docItem, setDocItem] = useState(null);
  const [scale, setScale] = useState(1);

  const lastPage = pageNumber === numPages;
  const firstPage = pageNumber === 1;
  const url = file.document;

  const renderDocument = (page) => {
    const canvas = document.getElementById("doc-canvas"),
      viewport = page.getViewport({ scale });

    canvas.height = viewport.height;
    canvas.width = viewport.width;

    const canvasContext = canvas.getContext("2d");

    return page.render({ canvasContext, viewport }).promise.then(() => {
      setIsLoading(false);
    });
  };

  useEffect(() => {
    if (!docItem) return emptyFunction();
    docItem.getPage(pageNumber).then((page) => {
      renderDocument(page);
    });
  }, [docItem, pageNumber, scale]);

  useEffect(() => {
    if (!file) return emptyFunction();

    pdfjsLib.getDocument(url).promise.then((doc) => {
      setDocItem(doc);
      setNumPages(doc.numPages);
    });

    return () => {
      setNumPages(null);
      setNumPages(null);
      setPageNumber(null);
    };
  }, [file]);

  return (
    <Modal
      className="document-view-wrap"
      open={file !== null}
      onClose={() => setOpenDocument(null)}
      centered={false}
    >
      <Modal.Content className="document-content">
        <canvas id="doc-canvas" />
        {isLoading && "Loading..."}
      </Modal.Content>
      {!isLoading && (
        <UIWrapper className="doc-page-buttons">
          <Icon link name="zoom-out" onClick={() => setScale(scale - 0.25)} />
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
          <Icon link name="zoom-in" onClick={() => setScale(scale + 0.25)} />
        </UIWrapper>
      )}
    </Modal>
  );
};

export default DocumentModal;
