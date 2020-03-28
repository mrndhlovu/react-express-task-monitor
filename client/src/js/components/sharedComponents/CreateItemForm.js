import React from "react";

import { Button, Input, Icon } from "semantic-ui-react";
import styled from "styled-components";

const StyledWrapper = styled.div`
  width: 272px;
`;

const Container = styled.div`
  width: 272px;
  min-height: 30px;
  background-color: #ffffff3d;
  align-content: center;
  display: grid;
  border-radius: 3px;
`;

const Span = styled.div`
  padding: 10px 0 10px 10px;
  color: #ffffff;
  cursor: pointer;
`;

const InputWrapper = styled.div`
  padding: 5px 5px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  padding-top: 5px;
  align-items: center;
`;

const IconWrapper = styled.span`
  color: #ffffff3d;
  cursor: pointer;
`;

const CreateItemForm = ({
  handleCreateClick,
  handleChange,
  buttonText,
  handleAddList,
  placeholder,
  showInputField,
  ctaText
}) => {
  return (
    <StyledWrapper>
      <Container>
        {!showInputField && (
          <Span onClick={() => handleAddList()}>
            <Icon name="add" />
            {ctaText}
          </Span>
        )}
        {showInputField && (
          <InputWrapper>
            <Input
              fluid
              placeholder={placeholder}
              onChange={e => handleChange(e)}
            />
            <ButtonWrapper>
              <Button
                positive
                size="tiny"
                onClick={() => handleCreateClick()}
                content={buttonText}
                floated="left"
              />
              <IconWrapper>
                <Icon
                  name="close"
                  size="large"
                  onClick={() => handleAddList()}
                  color="grey"
                />
              </IconWrapper>
            </ButtonWrapper>
          </InputWrapper>
        )}
      </Container>
    </StyledWrapper>
  );
};

export default CreateItemForm;
