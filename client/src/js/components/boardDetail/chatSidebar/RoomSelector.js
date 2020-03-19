import React from "react";

import { Dropdown } from "semantic-ui-react";

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

const RoomSelector = ({ rooms = defaultRoom, handleSelectRoom }) => (
  <Dropdown
    placeholder="Select Room"
    fluid
    selection
    options={rooms}
    onChange={(e, { value }) => handleSelectRoom(e, value)}
  />
);

export default RoomSelector;
