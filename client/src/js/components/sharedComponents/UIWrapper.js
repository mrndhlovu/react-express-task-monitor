import React from "react";
import styled from "styled-components";

const Container = styled.div`
  padding: ${props => props.padding}px;
  ${props => props.display};
`;
const UIWrapper = ({ padding = "10", display, children }) => {
  return (
    <Container padding={padding} display={display}>
      {children}
    </Container>
  );
};

export default UIWrapper;