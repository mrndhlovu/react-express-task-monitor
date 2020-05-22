import React, { useState, useEffect } from "react";
import { withRouter } from "react-router";

import { Button, Header } from "semantic-ui-react";

import { emptyFunction, stringsEqual, resetForm } from "../../utils/appUtils";
import {
  requestUserUpdate,
  requestDeleteAccount,
} from "../../apis/apiRequests";
import { useAlert } from "../../utils/hookUtils";
import UIContainer from "../sharedComponents/UIContainer";
import UIDivider from "../sharedComponents/UIDivider";
import UIFormInput from "../sharedComponents/UIFormInput";
import UISmall from "../sharedComponents/UISmall";
import UIWrapper from "../sharedComponents/UIWrapper";

const AccountSettings = ({ history }) => {
  const { notify } = useAlert();
  const [credentials, setCredentials] = useState({
    password: null,
    confirmPassword: null,
  });
  const [deleteAccount, setDeleteAccount] = useState(false);
  const [passwordChanged, setPasswordConfirmed] = useState(false);
  const [save, setSave] = useState(false);
  const [showDeleteButton, setShowDeleteButton] = useState(false);

  const onHandleChange = (e) => {
    const { value, name } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!stringsEqual(credentials.password, credentials.confirmPassword))
      return notify({ message: "Passwords do not match" });
    setSave(true);
  };

  useEffect(() => {
    if (!deleteAccount) return emptyFunction();
    const closeAccount = async () => {
      await requestDeleteAccount()
        .then((res) => {
          setDeleteAccount(false);
          notify({
            message: res.data.message,
            success: true,
          });
          setTimeout(() => {
            window.location.reload();
          }, 1500);
        })
        .catch((error) => {
          setDeleteAccount(false);
          notify({ message: error.response.data.message });
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
          notify({
            message: "Password  updated",
            success: true,
            cb: () => {
              resetForm(["password-confirm-input", "confirm-password-input"]);
              setCredentials({ password: null, confirmPassword: null });
            },
          });
        })
        .catch((error) => {
          setSave(false);
          notify({ message: error.response.data.message });
        });
    };
    updatePassword();
  }, [save, credentials, history]);

  return (
    <UIContainer>
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
