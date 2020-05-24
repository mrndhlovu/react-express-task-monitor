import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";

import { HomepageContext } from "../utils/contextUtils";
import { requestUserUpdate } from "../apis/apiRequests";
import { useFetch, useAuth } from "../utils/hookUtils";
import HomePage from "../components/home/HomePage";
import UILoadingSpinner from "../components/sharedComponents/UILoadingSpinner";

const HomePageContainer = ({ history }) => {
  const [data, loading] = useFetch(history);
  const [boards, setBoards] = useState([]);
  const [user, setUser] = useState(useAuth().user);

  const handleBoardStarClick = async (id, starRef) => {
    if (!starRef) return;
    if (user.starred.includes(id))
      user.starred.splice(user.starred.indexOf(id));
    else user.starred.push(id);

    await requestUserUpdate({ starred: [...user.starred] }, id).then((res) => {
      setUser(res.data);
    });
  };

  useEffect(() => {
    if (!data) return;
    data && setBoards(data);
  }, [data]);

  return data && boards && !loading ? (
    <HomepageContext.Provider
      value={{
        user,
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
