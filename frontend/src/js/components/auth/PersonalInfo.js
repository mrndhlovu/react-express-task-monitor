import React, { useState } from "react";

import { Header, Button } from "semantic-ui-react";

import { useMainContext, useAuth } from "../../utils/hookUtils";
import UIDivider from "../shared/UIDivider";
import UIWrapper from "../shared/UIWrapper";
import UIFormInput from "../shared/UIFormInput";

const PersonalInfo = () => {
  const { alertUser, updateUserRequestHandler } = useMainContext();
  const { user } = useAuth();

  const [bio, setBio] = useState(null);
  const [loading, setLoading] = useState(false);
  const [username, setUserName] = useState(null);

  const saveClickHandler = () => {
    const body = {
      username: username ? username : user.username,
      bio: bio ? bio : user.bio,
    };
    updateUserRequestHandler(body, null, () => {
      setLoading(false);
      alertUser("Saved", true);
    });
  };

  return (
    <>
      <Header as="h3" content="Manage your personal information" />
      <Header as="h5" content="About" />
      <UIDivider />

      <form>
        <UIFormInput
          defaultValue={user && user.username}
          label="Username"
          placeholder="Username"
          onChange={(e) => setUserName(e.target.value)}
          input
        />
        <Header content="Bio" as="h5" />
        <UIFormInput
          defaultValue={user && user.bio}
          placeholder="Bio"
          onChange={(e) => setBio(e.target.value)}
          rows={5}
        />
        <UIWrapper padding="30px 0">
          <Button
            loading={loading}
            size="small"
            content="Done"
            fluid
            positive
            onClick={() => saveClickHandler()}
          />
        </UIWrapper>
      </form>
    </>
  );
};

export default PersonalInfo;
