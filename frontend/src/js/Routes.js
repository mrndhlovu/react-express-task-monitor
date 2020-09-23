import React, { Suspense, lazy } from "react";
import { Route, Switch } from "react-router-dom";

import UILoadingSpinner from "./components/shared/UILoadingSpinner";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import ErrorPage from "./components/ErrorPage";

const UserProfileContainer = lazy(() =>
  import("./containers/UserProfileContainer")
);
const EmailRecoveryContainer = lazy(() =>
  import("./containers/EmailRecoveryContainer")
);
const ResetPasswordContainer = lazy(() =>
  import("./containers/ResetPasswordContainer")
);
const LoginContainer = lazy(() => import("./containers/LoginContainer"));

const HomePageContainer = lazy(() => import("./containers/HomePageContainer"));
const SignupContainer = lazy(() => import("./containers/SignupContainer"));
const BoardContainer = lazy(() => import("./containers/BoardContainer"));
const TemplatesContainer = lazy(() =>
  import("./containers/TemplatesContainer")
);

const Routes = () => {
  return (
    <Suspense fallback={<UILoadingSpinner />}>
      <Switch>
        <ProtectedRoute exact path="/" component={HomePageContainer} />
        <ProtectedRoute path="/boards/id/:id" component={BoardContainer} />
        <Route
          path="/profile"
          render={(props) => <UserProfileContainer {...props} />}
        />

        <ProtectedRoute path="/templates" component={TemplatesContainer} />

        <Route
          path="/login"
          render={(props) => <LoginContainer {...props} />}
        />

        <Route
          path="/recovery"
          render={(props) => <EmailRecoveryContainer {...props} />}
        />

        <Route
          path="/reset-password"
          render={(props) => <ResetPasswordContainer {...props} />}
        />

        <Route
          path="/signup"
          render={(props) => <SignupContainer {...props} />}
        />

        <Route component={ErrorPage} />
      </Switch>
    </Suspense>
  );
};

export default Routes;
