import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";

import { Menu, Button } from "semantic-ui-react";

import Activities from "../cardDetail/Activities";
import ActivitiesHeader from "../cardDetail/ActivitiesHeader";
import BoardHeaderButtons from "./BoardHeaderButtons";
import DropdownButton from "../sharedComponents/DropdownButton";
import SideBarWrapper from "../sharedComponents/SideBarWrapper";
import UIDivider from "../sharedComponents/UIDivider";
import UIWrapper from "../sharedComponents/UIWrapper";
import {
  useAuth,
  useMainContext,
  useBoardContext,
} from "../../utils/hookUtils";

const BoardMenu = ({
  handleMakeTemplate,
  setShowAboutCard,
  showSideBar,
  toggleChangeBg,
}) => {
  const { board, handleShowMenuClick, handleDeleteBoard } = useBoardContext();
  const { user } = useAuth();
  const { device } = useMainContext();
  const [activities, setActivities] = useState(false);

  return (
    <SideBarWrapper
      handleClose={handleShowMenuClick}
      open={showSideBar}
      header={board.title}
      className="board-menu-sidebar"
    >
      <UIDivider margin="0" hidden={true} />

      {device.mobile && (
        <BoardHeaderButtons
          mobile={device.mobile}
          isStarred={user.starred.includes(board._id)}
        />
      )}

      <Menu.Item as="a" onClick={setShowAboutCard}>
        About this board
      </Menu.Item>

      <Menu.Item as="a" onClick={() => toggleChangeBg()}>
        Change Background
      </Menu.Item>

      {!board.isTemplate && (
        <Menu.Item as="a" onClick={() => handleMakeTemplate()}>
          Make Template
        </Menu.Item>
      )}

      <Menu.Item as="a">
        <ActivitiesHeader
          handleShowDetails={() => setActivities(!activities)}
          hideButton={activities}
        />
        <div className="sidebar-activities-wrap">
          {activities && (
            <Fragment>
              <Activities board={board} user={user.fname} />
            </Fragment>
          )}
        </div>
      </Menu.Item>

      <div className="board-delete-button-wrap">
        <UIDivider />
        <DropdownButton
          upward={true}
          icon="trash alternate"
          hasHeader={false}
          closeOnSelect={true}
          buttonText="Delete board"
          compact={false}
          floated="right"
        >
          <UIWrapper>
            <Button
              negative
              content="Delete"
              compact
              fluid
              onClick={() => handleDeleteBoard()}
            />
          </UIWrapper>
        </DropdownButton>
      </div>
    </SideBarWrapper>
  );
};

BoardMenu.propTypes = {
  handleMakeTemplate: PropTypes.func.isRequired,
  setShowAboutCard: PropTypes.func.isRequired,
  showSideBar: PropTypes.bool.isRequired,
  toggleChangeBg: PropTypes.func.isRequired,
};

export default BoardMenu;
