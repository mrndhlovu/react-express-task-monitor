import React, { useContext } from "react";
import styled from "styled-components";

import LeftBoardButtons from "./LeftBoardButtons";
import { BoardContext, MainContext } from "../../utils/contextUtils";
import EditableHeader from "../sharedComponents/EditableHeader";

const HeaderContainer = styled.div`
  align-items: ${props => (props.mobile ? "center" : "start")};
  display: grid;
  grid-template-columns: ${props => (props.mobile ? "1fr" : "1fr 1fr")};
  left: 2px;
  max-height: 40px;
  position: absolute;
  top: ${props => (props.mobile ? "6%" : "3.5%")};
  width: 100vw;
`;

const TitleWrapper = styled.div`
  justify-content: ${props => (props.mobile ? "center" : "start")};
  align-self: auto;
  display: flex;
  padding: 10px;
`;

const BoardHeader = () => {
  const { board, handleShowMenuClick } = useContext(BoardContext);
  const { device, auth } = useContext(MainContext);
  const { mobile } = device;

  return (
    <HeaderContainer mobile={mobile}>
      <TitleWrapper mobile={mobile}>
        <EditableHeader type="boardTitle" title={board.title} />
      </TitleWrapper>
      <LeftBoardButtons
        mobile={mobile}
        isStarred={auth.user.starred.includes(board._id)}
        handleShowMenuClick={handleShowMenuClick}
      />
    </HeaderContainer>
  );
};

export default BoardHeader;
