import React from "react";
import PropTypes from "prop-types";

import HomeSidebarButton from "../shared/HomeSidebarButton";
import UIContainer from "../shared/UIContainer";

const HomeSideMenu = ({ history, className, callback }) => {
  return (
    <UIContainer className={className}>
      <HomeSidebarButton
        onClick={() => {
          history.push("/templates");
          callback();
        }}
        buttonText="Templates"
        iconName="object ungroup outline"
      />
    </UIContainer>
  );
};

HomeSideMenu.defaultProps = {
  callback: () => {},
};

HomeSideMenu.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
  className: PropTypes.string,
  callback: PropTypes.func.isRequired,
};

export default HomeSideMenu;
