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
    const { email, token } = parseUrl(search.slice(1));

    if (!token) return emptyFunction;
    setAlertText("Loading!");

    const loginUser = async () => {
      await requestAuthLogin({ email }, token)
        .then((res) => {
          auth.authListener(res.data.data, history.push("/"));
        })
        .catch(() => {
          setAlertText("Login to access this page!");
        });
    };
    token && email && loginUser();
  }, [user, auth, history]);

  return <UserProfile history={history} alertText={alertText} />;
};

UserProfileContainer.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }),
};

export default withRouter(UserProfileContainer);
