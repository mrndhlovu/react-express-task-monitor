import React from "react";
import styled from "styled-components";

const Span = styled.span`
  font-weight: 700;
  text-align: center;
  font-size: ${(props) => props.fontSize};
`;

const StyledButton = styled.div`
  align-items: center;
  background-color: #dce3eb;
  border-radius: 50px;
  display: flex;
  justify-content: space-evenly;

  max-height: 20px;
  max-width: 18px;
  padding: ${(props) => props.padding};
`;

const UserAvatar = ({
  userInitials = "M",
  padding = "18px",
  fontSize,
  className,
}) => (
  <StyledButton className={className} padding={padding}>
    <Span fontSize={fontSize}>{userInitials}</Span>
  </StyledButton>
);

export default UserAvatar;
