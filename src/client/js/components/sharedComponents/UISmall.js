import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const StyledSmall = styled.small`
  cursor: pointer;
  bottom: ${({ bottom }) => bottom};
  margin: ${({ margin }) => margin};
  left: ${({ left }) => left};

  &:hover {
    text-decoration: underline;
  }
`;

const UISmall = ({
  children,
  handleClick,
  bottom = "10%",
  left = "13%",
  margin,
  dataTestId,
  className,
}) => {
  return (
    <StyledSmall
      className={className}
      data-test-id={dataTestId}
      bottom={bottom}
      left={left}
      onClick={handleClick}
      margin={margin}
    >
      {children}
    </StyledSmall>
  );
};

UISmall.propTypes = {
  bottom: PropTypes.string,
  children: PropTypes.element.isRequired,
  className: PropTypes.string,
  dataTestId: PropTypes.string,
  handleClick: PropTypes.func.isRequired,
  left: PropTypes.string,
  margin: PropTypes.string,
};

export default UISmall;
