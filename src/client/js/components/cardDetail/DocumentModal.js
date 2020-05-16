import React, { useState, useEffect, lazy, Suspense } from "react";

const Document = lazy(() => import("react-pdf/dist/Document"));
const Page = lazy(() => import("react-pdf/dist/Page"));

import { Modal } from "semantic-ui-react";

import { ALLOWED_IMAGE_TYPES } from "../../constants/constants";
import { emptyFunction, stringsEqual } from "../../utils/appUtils";
import DocumentPreviewButtons from "./DocumentPreviewButtons";
import ImagePreviewButtons from "./ImagePreviewButtons";
import UILoadingSpinner from "../sharedComponents/UILoadingSpinner";
import UIWrapper from "../sharedComponents/UIWrapper";

const DocumentModal = ({
  file,
  fileType,
  setOpenDocument,
  handleMakeCover,
  editAttachments,
}) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const [scale, setScale] = useState(1);

  const lastPage = pageNumber === numPages;
  const firstPage = pageNumber === 1;
  const url = file.document || file.image;

  const renderDocument = () => {
    if (stringsEqual(fileType, "pdf")) {
      return (
        <div>
          <Suspense fallback={<UILoadingSpinner />}>
            <Document
              file={url}
              onLoadSuccess={({ numPages }) => setNumPages(numPages)}
            >
              <Page scale={scale} pageNumber={pageNumber} />
            </Document>
          </Suspense>
        </div>
      );
    }

    if (stringsEqual(fileType, ALLOWED_IMAGE_TYPES)) {
      return (
        <UIWrapper className="image-preview">
          <img src={url}></img>
        </UIWrapper>
      );
    }
  };

  useEffect(() => {
    if (!file) return emptyFunction();

    setIsLoading(false);

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
      <div className="modal-content-wrapper">
        <Modal.Content className="document-content">
          {renderDocument()}
          {isLoading && "Loading..."}
        </Modal.Content>

        {!isLoading && (
          <UIWrapper className="doc-page-buttons">
            {stringsEqual(fileType, "pdf") && (
              <DocumentPreviewButtons
                setScale={setScale}
                pageNumber={pageNumber}
                scale={scale}
                setPageNumber={setPageNumber}
                firstPage={firstPage}
                lastPage={lastPage}
                numPages={numPages}
              />
            )}
            {stringsEqual(fileType, ALLOWED_IMAGE_TYPES) && (
              <ImagePreviewButtons
                handleMakeCover={handleMakeCover}
                editAttachments={editAttachments}
                file={file}
              />
            )}
          </UIWrapper>
        )}
      </div>
    </Modal>
  );
};

export default DocumentModal;
