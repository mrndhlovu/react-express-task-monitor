import React from "react";
import styled from "styled-components";

import { Card, Button, Icon, TextArea } from "semantic-ui-react";

const StyledCardContent = styled(Card.Content)`
  padding-top: 10px !important;
  background-color: inherit !important;
`;

const StyledInput = styled(TextArea)`
  width: 100%;
  border-radius: 3px;
`;

const TextAreaWrapper = styled.div`
  width: 100%;
  padding-bottom: 10px;
`;

const CreateInput = ({
  close,
  handleCreateClick,
  handleChange,
  placeholder,
  defaultValue,
  buttonText,
  id
}) => {
  return (
    <>
      <TextAreaWrapper>
        <StyledCardContent extra>
          <StyledInput
            autoFocus
            defaultValue={defaultValue}
            id={id}
            onChange={e => handleChange(e)}
            placeholder={placeholder}
          />
        </StyledCardContent>
      </TextAreaWrapper>
      <div>
        <Button
          positive
          size="tiny"
          content={buttonText}
          onClick={() => handleCreateClick()}
        />
        <Icon name="close" onClick={close} />
      </div>
    </>
  );
};

export default CreateInput;
