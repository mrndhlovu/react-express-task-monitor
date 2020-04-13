import React, { useEffect, useState, useContext } from "react";
import { withRouter } from "react-router-dom";

import { emptyFunction } from "../utils/appUtils";
import { HomepageContext, MainContext } from "../utils/contextUtils";
import { requestUserUpdate } from "../apis/apiRequests";
import { useFetch } from "../utils/hookUtils";
import HomePage from "../components/home/HomePage";
import UILoadingSpinner from "../components/sharedComponents/UILoadingSpinner";

const HomePageContainer = ({ history }) => {
  const { auth } = useContext(MainContext);
  const [data, loading] = useFetch(history);

  const [boards, setBoards] = useState([]);
  const [user, setUser] = useState(null);
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
    setUser(auth.user);
  }, [auth]);

  useEffect(() => {
    if (!starred && !unStarred) return emptyFunction();

    const upUserInfo = async () => {
      await requestUserUpdate({ starred: user.starred }).then((res) => {
        try {
        } catch (error) {
          alert(error.message);
        }
      });
    };

    upUserInfo();

    return () => {
      setStarred(false);
      setUnStarred(false);
    };
  }, [starred, user, unStarred]);

  useEffect(() => {
    if (!data) return;

    setBoards(data);
  }, [data]);

  return data && boards && !loading ? (
    <HomepageContext.Provider value={{ boards, loading, handleBoardStarClick }}>
      <HomePage />
    </HomepageContext.Provider>
  ) : (
    <UILoadingSpinner />
  );
};

export default withRouter(HomePageContainer);
