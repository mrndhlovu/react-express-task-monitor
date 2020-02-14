import React, { useContext } from "react";
import styled from "styled-components";

import { Header } from "semantic-ui-react";

import Summary from "./Summary";
import CreateNewBoard from "../sharedComponents/CreateNewBoard";
import { AppContext } from "../../utils/contextUtils";

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
  const { tablet, loading, handleBoardStarClick, mobile, boards } = useContext(
    AppContext
  );

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
                  key={board._id}
                  starred={board.category.includes("starred")}
                  id={board._id}
                />
              )
          )}

        {isDefault && <CreateNewBoard showNewBoardModal={showNewBoardModal} />}
      </Category>
    </>
  );
};

export default BoardCategory;
