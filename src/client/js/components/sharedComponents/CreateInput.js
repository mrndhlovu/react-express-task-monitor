import React, { Fragment } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import { X } from "react-feather";

import { Card, Button, TextArea } from "semantic-ui-react";
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
  createItemClickHandler,
  handleChange,
  placeholder,
  defaultValue,
  buttonText,
  id,
  hideIcon = false,
  width = "250px",
  fluid = false,
  positive = true,
}) => {
  return (
    <Fragment>
      <TextAreaWrapper width={width}>
        <StyledCardContent extra>
          <StyledInput
            id={id}
            autoFocus
            defaultValue={defaultValue}
            onChange={(e) => handleChange(e)}
            placeholder={placeholder}
          />
        </StyledCardContent>
      </TextAreaWrapper>
      <ButtonsWrapper>
        <Button
          positive={positive}
          size="tiny"
          content={buttonText}
          onClick={() => createItemClickHandler()}
          fluid={fluid}
        />
        {!hideIcon && (
          <UIWrapper>
            <X onClick={close} className="uiIconDark" />
          </UIWrapper>
        )}
      </ButtonsWrapper>
    </Fragment>
  );
};

CreateInput.propTypes = {
  close: PropTypes.func.isRequired,
  createItemClickHandler: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  defaultValue: PropTypes.string,
  buttonText: PropTypes.string,
  id: PropTypes.string,
  hideIcon: PropTypes.bool,
  width: PropTypes.string,
  fluid: PropTypes.bool,
  positive: PropTypes.bool,
};

export default CreateInput;
