import React from "react";
import styled from "styled-components";

import { Card, Input, Button, Icon } from "semantic-ui-react";

const StyledCardContent = styled(Card.Content)`
  padding-top: 10px !important;
  background-color: inherit !important;
`;

const StyledInput = styled(Input)`
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
  buttonText
}) => {
  return (
    <>
      <TextAreaWrapper>
        <StyledCardContent extra>
          <StyledInput
            placeholder={placeholder}
            defaultValue={defaultValue}
            onChange={e => handleChange(e)}
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
