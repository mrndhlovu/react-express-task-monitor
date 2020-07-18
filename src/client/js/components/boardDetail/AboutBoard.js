import React, { useState } from "react";
import { withRouter } from "react-router";
import PropTypes from "prop-types";

import { Icon, Button } from "semantic-ui-react";

import { getUserInitials } from "../../utils/appUtils";
import { useAuth, useBoardContext } from "../../utils/hookUtils";
import SideBarWrapper from "../sharedComponents/SideBarWrapper";
import UIDivider from "../sharedComponents/UIDivider";
import UISmall from "../sharedComponents/UISmall";
import UIWrapper from "../sharedComponents/UIWrapper";
import UserAvatar from "../sharedComponents/UserAvatar";

const AboutBoard = ({ setShowAboutCard, showAboutCard, history }) => {
  const { user } = useAuth();
  const { board, boardUpdateHandler } = useBoardContext();

  const [description, setDescription] = useState(null);
  const [edit, setEdit] = useState(false);

  const handleSave = () => {
    board.description = description;

    boardUpdateHandler(board, "description");
    setEdit(false);
    setDescription(null);
  };

  return (
    <UIWrapper>
      <SideBarWrapper
        handleClose={setShowAboutCard}
        open={showAboutCard}
        header="About This Board"
        className="board-menu-sidebar"
      >
        <UIDivider margin="0" hidden={true} inverted={true} />
        <div>
          <Icon size="large" name="user outline" />
          <span className="board-creator">Made by</span>
        </div>
        <div className="board-creator-details">
          <UserAvatar
            padding="22px"
            userInitials={getUserInitials(user.fname)}
          />

          <div className="board-creator-small">
            <span>{user.fname}</span>
            <small>@{user.username}</small>
            <UISmall
              handleClick={() => history.push("/profile")}
              content=" Edit profile info"
            />
          </div>
        </div>
        <div>
          <div className="sidebar-board-description">
            <Icon name="list" />
            <span>Description</span>
          </div>
          <div className="ui-textarea-wrap">
            <textarea
              defaultValue={board.description}
              onChange={(e) => setDescription(e.target.value)}
              className="ui-textarea"
              onFocus={() => setEdit(!edit)}
              placeholder="Tell people what your board is about."
            />
            {edit && (
              <>
                <Button
                  positive
                  compact
                  content="Save"
                  onClick={() => handleSave()}
                />
                <Icon name="close" onClick={() => setEdit(!edit)} />
              </>
            )}
          </div>
        </div>
      </SideBarWrapper>
    </UIWrapper>
  );
};

AboutBoard.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  setShowAboutCard: PropTypes.func.isRequired,
  showAboutCard: PropTypes.bool.isRequired,
};

export default withRouter(AboutBoard);
