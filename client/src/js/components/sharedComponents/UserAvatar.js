import React from "react";
import styled from "styled-components";

import { Button } from "semantic-ui-react";

const Span = styled.span`
  font-size: 15px;
  font-weight: 600;
`;

const StyledButton = styled(Button)`
  padding: 9px !important;
`;

const UserAvatar = ({ abbrNameInitials = "M" }) => (
  <StyledButton
    circular
    size="tiny"
    onClick={() => console.log("m")}
    content={<Span>{abbrNameInitials}</Span>}
  />
);

export default UserAvatar;
