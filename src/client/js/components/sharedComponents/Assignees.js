import React from "react";
import styled from "styled-components";

import { getUserInitials } from "../../utils/appUtils";
import { Label } from "semantic-ui-react";
import UserAvatar from "./UserAvatar";

const Wrapper = styled(Label.Group)`
  bottom: 3px;
  cursor: pointer;
  max-width: 50px;
  position: absolute;
  right: 5px;
`;

const Assignees = ({ assignees }) => {
  return (
    <Wrapper circular size="tiny">
      {assignees.map((assignee, index) => (
        <UserAvatar
          key={index}
          userInitials={getUserInitials(assignee.fname)}
        />
      ))}
    </Wrapper>
  );
};

export default Assignees;
