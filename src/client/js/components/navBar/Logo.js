import React from "react";

import { Icon } from "semantic-ui-react";

const Logo = ({ history }) => (
  <div className="logo-text">
    <h2 onClick={() => history.push("/")}>
      <Icon name="bullseye" />
      <span>Task Monitor</span>
    </h2>
  </div>
);

export default Logo;
