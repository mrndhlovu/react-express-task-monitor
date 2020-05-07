import React from "react";
import styled from "styled-components";

const Container = styled.div`
  padding: ${(props) => props.padding};
  width: ${(props) => props.width};
  ${(props) => props.display};

  ${({ nested }) =>
    nested &&
    `
    ${nested.element} {${nested.style}}`}
`;

const UIContainer = ({
  children,
  padding = "10px",
  width = "100%",
  display,
  className,
  nested,
}) => {
  return (
    <Container
      nested={nested}
      className={className}
      padding={padding}
      width={width}
      display={display}
    >
      {children}
    </Container>
  );
};

export default UIContainer;
