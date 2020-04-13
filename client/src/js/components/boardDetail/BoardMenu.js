import React, { useContext, useState } from "react";
import styled from "styled-components";

import { BoardContext, MainContext } from "../../utils/contextUtils";
import { Menu, Divider, Button } from "semantic-ui-react";
import Activities from "../cardDetail/Activities";
import ActivitiesHeader from "../cardDetail/ActivitiesHeader";
import SideBarWrapper from "../sharedComponents/SideBarWrapper";
import BoardHeaderButtons from "./BoardHeaderButtons";
import DropdownButton from "../sharedComponents/DropdownButton";
import UIWrapper from "../sharedComponents/UIWrapper";

const Wrapper = styled.div`
  width: 800px;
`;

const SideBarFooter = styled.div`
  position: absolute;
  bottom: 8px;
  width: 90%;
`;

const BoardMenu = ({
  handleChangeColorClick,
  handleDeleteBoard,
  showSideBar,
}) => {
  const { board, handleShowMenuClick } = useContext(BoardContext);
  const { auth, device, setShowMobileMenu } = useContext(MainContext);
  const [activities, setActivities] = useState(false);

  return (
    <Wrapper>
      <SideBarWrapper
        handleClose={device.mobile ? setShowMobileMenu : handleShowMenuClick}
        open={showSideBar}
        header={board.title}
        className="board-menu-sidebar"
      >
        <Divider hidden />

        {device.mobile && (
          <BoardHeaderButtons
            mobile={device.mobile}
            isStarred={auth.user.starred.includes(board._id)}
          />
        )}

        <Menu.Item as="a" onClick={() => handleChangeColorClick()}>
          About this board
        </Menu.Item>

        <Menu.Item as="a" onClick={() => handleChangeColorClick()}>
          Change Background
        </Menu.Item>

        <Divider />
        <ActivitiesHeader
          handleShowDetails={() => setActivities(!activities)}
        />

        {activities && (
          <>
            <Divider />
            <Activities board={board} user={auth.user.fname} />
          </>
        )}
        <SideBarFooter>
          <Divider />

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
        </SideBarFooter>
      </SideBarWrapper>
    </Wrapper>
  );
};

export default BoardMenu;
