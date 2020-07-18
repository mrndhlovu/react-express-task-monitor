import React from "react";
import PropTypes from "prop-types";

import { Target } from "react-feather";

const Logo = ({ history }) => (
  <div className="logo">
    <h2 onClick={() => history.push("/")}>
      <Target />
      <span>Task Monitor</span>
    </h2>
  </div>
);

Logo.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
};

export default Logo;
