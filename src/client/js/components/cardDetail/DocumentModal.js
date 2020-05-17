import React, { useState, useEffect, lazy, Suspense } from "react";
import mammoth from "mammoth";

const Document = lazy(() => import("react-pdf/dist/Document"));
const Page = lazy(() => import("react-pdf/dist/Page"));

import { Modal, Icon } from "semantic-ui-react";

import { ALLOWED_IMAGE_TYPES } from "../../constants/constants";
import { emptyFunction, stringsEqual } from "../../utils/appUtils";
import DocumentPreviewButtons from "./DocumentPreviewButtons";
import ImagePreviewButtons from "./ImagePreviewButtons";
import UILoadingSpinner from "../sharedComponents/UILoadingSpinner";
import UIWrapper from "../sharedComponents/UIWrapper";
import TextFilePreviewButtons from "./TextFilePreviewButtons";

const DocumentModal = ({
  file,
  fileType,
  type,
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
        <UIWrapper className="pdf-preview">
          <Suspense fallback={<UILoadingSpinner />}>
            <Document
              file={url}
              onLoadSuccess={({ numPages }) => setNumPages(numPages)}
            >
              <Page scale={scale} pageNumber={pageNumber} />
            </Document>
          </Suspense>
        </UIWrapper>
      );
    }

    if (stringsEqual(fileType, ALLOWED_IMAGE_TYPES)) {
      return (
        <UIWrapper className="image-preview">
          <img src={url}></img>
        </UIWrapper>
      );
    }

    if (stringsEqual(fileType, "txt")) {
      let fileText;
      const rawFile = new XMLHttpRequest();
      rawFile.open("GET", file.document, false);

      rawFile.onreadystatechange = () => {
        if (
          rawFile.readyState === 4 &&
          (rawFile.status === 200 || rawFile.status == 0)
        ) {
          fileText = rawFile.responseText.split("\n");
        }
      };
      rawFile.send(null);
      if (fileText) {
        return (
          <UIWrapper className="txt-preview">
            {fileText.map((text, index) => (
              <p key={index}>{text}</p>
            ))}
          </UIWrapper>
        );
      }
    }

    if (stringsEqual(fileType, ["docx"])) {
      const jsonFile = new XMLHttpRequest();
      jsonFile.open("GET", file.document, true);
      jsonFile.send();
      jsonFile.responseType = "arraybuffer";

      jsonFile.onreadystatechange = () => {
        if (jsonFile.readyState === 4 && jsonFile.status === 200) {
          mammoth
            .convertToHtml(
              { arrayBuffer: jsonFile.response },
              { includeDefaultStyleMap: true }
            )
            .then((result) => {
              const docEl = document.createElement("div");
              docEl.className = "docx-container";
              docEl.innerHTML = result.value;
              document.querySelector(".docx-preview").innerHTML =
                docEl.outerHTML;
            })

            .done();
        }
      };
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
      closeIcon={<Icon className="close-modal" name="close" />}
    >
      <div className="modal-content-wrapper">
        <Modal.Content className="document-content">
          {renderDocument()}
          {stringsEqual(fileType, ["docx", "odt"]) && (
            <UIWrapper className="docx-preview" />
          )}
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
                type={type}
              />
            )}
            {stringsEqual(fileType, ALLOWED_IMAGE_TYPES) && (
              <ImagePreviewButtons
                handleMakeCover={handleMakeCover}
                editAttachments={editAttachments}
                file={file}
                setOpenDocument={setOpenDocument}
                type={type}
              />
            )}

            {stringsEqual(fileType, ["txt", "docx"]) && (
              <TextFilePreviewButtons
                editAttachments={editAttachments}
                file={file}
                setOpenDocument={setOpenDocument}
                type={type}
              />
            )}
          </UIWrapper>
        )}
      </div>
    </Modal>
  );
};

export default DocumentModal;
