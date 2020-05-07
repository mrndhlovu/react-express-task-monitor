import React from "react";
import UserProfile from "../components/auth/UserProfile";
import { withRouter } from "react-router";

const UserProfileContainer = () => <UserProfile />;
export default withRouter(UserProfileContainer);
