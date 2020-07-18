import React from "react";
import PropTypes from "prop-types";

import { Target } from "react-feather";

const Logo = ({ history }) => (
  <div className="logo" onClick={() => history.push("/")}>
    <Target className="logoIcon" />
    <h2>Trello Clone</h2>
  </div>
);

Logo.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
};

export default Logo;
