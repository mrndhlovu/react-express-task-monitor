import React from "react";
import PropTypes from "prop-types";

import { useAuth } from "../../utils/hookUtils";
import TabPaneHeader from "./TabPaneHeader";
import TabProfileContent from "./TabProfileContent";
import UIContainer from "../shared/UIContainer";

const displayStyle = {
  height: "97vh",
  display: "flex",
  flexDirection: "column",
};

const UserProfile = ({ history, alertText }) => {
  const { user } = useAuth();

  return (
    <UIContainer padding="0" display={displayStyle}>
      <TabPaneHeader alertText={alertText} history={history} />
      {user && <TabProfileContent />}
    </UIContainer>
  );
};

UserProfile.propTypes = {
  alertText: PropTypes.string.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
    location: PropTypes.shape({ search: PropTypes.string }).isRequired,
  }).isRequired,
};

export default UserProfile;
