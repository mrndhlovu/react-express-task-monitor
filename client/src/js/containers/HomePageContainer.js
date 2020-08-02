import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";

import { HomepageContext } from "../utils/contextUtils";
import { useAuth, useMainContext } from "../utils/hookUtils";
import HomePage from "../components/home/HomePage";
import UILoadingSpinner from "../components/sharedComponents/UILoadingSpinner";

const HomePageContainer = ({ history }) => {
  const { updateUserRequestHandler, boards, setActiveBoard } = useMainContext();
  const { user } = useAuth();

  const starBoardHandler = async (id, starRef) => {
    if (!starRef) return;

    if (user.starred.includes(id))
      user.starred.splice(user.starred.indexOf(id));
    else user.starred.push(id);

    updateUserRequestHandler([...user.starred], "starred");
  };

  useEffect(() => {
    setActiveBoard(undefined);
  }, [setActiveBoard]);

  return boards ? (
    <HomepageContext.Provider value={{ starBoardHandler }}>
      <HomePage history={history} />
    </HomepageContext.Provider>
  ) : (
    <UILoadingSpinner />
  );
};

HomePageContainer.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }),
};

export default withRouter(HomePageContainer);
