import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import { Button } from "semantic-ui-react";
import { X, Plus } from "react-feather";

import UIFormInput from "../shared/UIFormInput";

const StyledWrapper = styled.div`
  min-width: 272px;
`;

const Container = styled.div`
  width: 100%;
  min-height: 30px;
  background-color: #ffffff3d;
  align-content: center;
  border-radius: 3px;
  display: flex;
`;

const Span = styled.div`
  padding: 10px 0 10px 10px;
  color: #ffffff;
  cursor: pointer;
  display: flex;
  align-items: center;
`;

const InputWrapper = styled.div`
  padding: 5px;
  width: 100%;
  min-width: 272px;
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
  createItemClickHandler,
  handleChange,
  buttonText,
  handleAddList,
  placeholder,
  showInputField,
  defaultValue,
  ctaText,
  color = "grey",
}) => {
  return (
    <StyledWrapper>
      <Container>
        {!showInputField && (
          <Span onClick={() => handleAddList()}>
            <Plus />
            {ctaText}
          </Span>
        )}
        {showInputField && (
          <InputWrapper>
            <UIFormInput
              autoFocus
              id="create-item-form"
              placeholder={placeholder}
              onChange={(e) => handleChange(e)}
              defaultValue={defaultValue}
              onKeyDown={(e) =>
                e.key === "Enter" ? createItemClickHandler() : null
              }
            />
            <ButtonWrapper>
              <Button
                positive
                size="tiny"
                onClick={() => createItemClickHandler()}
                content={buttonText}
                floated="left"
              />
              <IconWrapper>
                <X onClick={() => handleAddList()} color={color} />
              </IconWrapper>
            </ButtonWrapper>
          </InputWrapper>
        )}
      </Container>
    </StyledWrapper>
  );
};

CreateItemForm.propTypes = {
  createItemClickHandler: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  buttonText: PropTypes.string,
  handleAddList: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  showInputField: PropTypes.bool,
  defaultValue: PropTypes.string,
  ctaText: PropTypes.string,
  color: PropTypes.string,
};

export default CreateItemForm;
