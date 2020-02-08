import React, { useContext } from "react";
import styled from "styled-components";

import { Header } from "semantic-ui-react";

import Summary from "./Summary";
import CreateNewBoard from "../sharedComponents/CreateNewBoard";
import { BoardContext } from "../../utils/contextUtils";
import UILoadingSpinner from "../sharedComponents/UILoadingSpinner";

const Section = styled.div`
  display: grid;
  grid-template-columns: repeat(
    auto-fill,
    ${props => (props.mobile ? "50%" : "242px")}
  );
  vertical-align: top;
`;

const StyledHeader = styled(Header)`
  font-size: 16px !important;
`;

const BoardSection = ({
  header,
  icon,
  isDefault,
  section,
  showNewBoardModal
}) => {
  const { boards, loading, handleBoardStarClick, mobile } = useContext(
    BoardContext
  );

  return (
    <>
      <StyledHeader icon={`${icon} outline`} content={header} />
      <Section mobile={mobile}>
        {!loading ? (
          boards.map(
            board =>
              board.section.includes(section) && (
                <Summary
                  key={board._id}
                  id={board._id}
                  header={board.title}
                  handleBoardStarClick={handleBoardStarClick}
                  starred={board.section.includes("starred")}
                  color={board.color}
                />
              )
          )
        ) : (
          <UILoadingSpinner />
        )}

        {isDefault && <CreateNewBoard showNewBoardModal={showNewBoardModal} />}
      </Section>
    </>
  );
};

export default BoardSection;
