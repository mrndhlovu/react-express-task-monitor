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
import UIContainer from "../sharedComponents/UIContainer";

const style = {
  width: "800px",
  padding: 0,
};

const BoardMenu = ({
  handleChangeColorClick,
  handleDeleteBoard,
  showSideBar,
}) => {
  const { board, handleShowMenuClick, auth } = useContext(BoardContext);
  const { device, setShowMobileMenu } = useContext(MainContext);
  const [activities, setActivities] = useState(false);

  return (
    <UIContainer display={style}>
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
            isStarred={auth.data.data.starred.includes(board._id)}
          />
        )}

        <Menu.Item as="a" onClick={() => handleChangeColorClick()}>
          About this board
        </Menu.Item>

        <Menu.Item as="a" onClick={() => handleChangeColorClick()}>
          Change Background
        </Menu.Item>

        <UIDivider margin="0" />
        <div>
          <DropdownButton
            upward={true}
            icon="trash alternate"
            hasHeader={false}
            closeOnSelect={true}
            buttonText="Delete board"
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

        <ActivitiesHeader
          handleShowDetails={() => setActivities(!activities)}
        />

        {activities && (
          <Fragment>
            <Activities board={board} user={auth.data.data.fname} />
          </Fragment>
        )}
      </SideBarWrapper>
    </UIContainer>
  );
};

export default BoardMenu;
