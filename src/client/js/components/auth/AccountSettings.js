import React, { useState } from "react";
import { withRouter } from "react-router";
import PropTypes from "prop-types";

import { Button, Header } from "semantic-ui-react";

import { stringsEqual, resetForm } from "../../utils/appUtils";
import { useAuth, useMainContext } from "../../utils/hookUtils";
import UIContainer from "../sharedComponents/UIContainer";
import UIDivider from "../sharedComponents/UIDivider";
import UIFormInput from "../sharedComponents/UIFormInput";
import UISmall from "../sharedComponents/UISmall";
import UIWrapper from "../sharedComponents/UIWrapper";

const AccountSettings = () => {
  const {
    alertUser,
    updateUserRequestHandler,
    deleteAccountRequestHandler,
  } = useMainContext();
  const { user } = useAuth();

  const [credentials, setCredentials] = useState({
    password: null,
    confirmPassword: null,
  });
  const [passwordChanged, setPasswordConfirmed] = useState(false);
  const [showDeleteButton, setShowDeleteButton] = useState(false);

  const onHandleChange = (e) => {
    const { value, name } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const updatePasswordHandler = async (e) => {
    e.preventDefault();
    if (!stringsEqual(credentials.password, credentials.confirmPassword))
      return alertUser("Passwords do not match");

    updateUserRequestHandler(credentials.confirmPassword, "password", () => {
      setPasswordConfirmed(true);
      alertUser("Password  updated", true, () => {
        resetForm(["password-confirm-input", "confirm-password-input"]);
        setCredentials({ password: null, confirmPassword: null });
      });
    });
  };

  return (
    <UIContainer>
      {user && !user.socialAuth.provider && (
        <>
          {!passwordChanged && <Header as="h3" content="Change Password" />}
          <form
            id="change-password-form"
            onSubmit={(e) => updatePasswordHandler(e)}
          >
            <UIFormInput
              id="password-confirm-input"
              autoFocus={true}
              placeholder="Password"
              type="password"
              name="password"
              onChange={(e) => onHandleChange(e)}
            />
            <UIFormInput
              id="confirm-password-input"
              placeholder="Confirm Password"
              type="password"
              name="confirmPassword"
              onChange={(e) => onHandleChange(e)}
            />
            <UIWrapper padding="10px 0">
              <Button
                disabled={!credentials.password || !credentials.confirmPassword}
                fluid
                positive
                content={passwordChanged ? "Done" : "Save"}
              />
            </UIWrapper>
          </form>
        </>
      )}

      <Header as="h3" content="Delete Account" />
      <UIDivider />
      <UIWrapper
        display={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
        }}
      >
        <UISmall
          position="relative"
          handleClick={() => setShowDeleteButton(!showDeleteButton)}
          content={!showDeleteButton ? "Delete Account" : "Cancel"}
        />

        {showDeleteButton && (
          <Button
            onClick={() => deleteAccountRequestHandler()}
            content="Yes delete my account."
            negative
            floated="right"
            size="tiny"
          />
        )}
      </UIWrapper>
    </UIContainer>
  );
};

AccountSettings.propTypes = {
  user: PropTypes.shape({
    socialAuth: PropTypes.shape({
      provider: PropTypes.oneOf(["google", "facebook"]),
    }),
  }),
};

export default withRouter(AccountSettings);
