import React, { useState, useEffect, lazy, Suspense } from "react";
import mammoth from "mammoth";
import PropTypes from "prop-types";

import { ALLOWED_IMAGE_TYPES } from "../../constants/constants";
import { emptyFunction, stringsEqual } from "../../utils/appUtils";
import { useCardDetailContext } from "../../utils/hookUtils";
import DocumentPreviewButtons from "./DocumentPreviewButtons";
import ImagePreviewButtons from "./ImagePreviewButtons";
import TextFilePreviewButtons from "./TextFilePreviewButtons";
import UILoadingSpinner from "../sharedComponents/UILoadingSpinner";
import UIModal from "../sharedComponents/UIModal";
import UIWrapper from "../sharedComponents/UIWrapper";

const TextPreview = lazy(() => import("./TextPreview"));
const PDFPreview = lazy(() => import("./PDFPreview.js"));

const DocumentModal = ({ file, setOpenDocument }) => {
  const { handleMakeCover, editAttachments } = useCardDetailContext();

  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const [scale, setScale] = useState(1);

  const lastPage = pageNumber === numPages;
  const firstPage = pageNumber === 1;
  const { url, filetype } = file;

  const DOCUMENT_MODAL_STYLE = {
    backgroundColor: "transparent",
    border: "none",
    display: "flex",
    justifyContent: "space-around",
    position: "absolute",
    top: "4%",
    bottom: "",
  };

  const renderDocument = () => {
    if (stringsEqual(filetype, "pdf"))
      return (
        <Suspense fallback={<UILoadingSpinner />}>
          <PDFPreview
            numPages={numPages}
            scale={scale}
            file={file}
            setNumPages={setNumPages}
            pageNumber={pageNumber}
          />
        </Suspense>
      );

    if (stringsEqual(filetype, ALLOWED_IMAGE_TYPES)) {
      return (
        <UIWrapper className="image-preview">
          <img alt="preview-item" src={url} />
        </UIWrapper>
      );
    }

    if (stringsEqual(filetype, "txt"))
      return (
        <Suspense fallback={<UILoadingSpinner />}>
          <TextPreview file={file} />
        </Suspense>
      );

    if (stringsEqual(filetype, ["docx"])) {
      const jsonFile = new XMLHttpRequest();
      jsonFile.open("GET", url, true);
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
    <UIModal
      className="document-view-wrap"
      isOpen={file !== null}
      onClose={() => setOpenDocument(null)}
      closeIcon
      modalStyle={DOCUMENT_MODAL_STYLE}
    >
      <div className="modal-content-wrapper">
        <div className="document-content">
          {renderDocument()}
          {stringsEqual(filetype, ["docx", "odt"]) && (
            <UIWrapper className="docx-preview" />
          )}
          {isLoading && "Loading..."}
        </div>

        {!isLoading && (
          <UIWrapper className="doc-page-buttons">
            {stringsEqual(filetype, "pdf") && (
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
            {stringsEqual(filetype, ALLOWED_IMAGE_TYPES) && (
              <ImagePreviewButtons
                handleMakeCover={handleMakeCover}
                editAttachments={editAttachments}
                file={file}
                setOpenDocument={setOpenDocument}
              />
            )}

            {stringsEqual(filetype, ["txt", "docx"]) && (
              <TextFilePreviewButtons
                editAttachments={editAttachments}
                file={file}
                setOpenDocument={setOpenDocument}
              />
            )}
          </UIWrapper>
        )}
      </div>
    </UIModal>
  );
};

DocumentModal.propTypes = {
  setOpenDocument: PropTypes.func.isRequired,
  file: PropTypes.shape({
    filetype: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    uploadDate: PropTypes.number.isRequired,
  }).isRequired,
};

export default DocumentModal;
