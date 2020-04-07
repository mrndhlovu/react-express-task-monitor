import React from "react";
import styled from "styled-components";

const Span = styled.span`
  font-size: ${props => props.fontSize};
  text-align: ${props => props.alignText};
  margin: ${props => props.margin};
`;

const UIMessage = ({ children, alignText, fontSize, margin }) => {
  return (
    <Span fontSize={fontSize} alignText={alignText} margin={margin}>
      {children}
    </Span>
  );
};

export default UIMessage;
