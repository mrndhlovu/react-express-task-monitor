import React from "react";
import { Label } from "semantic-ui-react";

const UserLabel = () => {
  return (
    <Label
      as="a"
      circular
      size="large"
      color="grey"
      onClick={() => console.log("m")}
    >
      M
    </Label>
  );
};

export default UserLabel;
