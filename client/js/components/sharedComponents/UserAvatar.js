import React from "react";
import styled from "styled-components";

const Span = styled.span`

  &:after: {
  font-weight: 700;
  text-align: center;
  font-size: 10px;
    content: '${(props) => props.userInitials}';
  }
`;

const StyledButton = styled.div`
  align-items: center;
  background-color: #dce3eb;
  border-radius: 50px;
  display: flex;
  justify-content: space-around;
  max-height: 15px;
  max-width: 15px;
  padding: 14px;

  &:after: {
    content: '${(props) => props.userInitials}';
  }
`;

const UserAvatar = ({ userInitials = "M" }) => (
  <StyledButton>
    <Span>{userInitials}</Span>
  </StyledButton>
);

export default UserAvatar;
