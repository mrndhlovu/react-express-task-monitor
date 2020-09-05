import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Container = styled.div`
  padding: 10px;
  cursor: pointer;
  border-radius: 2px;
  transition-duration: 250ms !important;
  transition-property: background-color;
  overflow: hidden;
  width: 100%;

  &:hover {
    background-color: #e0e1e2;
  }
`;

const AttachmentOption = ({ children }) => <Container>{children}</Container>;

AttachmentOption.propTypes = {
  children: PropTypes.element.isRequired,
};

export default AttachmentOption;
