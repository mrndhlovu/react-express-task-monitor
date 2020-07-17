import React from "react";
import { withRouter } from "react-router";

import UIButton from "./sharedComponents/UIButton";

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

export default withRouter(ErrorPage);
