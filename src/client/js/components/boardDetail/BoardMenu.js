import React, { useContext, useState, Fragment } from "react";

import { Menu, Button } from "semantic-ui-react";

import { BoardContext, MainContext } from "../../utils/contextUtils";
import Activities from "../cardDetail/Activities";
import ActivitiesHeader from "../cardDetail/ActivitiesHeader";
import BoardHeaderButtons from "./BoardHeaderButtons";
import DropdownButton from "../sharedComponents/DropdownButton";
import SideBarWrapper from "../sharedComponents/SideBarWrapper";
import UIDivider from "../sharedComponents/UIDivider";
import UIWrapper from "../sharedComponents/UIWrapper";
import { useAuth } from "../../utils/hookUtils";

const BoardMenu = ({
  toggleChangeBg,
  handleDeleteBoard,
  showSideBar,
  setShowAboutCard,
}) => {
  const { board, handleShowMenuClick } = useContext(BoardContext);
  const { user } = useAuth();
  const { device, setShowMobileMenu } = useContext(MainContext);
  const [activities, setActivities] = useState(false);

  return (
    <SideBarWrapper
      handleClose={device.mobile ? setShowMobileMenu : handleShowMenuClick}
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

      <Menu.Item as="a">
        <ActivitiesHeader
          handleShowDetails={() => setActivities(!activities)}
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

export default BoardMenu;
