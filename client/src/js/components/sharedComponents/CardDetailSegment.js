import React from "react";
import styled from "styled-components";

const Container = styled.div`
  border-radius: 3px;
  letter-spacing: 1px;
  margin-top: 20px;
  padding: 10px;
  transition-duration: 300ms;
  transition-property: background;
  transition-timing-function: ease-in-out;
  &:hover {
    background-color: #091e820a;
  }
`;

const CardDetailSegment = ({ children }) => <Container>{children}</Container>;

export default CardDetailSegment;
