import React, { useState, useCallback, useEffect } from "react";
import styled from "styled-components";
import isURL from "validator/lib/isURL";
import PropTypes from "prop-types";

import { Input, Button } from "semantic-ui-react";

import { resetForm, findArrayItem } from "../../utils/appUtils";
import { requestUpload } from "../../apis/apiRequests";
import AttachmentOption from "../sharedComponents/AttachmentOption";
import DropdownButton from "../sharedComponents/DropdownButton";
import UIDivider from "../sharedComponents/UIDivider";
import UIWrapper from "../sharedComponents/UIWrapper";
import UIContainer from "../sharedComponents/UIContainer";
import {
  ALLOWED_IMAGE_TYPES,
  ALLOWED_DOCUMENT_TYPES,
} from "../../constants/constants";
import {
  useBoardContext,
  useCardDetailContext,
  useMainContext,
} from "../../utils/hookUtils";

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
  upward = false,
  fluid = true,
  labeled = true,
  icon = "attach",
  direction,
  compact = false,
  buttonText = "Attachment",
}) => {
  const { updateBoardState } = useBoardContext();
  const {
    card,
    editAttachments,
    id,
    saveCardChanges,
    setIsLoading,
    sourceId,
  } = useCardDetailContext();
  const { mobile } = useMainContext();
  const { alertUser } = useMainContext();

  const [attachment, setAttachment] = useState(null);
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
        setIsLoading("attachment");
        await requestUpload(uploadType, data, id, sourceId, card._id)
          .then((res) => {
            const { card, board } = res.data;
            saveCardChanges(card);
            updateBoardState(board);
            setIsLoading("");
            setClose(true);
          })
          .catch((error) => {
            setIsLoading("");
            alertUser(error.response.data.message);
          });
      };
      file && upload();
    },
    [setIsLoading]
  );

  const handleChange = (e) => setAttachment(e.target.value);

  const handleAttachClick = () => {
    const url = isURL(attachment);
    if (!url) return alertUser("Invalid link!");

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
      findArrayItem(card.attachments, attachment, "url") !== undefined;

    if (duplicate) {
      return alertUser("You have this link is your attachments!");
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

AddAttachment.propTypes = {
  buttonText: PropTypes.string,
  compact: PropTypes.bool,
  direction: PropTypes.string,
  fluid: PropTypes.bool,
  icon: PropTypes.string,
  labeled: PropTypes.bool,
  upward: PropTypes.bool,
};

export default AddAttachment;
