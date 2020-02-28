import React from "react";
import styled from "styled-components";

const Container = styled.div`
  padding: 10px;
  cursor: pointer;
  border-radius: 2px;
  transition-duration: 250ms;
  transition-property: background-color;
  overflow: hidden;
  width: 100%;

  &:hover {
    background-color: #e0e1e2;
  }
`;

const AttachmentOption = ({ children }) => {
  return <Container>{children}</Container>;
};

export default AttachmentOption;
