import React, { useContext, useEffect } from "react";

import { AppContext } from "../utils/contextUtils";

import HomePage from "../components/home/HomePage";
import UILoadingSpinner from "../components/sharedComponents/UILoadingSpinner";

const HomePageContainer = () => {
  const { boards, getBoardDetail } = useContext(AppContext);

  useEffect(() => {
    getBoardDetail();
  }, [getBoardDetail]);

  return <>{!boards ? <UILoadingSpinner /> : <HomePage />}</>;
};

export default HomePageContainer;
