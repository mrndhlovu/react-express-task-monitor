import React from "react";
import UISmall from "./sharedComponents/UISmall";
import { withRouter } from "react-router";

const ErrorPage = ({ history }) => {
  return (
    <div className="error-page">
      <p>
        All is not lost! <br /> But the page you are looking for was not found!
      </p>
      <UISmall handleClick={() => history.goBack()}>Click here to back</UISmall>
    </div>
  );
};

export default withRouter(ErrorPage);
