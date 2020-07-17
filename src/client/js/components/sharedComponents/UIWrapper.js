import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Container = styled.div`
  padding: ${(props) => props.padding}px;
  ${(props) => props.display};
`;
const UIWrapper = ({
  children,
  className,
  dataTestId,
  display,
  handleClick,
  id,
  padding = "10",
}) => {
  return (
    <Container
      className={className}
      dataTestId={dataTestId}
      display={display}
      id={id}
      onClick={handleClick}
      padding={padding}
    >
      {children}
    </Container>
  );
};

UIWrapper.propTypes = {
  className: PropTypes.string,
  dataTestId: PropTypes.string,
  display: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  handleClick: PropTypes.func,
  id: PropTypes.string,
  padding: PropTypes.string,
};

export default UIWrapper;
