import React from "react";
import { withRouter } from "react-router";
import PropTypes from "prop-types";

import UIButton from "./shared/UIButton";

const ErrorPage = ({ history }) => {
  return (
    <div className="error-page-wrap">
      <p>
        All is not lost! <br /> But the page you are looking for was not found!
      </p>

      <UIButton content="Back" onClick={() => history.goBack()} />
    </div>
  );
};

ErrorPage.propTypes = {
  history: PropTypes.shape({ goBack: PropTypes.func.isRequired }),
};

export default withRouter(ErrorPage);
