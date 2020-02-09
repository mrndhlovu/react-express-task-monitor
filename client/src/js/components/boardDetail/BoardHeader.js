import React, { useContext } from "react";
import styled from "styled-components";

import RightBoardButtons from "../home/RightBoardButtons";
import LeftBoardButtons from "../home/LeftBoardButtons";
import { BoardContext, DimensionContext } from "../../utils/contextUtils";
import { Header } from "semantic-ui-react";

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
  display: ${props => props.mobile && "flex"};
  justify-content: ${props => props.mobile && "space-around"};
  padding-bottom: 10px;
  padding-top: 6px;
  padding-left: 5px;
`;

const BoardTitle = styled(Header)`
  font-size: 13px !important;
`;

const BoardHeader = ({ handleShowMenuClick }) => {
  const { board } = useContext(BoardContext);
  const { mobile, tablet } = useContext(DimensionContext).device;

  return (
    <HeaderContainer mobile={mobile} tablet={tablet}>
      <TitleWrapper mobile={mobile} tablet={tablet}>
        <BoardTitle content={board.title} />
      </TitleWrapper>
      <LeftBoardButtons
        mobile={mobile}
        color={board.section.includes("starred")}
        id={board._id}
      />
      <RightBoardButtons
        handleShowMenuClick={handleShowMenuClick}
        mobile={mobile}
      />
    </HeaderContainer>
  );
};

export default BoardHeader;
