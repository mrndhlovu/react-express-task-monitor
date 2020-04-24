import React, { Fragment } from "react";
import styled from "styled-components";

import { Card, Button, Icon, TextArea } from "semantic-ui-react";

const StyledCardContent = styled(Card.Content)`
  padding-top: 10px !important;
  background-color: inherit !important;
`;

const StyledInput = styled(TextArea)`
  width: 100%;
  border-radius: 3px;
  padding: 5px;
`;

const TextAreaWrapper = styled.div`
  width: ${(props) => props.width};
  padding-bottom: 10px;
`;

const CreateInput = ({
  close,
  handleCreateClick,
  handleChange,
  placeholder,
  defaultValue,
  buttonText,
  id,
  width = "250px",
}) => {
  return (
    <Fragment>
      <TextAreaWrapper width={width}>
        <StyledCardContent extra>
          <StyledInput
            autoFocus
            defaultValue={defaultValue}
            id={id}
            onChange={(e) => handleChange(e)}
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
        <Icon name="close" onClick={close} link />
      </div>
    </Fragment>
  );
};

export default CreateInput;
