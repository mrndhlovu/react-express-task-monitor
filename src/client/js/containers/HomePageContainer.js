import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";

import { HomepageContext } from "../utils/contextUtils";
import { useFetch, useAuth, useMainContext } from "../utils/hookUtils";
import HomePage from "../components/home/HomePage";
import UILoadingSpinner from "../components/sharedComponents/UILoadingSpinner";

const HomePageContainer = ({ history }) => {
  const { updateUserRequestHandler, navDataHandler } = useMainContext();
  const { user } = useAuth();

  const [boards, setBoards] = useState("");
  const [data, loading] = useFetch(history);

  const starBoardHandler = async (id, starRef) => {
    if (!starRef) return;

    if (user.starred.includes(id))
      user.starred.splice(user.starred.indexOf(id));
    else user.starred.push(id);

    updateUserRequestHandler([...user.starred], "starred");
  };

  useEffect(() => {
    if (!data) return;
    setBoards(data);
    navDataHandler(null, data);
  }, [data, navDataHandler]);

  return data && boards && !loading ? (
    <HomepageContext.Provider
      value={{
        boards,
        loading,
        starBoardHandler,
      }}
    >
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
