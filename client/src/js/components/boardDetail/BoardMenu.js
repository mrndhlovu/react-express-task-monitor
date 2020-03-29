import React, { useContext, useState } from "react";
import styled from "styled-components";

import { BoardContext, AppContext } from "../../utils/contextUtils";
import { Menu, Divider } from "semantic-ui-react";
import Activities from "../cardDetail/Activities";
import ActivitiesHeader from "../cardDetail/ActivitiesHeader";
import SideBarWrapper from "../sharedComponents/SideBarWrapper";

const Wrapper = styled.div`
  width: 800px;
`;

const BoardMenu = ({
  handleChangeColorClick,
  handleDeleteBoard,
  showSideBar
}) => {
  const { board, handleShowMenuClick } = useContext(BoardContext);
  const { user } = useContext(AppContext).auth;
  const [activities, setActivities] = useState(false);

  return (
    <Wrapper>
      <SideBarWrapper handleClose={handleShowMenuClick} open={showSideBar}>
        <Divider hidden />

        <Menu.Item as="a" onClick={() => handleChangeColorClick()}>
          Change Background
        </Menu.Item>
        <Menu.Item as="a" onClick={() => handleDeleteBoard()}>
          Delete board
        </Menu.Item>

        <ActivitiesHeader
          handleShowDetails={() => setActivities(!activities)}
        />

        {activities && (
          <>
            <Divider />
            <Activities board={board} user={user.fname} />
          </>
        )}
      </SideBarWrapper>
    </Wrapper>
  );
};

export default BoardMenu;
