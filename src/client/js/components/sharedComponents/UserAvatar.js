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
  justify-content: space-around;
  max-height: 15px;
  max-width: 15px;
  padding: ${(props) => props.padding};

  &:after: {
    content: '${(props) => props.userInitials}';
  }
`;

const UserAvatar = ({ userInitials = "M", padding = "17px", fontSize }) => (
  <StyledButton padding={padding}>
    <Span fontSize={fontSize}>{userInitials}</Span>
  </StyledButton>
);

export default UserAvatar;
