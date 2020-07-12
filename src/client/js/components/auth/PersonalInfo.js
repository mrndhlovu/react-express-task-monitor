import React, { useState, useEffect } from "react";

import { Header, Form, TextArea, Button } from "semantic-ui-react";

import { emptyFunction } from "../../utils/appUtils";
import { requestUserUpdate } from "../../apis/apiRequests";
import { useMainContext } from "../../utils/hookUtils";
import UIDivider from "../sharedComponents/UIDivider";
import UIWrapper from "../sharedComponents/UIWrapper";

const PersonalInfo = ({ user }) => {
  const { alertUser } = useMainContext();

  const [bio, setBio] = useState(null);
  const [loading, setLoading] = useState(false);
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
          alertUser("Saved", true);
        } catch (error) {
          alertUser("Failed to save changes please try again.");
          setLoading(false);
        }
      });
    };

    saveChanges();
    setSave(false);
  }, [save, username, bio, requestUserUpdate, alertUser]);

  return (
    <>
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
            content="Done"
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
