import React from "react";
import styled from "styled-components";

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
}) => {
  return (
    <StyledSmall
      bottom={bottom}
      left={left}
      onClick={handleClick}
      margin={margin}
    >
      {children}
    </StyledSmall>
  );
};

export default UISmall;