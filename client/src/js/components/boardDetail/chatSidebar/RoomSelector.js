import React from "react";
import moment from "moment";
import styled from "styled-components";

import { Dropdown, Divider } from "semantic-ui-react";

const StyledDiv = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;
`;

const defaultRoom = [
  {
    key: "Main",
    text: "Main",
    value: "Main",
    icon: "home"
  },
  {
    key: "Board",
    text: "Board",
    value: "board",
    icon: "circle"
  }
];

const RoomSelector = ({
  rooms = defaultRoom,
  handleSelectRoom,
  onlineCount
}) => (
  <StyledDiv>
    <Divider
      horizontal
      inverted={true}
      content={
        <>
          {onlineCount === 0 ? (
            <span>{moment(Date.now()).format("LLL")}</span>
          ) : (
            <span> Online {onlineCount}</span>
          )}
        </>
      }
    />
    <Dropdown
      placeholder="Select Room"
      fluid
      selection
      options={rooms}
      onChange={(e, { value }) => handleSelectRoom(e, value)}
    />
  </StyledDiv>
);

export default RoomSelector;
