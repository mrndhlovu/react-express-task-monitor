import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";

import { emptyFunction } from "../utils/appUtils";
import { HomepageContext } from "../utils/contextUtils";
import { requestUserUpdate } from "../apis/apiRequests";
import { useFetch, useAuth } from "../utils/hookUtils";
import HomePage from "../components/home/HomePage";
import UILoadingSpinner from "../components/sharedComponents/UILoadingSpinner";

const HomePageContainer = ({ history }) => {
  const [data, loading] = useFetch(history);
  const { user } = useAuth();

  const [boards, setBoards] = useState([]);
  const [starred, setStarred] = useState(false);
  const [unStarred, setUnStarred] = useState(false);

  const handleBoardStarClick = (id, starClicked) => {
    if (starClicked) {
      if (user.starred.includes(id)) {
        user.starred.splice(user.starred.indexOf(id));
        setUnStarred(true);
      } else {
        user.starred.push(id);
        setStarred(true);
      }
    }
  };

  useEffect(() => {
    if (!starred && !unStarred) return emptyFunction();

    const updateUser = async () => {
      await requestUserUpdate({ starred: user.starred });
    };

    user && updateUser();

    return () => {
      setStarred(false);
      setUnStarred(false);
    };
  }, [starred, user, unStarred]);

  useEffect(() => {
    if (!data) return;
    data && setBoards(data);
  }, [data]);

  return data && boards && !loading ? (
    <HomepageContext.Provider
      value={{
        boards,
        loading,
        handleBoardStarClick,
      }}
    >
      <HomePage history={history} />
    </HomepageContext.Provider>
  ) : (
    <UILoadingSpinner />
  );
};

export default withRouter(HomePageContainer);
