import React from "react";
import styled from "styled-components";

const Span = styled.span`
  font-weight: 700;
  text-align: center;
`;

const StyledButton = styled.div`
  min-height: 32px;
  min-width: 32px;
  padding: 5px;
  background-color: #dce3eb;
  border-radius: 50px;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

const UserAvatar = ({ userInitials = "M" }) => (
  <StyledButton circular size="tiny">
    <Span>{userInitials}</Span>
  </StyledButton>
);

export default UserAvatar;
