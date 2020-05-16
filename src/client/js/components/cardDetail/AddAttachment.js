import React, { useState, useCallback } from "react";
import styled from "styled-components";
import isURL from "validator/lib/isURL";

import { Input, Button } from "semantic-ui-react";

import { resetForm, findArrayItem } from "../../utils/appUtils";
import { requestUpload } from "../../apis/apiRequests";
import AttachmentOption from "../sharedComponents/AttachmentOption";
import DropdownButton from "../sharedComponents/DropdownButton";
import UIDivider from "../sharedComponents/UIDivider";
import UIMessage from "../sharedComponents/UIMessage";
import UIWrapper from "../sharedComponents/UIWrapper";
import UIContainer from "../sharedComponents/UIContainer";
import {
  ALLOWED_IMAGE_TYPES,
  ALLOWED_DOCUMENT_TYPES,
} from "../../constants/constants";

const StyledInput = styled.input`
  margin: 0;
  opacity: 0;
  padding: 0;
  cursor: pointer;
  width: 100%;
  margin-left: -68px;
`;

const StyledSmall = styled.h6`
  padding-left: 10px;
  font-size: 12px;
  margin: 2px;
`;

const AddAttachment = ({
  editAttachments,
  handleLoadingAttachment,
  mobile,
  activeCard,
}) => {
  const [attachment, setAttachment] = useState(null);
  const [message, setMessage] = useState({ header: null, list: [] });

  const handleUpload = useCallback(
    (e) => {
      const file = e.target.files[0];
      const { type } = file;
      const uploadType = type.split("/").shift();
      const data = new FormData();
      data.append(uploadType, file);

      const upload = async () => {
        handleLoadingAttachment(true);
        await requestUpload(uploadType, data)
          .then((res) => {
            editAttachments(
              { ...res.data },
              uploadType === "image" ? uploadType : "document"
            );
            handleLoadingAttachment(false);
          })
          .catch((error) => {
            setMessage({ ...message, header: error.response.data.message });
          });
      };
      file && upload();
    },
    [handleLoadingAttachment]
  );

  const handleChange = (e) => setAttachment(e.target.value);

  const handleAttachClick = () => {
    const url = isURL(attachment);
    if (!url) return setMessage({ ...message, header: "Invalid link!" });

    const uploadType = attachment.split(".").pop();

    let attachmentData = {
      uploadDate: Date.now(),
      name: ALLOWED_IMAGE_TYPES.includes(uploadType)
        ? `img-attachment-${attachment.split("/").pop()}`
        : `${attachment}`,
    };

    resetForm("attachment-link");

    if (ALLOWED_DOCUMENT_TYPES.includes(uploadType)) {
      attachmentData = {
        ...attachmentData,
        document: attachment,
      };

      return editAttachments(attachmentData, "document", () =>
        setAttachment(null)
      );
    }

    if (ALLOWED_IMAGE_TYPES.includes(uploadType)) {
      attachmentData = {
        ...attachmentData,
        imgUrl: attachment,
      };

      const duplicate =
        findArrayItem(activeCard.attachments.images, attachment, "imgUrl") !==
        undefined;

      if (duplicate) {
        return setMessage({
          ...message,
          header: "Duplicate!",
          list: ["You have this link is your attachments!"],
        });
      }
      return editAttachments(attachmentData, "image", () =>
        setAttachment(null)
      );
    }

    attachmentData = {
      ...attachmentData,
      url: attachment,
    };

    return editAttachments(attachmentData, "url", () => setAttachment(null));
  };

  return (
    <DropdownButton icon="attach" buttonText="Attachment" header="Attach From">
      <UIContainer width="300px" padding="0">
        {message.header && (
          <UIWrapper>
            <UIMessage
              error={true}
              handleDismiss={() => setMessage(false)}
              message={message.header}
              list={message.list}
            />
          </UIWrapper>
        )}
        <AttachmentOption>
          <span>{mobile ? "Phone" : "Computer"}</span>
          <StyledInput type="file" onChange={(e) => handleUpload(e)} />
        </AttachmentOption>
        {/* <AttachmentOption>
          <span>Google Drive</span>
        </AttachmentOption> */}
        <UIDivider />
        <UIWrapper padding="15px">
          <StyledSmall>Attach a link</StyledSmall>
          <UIWrapper>
            <Input
              id="attachment-link"
              size="tiny"
              focus
              placeholder="Paste a link here..."
              onChange={(e) => handleChange(e)}
              fluid
            />
          </UIWrapper>

          <UIContainer>
            <Button
              disabled={!attachment}
              positive
              content="Attach"
              size="tiny"
              onClick={() => handleAttachClick()}
            />
          </UIContainer>
        </UIWrapper>
      </UIContainer>
    </DropdownButton>
  );
};

export default AddAttachment;
