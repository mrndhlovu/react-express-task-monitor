import React, { useContext } from "react";
import styled from "styled-components";

import RightBoardButtons from "../home/RightBoardButtons";
import LeftBoardButtons from "./LeftBoardButtons";
import { BoardContext, AppContext } from "../../utils/contextUtils";
import EditableHeader from "../sharedComponents/EditableHeader";

const HeaderContainer = styled.div`
  display: grid;
  grid-template-columns: ${props =>
    props.mobile ? "1fr" : props.tablet ? "15% 46% 39%" : "11% 37% 52%"};
  min-height: 40px;
  padding: 5px 2px 5px 2px;
  align-items: center;
`;

const TitleWrapper = styled.div`
  align-self: ${props => (props.mobile ? "center" : "start")};
  align-self: auto;
  display: flex;
  justify-content: start;
  padding-bottom: 10px;
  padding-left: 5px;
  padding-top: 6px;
`;

const BoardHeader = ({ handleShowMenuClick }) => {
  const { board } = useContext(BoardContext);
  const { mobile, tablet } = useContext(AppContext).device;

  return (
    <HeaderContainer mobile={mobile} tablet={tablet}>
      <TitleWrapper mobile={mobile} tablet={tablet}>
        <EditableHeader type="boardTitle" title={board.title} />
      </TitleWrapper>
      <LeftBoardButtons
        mobile={mobile}
        isStarred={board.category.includes("starred")}
      />
      <RightBoardButtons
        handleShowMenuClick={handleShowMenuClick}
        mobile={mobile}
      />
    </HeaderContainer>
  );
};

export default BoardHeader;
