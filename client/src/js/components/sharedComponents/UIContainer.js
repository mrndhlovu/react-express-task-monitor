import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

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
  dataTestId,
}) => {
  return (
    <Container
      data-test-id={dataTestId}
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

UIContainer.propTypes = {
  className: PropTypes.string,
  dataTestId: PropTypes.string,
  display: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  nested: PropTypes.object,
  padding: PropTypes.string,
  width: PropTypes.string,
};

export default UIContainer;
