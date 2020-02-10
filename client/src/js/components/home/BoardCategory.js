import React, { useContext } from "react";
import styled from "styled-components";

import { Header } from "semantic-ui-react";

import Summary from "./Summary";
import CreateNewBoard from "../sharedComponents/CreateNewBoard";
import { BoardListContext } from "../../utils/contextUtils";

const Category = styled.div`
  display: grid;
  grid-template-columns: repeat(
    auto-fill,
    ${props => (props.mobile ? "50%" : props.tablet ? "33.33333%" : "25%")}
  );
  vertical-align: top;
`;

const StyledHeader = styled(Header)`
  font-size: 16px !important;
`;

const BoardCategory = ({
  header,
  icon,
  isDefault,
  category,
  showNewBoardModal
}) => {
  const {
    boards,
    tablet,
    loading,
    handleBoardStarClick,
    mobile,
    starRef,
    starredRef
  } = useContext(BoardListContext);

  return (
    <>
      <StyledHeader icon={`${icon} outline`} content={mobile && header} />
      <Category mobile={mobile} tablet={tablet}>
        {!loading &&
          boards.map(
            board =>
              board.category.includes(category) && (
                <Summary
                  color={board.styleProperties.color}
                  handleBoardStarClick={handleBoardStarClick}
                  header={board.title}
                  id={board._id}
                  key={board._id}
                  starred={board.category.includes("starred")}
                  starredRef={starredRef}
                  starRef={starRef}
                />
              )
          )}

        {isDefault && <CreateNewBoard showNewBoardModal={showNewBoardModal} />}
      </Category>
    </>
  );
};

export default BoardCategory;
