import React, { useState, useEffect } from "react";

import { Header, Form, TextArea, Button } from "semantic-ui-react";

import { emptyFunction } from "../../utils/appUtils";
import { requestUserUpdate } from "../../apis/apiRequests";
import UIWrapper from "../sharedComponents/UIWrapper";
import UIMessage from "../sharedComponents/UIMessage";
import UIDivider from "../sharedComponents/UIDivider";

const initialMsgState = { success: false, error: false, text: null };

const PersonalInfo = ({ user }) => {
  const [bio, setBio] = useState(null);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState(initialMsgState);
  const [save, setSave] = useState(false);
  const [username, setUserName] = useState(null);

  useEffect(() => {
    if (!save) return emptyFunction();
    setLoading(true);
    const body = {
      username: username ? username : user.username,
      bio: bio ? bio : user.bio,
    };

    const saveChanges = async () => {
      await requestUserUpdate(body).then(() => {
        try {
          setLoading(false);
          setMsg({ ...msg, success: true, text: "Saved" });
        } catch (error) {
          setMsg({
            ...msg,
            error: true,
            text: "Failed to save please try again.",
          });
          setLoading(false);
        }
      });
    };

    saveChanges();
    setSave(false);
  }, [save, username, bio, requestUserUpdate, msg]);

  return (
    <>
      {msg.text && (
        <UIMessage
          success={msg.success}
          error={msg.error}
          list={[msg.text]}
          handleDismiss={() => setMsg(initialMsgState)}
          size="tiny"
        />
      )}
      <Header as="h3" content="Manage your personal information" />
      <Header as="h5" content="About" />
      <UIDivider />

      <Form>
        <Form.Field
          defaultValue={user && user.username}
          label="Username"
          control="input"
          placeholder="Username"
          onChange={(e) => setUserName(e.target.value)}
        />
        <Header content="Bio" as="h5" />
        <TextArea
          control="input"
          defaultValue={user && user.bio}
          placeholder="Bio"
          onChange={(e) => setBio(e.target.value)}
        />
        <UIWrapper padding="30px 0">
          <Button
            loading={loading}
            size="small"
            content={msg.success ? "Done" : "Save"}
            fluid
            positive
            onClick={() => setSave(true)}
          />
        </UIWrapper>
      </Form>
    </>
  );
};

export default PersonalInfo;
