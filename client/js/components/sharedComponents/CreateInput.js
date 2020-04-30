import React, { Fragment } from "react";
import styled from "styled-components";

import { Card, Button, Icon, TextArea } from "semantic-ui-react";
import UIWrapper from "./UIWrapper";

const StyledCardContent = styled(Card.Content)`
  padding-top: 10px !important;
  background-color: inherit !important;
`;

const StyledInput = styled(TextArea)`
  width: 100%;
  border-radius: 3px;
  padding: 5px;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  align-items: center;
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
  hideIcon = false,
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
      <ButtonsWrapper>
        <Button
          positive
          size="tiny"
          content={buttonText}
          onClick={() => handleCreateClick()}
        />
        {!hideIcon && (
          <UIWrapper>
            <Icon name="close" size="large" onClick={close} link />
          </UIWrapper>
        )}
      </ButtonsWrapper>
    </Fragment>
  );
};

export default CreateInput;
