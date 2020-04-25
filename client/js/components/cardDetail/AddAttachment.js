import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";

import { Divider, Input, Button, Message } from "semantic-ui-react";
import { isURL } from "validator";
import { requestUpload } from "../../apis/apiRequests";
import AttachmentOption from "../sharedComponents/AttachmentOption";
import DropdownButton from "../sharedComponents/DropdownButton";
import { emptyFunction } from "../../utils/appUtils";

const Container = styled.div`
  width: 100%;
`;

const FormWrapper = styled.div`
  padding: 15px;
`;

const ButtonWrapper = styled.div`
  padding-top: 10px;
`;

const StyleMessageWrapper = styled.div`
  padding: 10px;
`;

const StyledInput = styled.input`
  margin: 0;
  opacity: 0;
  padding: 0;
  cursor: pointer;
  width: 100%;
  margin-left: -68px;
`;

const StyledSmall = styled.small`
  padding-left: 3px;
`;

const AddAttachment = ({
  addCardAttachment,
  handleLoadingAttachment,
  mobile
}) => {
  const [attachment, setAttachment] = useState(null);
  const [error, setError] = useState(false);
  const [update, setUpdate] = useState(null);
  const [message, setMessage] = useState(null);

  const handleUpload = useCallback(
    e => {
      const file = e.target.files[0];
      const data = new FormData();
      data.append("image", file);

      const upload = async () => {
        handleLoadingAttachment(true);
        await requestUpload(data)
          .then(response => {
            const { imgUrl, uploadDate, success, message } = response.data;
            if (!success) {
              handleLoadingAttachment(false);
              return setMessage(message);
            }
            const uploadData = { imgUrl, uploadDate, name: file.name };
            setUpdate(uploadData);
            handleLoadingAttachment(false);
          })
          .catch(error => setMessage(error.message));
      };
      upload();
    },
    [handleLoadingAttachment]
  );

  useEffect(() => {
    if (!update) return emptyFunction();

    if (update) addCardAttachment(update);
    setUpdate(null);
  }, [update, addCardAttachment]);

  const handleChange = e => setAttachment(e.target.value);

  const handleAttachUrl = () => {
    const url = isURL(attachment);

    console.log("url: ", url);
    if (!url) return setError(!error);
  };

  return (
    <DropdownButton icon="attach" buttonText="Attachment" header="Attach From">
      <Container>
        {message && (
          <StyleMessageWrapper>
            <Message
              error
              size="tiny"
              onDismiss={() => {
                setMessage(false);
              }}
              content={message}
            />
          </StyleMessageWrapper>
        )}
        <AttachmentOption>
          <span>{mobile ? "Phone" : "Computer"}</span>
          <StyledInput type="file" onChange={e => handleUpload(e)} />
        </AttachmentOption>
        <AttachmentOption>
          <span>Google Drive</span>
        </AttachmentOption>
        <Divider />
        <FormWrapper>
          <StyledSmall>Attach a link</StyledSmall>

          <Input
            size="tiny"
            focus
            placeholder="Paste a link here..."
            onChange={e => handleChange(e)}
            fluid
          />

          {error && (
            <StyleMessageWrapper>
              <Message
                size="tiny"
                compact
                error
                content="Invalid url"
                onDismiss={() => setError(false)}
              />
            </StyleMessageWrapper>
          )}

          <ButtonWrapper>
            <Button
              content="Attach"
              size="tiny"
              onClick={() => handleAttachUrl()}
            />
          </ButtonWrapper>
        </FormWrapper>
      </Container>
    </DropdownButton>
  );
};

export default AddAttachment;