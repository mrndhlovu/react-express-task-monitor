import React, { useState, useCallback, useEffect } from "react";
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
  saveCardChanges,
  saveBoardChanges,
  handleLoadingAttachment,
  mobile,
  activeCard,
  upward = false,
  fluid = true,
  labeled = true,
  icon = "attach",
  direction,
  compact,
  id,
  sourceId,
  buttonText = "Attachment",
}) => {
  const [attachment, setAttachment] = useState(null);
  const [message, setMessage] = useState({ header: null, list: [] });
  const [close, setClose] = useState(false);

  useEffect(() => {
    return () => {
      setTimeout(() => {
        setClose(false);
      }, 500);
    };
  });

  const handleUpload = useCallback(
    (e) => {
      const file = e.target.files[0];

      const uploadType = file.type.split("/").shift();

      const data = new FormData();
      data.append(uploadType, file);

      const upload = async () => {
        handleLoadingAttachment("attachment");
        await requestUpload(uploadType, data, id, sourceId, activeCard._id)
          .then((res) => {
            const { card, board } = res.data;
            saveCardChanges(card);
            saveBoardChanges(board);
            handleLoadingAttachment("");
            setClose(true);
          })
          .catch((error) => {
            setMessage({ ...message, header: error.response.data.message });
            handleLoadingAttachment("");
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

    const filetype = attachment.split(".").pop();
    const allowedFileTypes = [
      ALLOWED_IMAGE_TYPES,
      ALLOWED_DOCUMENT_TYPES,
    ].flat();

    let attachmentData = {
      uploadDate: Date.now(),
      name: ALLOWED_IMAGE_TYPES.includes(filetype)
        ? `img-attachment-${attachment.split("/").pop()}`
        : `${attachment}`,
      url: attachment,
      filetype: allowedFileTypes.includes(filetype) ? filetype : "url",
    };

    const duplicate =
      findArrayItem(activeCard.attachments, attachment, "url") !== undefined;

    if (duplicate) {
      return setMessage({
        ...message,
        header: "Duplicate!",
        list: "You have this link is your attachments!",
      });
    }

    return editAttachments(attachmentData, () => {
      resetForm("attach-link");
      setAttachment(null);
      setClose(true);
    });
  };

  return (
    <DropdownButton
      labeled={labeled}
      fluid={fluid}
      upward={upward}
      icon={icon}
      buttonText={buttonText}
      header="Attach From"
      direction={direction}
      compact={compact}
      close={close}
    >
      <UIContainer width="300px" padding="0">
        {message.header && (
          <UIWrapper className="attachment-alert">
            <UIMessage
              error={true}
              handleDismiss={() => setMessage(false)}
              list={[message.header]}
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
              id="attach-link"
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
