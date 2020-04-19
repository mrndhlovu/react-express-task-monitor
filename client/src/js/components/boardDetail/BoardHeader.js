import React, { useContext } from "react";
import styled from "styled-components";

import BoardHeaderButtons from "./BoardHeaderButtons";
import { BoardContext, MainContext } from "../../utils/contextUtils";
import EditableHeader from "../sharedComponents/EditableHeader";

const HeaderContainer = styled.div`
  align-items: ${(props) => (props.mobile ? "center" : "start")};
  display: grid;
  grid-template-columns: ${(props) => (props.mobile ? "1fr" : "1fr 1fr")};
  left: 2px;
  max-height: 40px;
  position: absolute;
  top: ${(props) => (props.mobile ? "6%" : "3.5%")};
  width: 100vw;
`;

const TitleWrapper = styled.div`
  align-self: auto;
  display: flex;
  justify-content: ${(props) => (props.mobile ? "center" : "start")};
  padding: 10px;
`;

const BoardHeader = ({ user }) => {
  const { board, handleShowMenuClick } = useContext(BoardContext);

  const { device } = useContext(MainContext);
  const { mobile } = device;

  return (
    <HeaderContainer mobile={mobile}>
      <TitleWrapper mobile={mobile}>
        <EditableHeader type="boardTitle" title={board.title} />
      </TitleWrapper>
      {user && (
        <BoardHeaderButtons
          mobile={mobile}
          isStarred={user.starred.includes(board._id)}
          handleShowMenuClick={handleShowMenuClick}
        />
      )}
    </HeaderContainer>
  );
};

export default BoardHeader;
