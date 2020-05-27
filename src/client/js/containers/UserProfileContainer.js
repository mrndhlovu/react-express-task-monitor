import React from "react";
import UserProfile from "../components/auth/UserProfile";
import { withRouter } from "react-router";

const UserProfileContainer = ({ history }) => <UserProfile history={history} />;
export default withRouter(UserProfileContainer);
