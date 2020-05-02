import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import isURL from "validator/lib/isURL";

import { Input, Button } from "semantic-ui-react";

import { emptyFunction, resetForm } from "../../utils/appUtils";
import { requestUpload } from "../../apis/apiRequests";
import AttachmentOption from "../sharedComponents/AttachmentOption";
import DropdownButton from "../sharedComponents/DropdownButton";
import UIDivider from "../sharedComponents/UIDivider";
import UIMessage from "../sharedComponents/UIMessage";
import UIWrapper from "../sharedComponents/UIWrapper";
import UIContainer from "../sharedComponents/UIContainer";

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
  addCardAttachment,
  handleLoadingAttachment,
  mobile,
}) => {
  const [attachment, setAttachment] = useState(null);
  const [message, setMessage] = useState({ header: null, list: [] });

  const handleUpload = useCallback(
    (e) => {
      const file = e.target.files[0];
      const data = new FormData();
      data.append("image", file);

      const upload = async () => {
        handleLoadingAttachment(true);
        await requestUpload(data)
          .then((response) => {
            const { imgUrl, uploadDate, success, message } = response.data;
            if (!success) {
              handleLoadingAttachment(false);
              return setMessage({ ...message, header: message });
            }
            const imageData = { imgUrl, uploadDate, name: file.name };
            addCardAttachment(imageData);
            handleLoadingAttachment(false);
          })
          .catch((error) => setMessage({ ...message, header: error.message }));
      };
      upload();
    },
    [handleLoadingAttachment]
  );

  const handleChange = (e) => setAttachment(e.target.value);

  const handleAttachClick = () => {
    const url = isURL(attachment);
    if (!url) return setMessage({ ...message, header: "Invalid link!" });
    const allowedMedia = ["png", "jpg", "gif"];
    const imageType = attachment.split(".").pop();

    if (!allowedMedia.includes(imageType))
      setMessage({
        ...message,
        header: "Invalid image link!",
        list: ["At the moment only .png and .jpeg images are supported"],
      });
    const name = `link-attachment-${attachment.split("/").pop()}`;

    const imageData = {
      imgUrl: attachment,
      uploadDate: Date.now,
      name,
    };

    addCardAttachment(imageData, () => {
      setAttachment(null);
      resetForm("attachment-link");
    });
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
