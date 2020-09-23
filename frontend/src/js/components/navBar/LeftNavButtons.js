import React from "react";
import styled from "styled-components";

import { useMainContext } from "../../utils/hookUtils";
import NavButton from "../shared/NavButton";
import DropdownButton from "../shared/DropdownButton";
import UIWrapper from "../shared/UIWrapper";
import NavBoardsCategory from "../shared/NavBoardsCategory";

const StyledDiv = styled.div`
  display: flex;
  padding-left: 3px;
  height: 36px;
`;

const LeftNavButtons = () => {
  const {
    STARRED_BOARDS,
    PERSONAL_BOARDS,
    RECENT_BOARDS,
    history,
  } = useMainContext();

  return (
    <StyledDiv>
      <NavButton
        buttonColor="black"
        iconName="home"
        redirect={() => history.push("/")}
        padding="10px"
      />
      <DropdownButton
        icon="columns"
        buttonText="Boards"
        closeOnSelect
        size="tiny"
        hasHeader={false}
        direction="right"
        className="navBoardsButton navButton"
      >
        <UIWrapper className="nav-boards-list">
          {/* <UIFormInput placeholder="Find boards by name" /> */}
          <NavBoardsCategory header="Starred" boards={STARRED_BOARDS} starred />
          <NavBoardsCategory header="Recent" boards={RECENT_BOARDS} />
          <NavBoardsCategory header="Personal" boards={PERSONAL_BOARDS} />
        </UIWrapper>
      </DropdownButton>
    </StyledDiv>
  );
};

export default LeftNavButtons;
