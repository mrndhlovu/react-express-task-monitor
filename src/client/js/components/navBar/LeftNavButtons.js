import React from "react";
import styled from "styled-components";

import { useMainContext } from "../../utils/hookUtils";
import NavButton from "../sharedComponents/NavButton";
import DropdownButton from "../sharedComponents/DropdownButton";
import UIWrapper from "../sharedComponents/UIWrapper";
import NavBoardsCategory from "../sharedComponents/NavBoardsCategory";

const StyledDiv = styled.div`
  display: flex;
  padding-left: 3px;
  height: 36px;
`;

const LeftNavButtons = ({ history }) => {
  const { STARRED_BOARDS, PERSONAL_BOARDS, RECENT_BOARDS } = useMainContext();

  return (
    <StyledDiv>
      <NavButton iconName="home" redirect={() => history.push("/")} />
      <DropdownButton
        icon="columns"
        buttonText="Boards"
        closeOnSelect
        color="#ffffff3d"
        compact={false}
        hasHeader={false}
        direction="right"
        className="navBoardsButton"
      >
        <UIWrapper className="nav-boards-list">
          {/* <UIFormInput placeholder="Find boards by name" /> */}
          <NavBoardsCategory
            header="Starred Boards"
            boards={STARRED_BOARDS}
            starred
            history={history}
          />
          <NavBoardsCategory
            header="Recent Boards"
            boards={RECENT_BOARDS}
            history={history}
          />
          <NavBoardsCategory
            header="Personal Boards"
            boards={PERSONAL_BOARDS}
            history={history}
          />
        </UIWrapper>
      </DropdownButton>
    </StyledDiv>
  );
};

export default LeftNavButtons;
