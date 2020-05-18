import React, { useContext } from "react";
import styled from "styled-components";

import { BoardContext, MainContext } from "../../utils/contextUtils";
import BoardHeaderButtons from "./BoardHeaderButtons";
import EditableHeader from "../sharedComponents/EditableHeader";

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
    <div className="board-header">
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
    </div>
  );
};

export default BoardHeader;
