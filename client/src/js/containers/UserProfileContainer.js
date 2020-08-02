import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import UserProfile from "../components/auth/UserProfile";
import { withRouter } from "react-router";
import { requestAuthLogin } from "../apis/apiRequests";
import { useAuth } from "../utils/hookUtils";
import { emptyFunction } from "../utils/appUtils";
import { parseUrl } from "../utils/urls";

const UserProfileContainer = ({ history }) => {
  const { auth, user } = useAuth();

  const [alertText, setAlertText] = useState("Login to access this page!");

  useEffect(() => {
    const { search } = history.location;

    if (!search) return emptyFunction();
    const urlData = parseUrl(search.slice(1));

    if (!urlData?.token) return emptyFunction;

    const loginUser = async () => {
      setAlertText("Logging in!");
      await requestAuthLogin({ email: urlData.email }, urlData.token)
        .then((res) => {
          setAlertText("Success!");
          auth.authListener(res.data, () => history.push("/"));
        })
        .catch(() => setAlertText("Login to access this page!"));
    };

    !user && loginUser();
  }, [history, auth, user]);

  return <UserProfile history={history} alertText={alertText} />;
};

UserProfileContainer.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }),
};

export default withRouter(UserProfileContainer);
