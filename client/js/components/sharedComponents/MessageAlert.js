import React from "react";
import styled from "styled-components";

const showMessage = { opacity: 1, display: "block" };

const hideMessage = {
  display: "none",
  transition: "opacity 2s ease-out",
  opacity: 0
};

const MessageContainer = styled.div`
  ${props => (props.open ? { ...showMessage } : { ...hideMessage })};
  align-items: center;
  background-color: ${props => (props.error ? "#d65454" : "#1ebc30")};
  border-radius: 3px;
  color: #fff;
  font-size:12px;
  font-weight: 700;
  justify-content: space-around;
  margin-bottom: 10px;
  max-width: 342px;
  min-width: 342px;
  padding: 6px 6px 8px 15px ;
  position: relative;
  &:before {
      letter-spacing: 1px;
      content: '${props => props.message}';
  }
`;

const StyledSmall = styled.p`
  ${props => (props.open ? { ...showMessage } : { ...hideMessage })};
  position: absolute;
  right: 6px;
  top: 6px;
  cursor: pointer;
  color: #000000f2;

  &:hover {
    color: #000000de;
    transition-duration: 200ms;
    transition-timing-function: ease-in-out;
  }
`;

const MessageAlert = ({ message, close, open, error }) => {
  return (
    <MessageContainer message={message} open={open} error={error}>
      <StyledSmall open={open} onClick={() => close()}>
        close
      </StyledSmall>
    </MessageContainer>
  );
};

export default MessageAlert;
