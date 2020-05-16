import React, { useState, useEffect } from "react";
import { withRouter } from "react-router";
import _debounce from "debounce";

import { Button, Header } from "semantic-ui-react";

import { emptyFunction, stringsEqual, resetForm } from "../../utils/appUtils";
import {
  requestUserUpdate,
  requestDeleteAccount,
} from "../../apis/apiRequests";
import UIContainer from "../sharedComponents/UIContainer";
import UIFormInput from "../sharedComponents/UIFormInput";
import UIMessage from "../sharedComponents/UIMessage";
import UIWrapper from "../sharedComponents/UIWrapper";
import UIDivider from "../sharedComponents/UIDivider";
import UISmall from "../sharedComponents/UISmall";

const AccountSettings = ({ history }) => {
  const [credentials, setCredentials] = useState({
    password: null,
    confirmPassword: null,
  });
  const [deleteAccount, setDeleteAccount] = useState(false);
  const [message, setMessage] = useState({ text: null, success: null });
  const [passwordChanged, setPasswordConfirmed] = useState(false);
  const [save, setSave] = useState(false);
  const [showDeleteButton, setShowDeleteButton] = useState(false);

  const onHandleChange = (e) => {
    const { value, name } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const clearError = () => {
    setMessage({ ...message, text: null, success: null });
    setPasswordConfirmed(false);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!stringsEqual(credentials.password, credentials.confirmPassword))
      return setMessage({
        ...message,
        text: "Passwords do not match",
        success: false,
      });
    setSave(true);
  };

  useEffect(() => {
    if (!deleteAccount) return emptyFunction();
    const closeAccount = async () => {
      await requestDeleteAccount()
        .then((res) => {
          setDeleteAccount(false);
          setMessage({
            ...message,
            text: res.data.message,
            success: false,
          });
          _debounce(window.location.reload(), 3000);
        })
        .catch((error) => {
          setDeleteAccount(false);

          setMessage({
            ...message,
            text: error.response.data.message,
            success: false,
          });
        });
    };

    closeAccount();
  }, [deleteAccount]);

  useEffect(() => {
    if (!save) return emptyFunction();

    const updatePassword = async () => {
      const body = { password: credentials.confirmPassword };

      await requestUserUpdate(body)
        .then(() => {
          setSave(false);
          setPasswordConfirmed(true);
          setMessage({ ...message, text: "Password  updated", success: true });
          setCredentials({ password: null, confirmPassword: null });
          resetForm(["password-confirm-input", "confirm-password-input"]);
        })
        .catch((error) => {
          setSave(false);
          setMessage({
            ...message,
            text: error.response.data.message,
            success: false,
          });
        });
    };
    updatePassword();
  }, [save, credentials, history]);

  return (
    <UIContainer>
      {message.text && (
        <UIMessage
          success={message.success}
          error={!message.success}
          list={[message.text]}
          handleDismiss={() => clearError()}
        />
      )}
      {!passwordChanged && <Header as="h3" content="Change Password" />}
      <form id="change-password-form" onSubmit={(e) => handleSave(e)}>
        <UIFormInput
          id="password-confirm-input"
          autoFocus={true}
          placeholder="Email"
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
            loading={save}
            disabled={
              (!credentials.password || !credentials.confirmPassword) && !save
            }
            fluid
            positive
            content={passwordChanged ? "Done" : "Save"}
          />
        </UIWrapper>
      </form>

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
        >
          {!showDeleteButton ? "Delete Account" : "Cancel"}
        </UISmall>
        {showDeleteButton && (
          <Button
            onClick={() => setDeleteAccount(true)}
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

export default withRouter(AccountSettings);
