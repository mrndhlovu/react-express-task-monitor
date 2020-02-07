import React, { useContext } from "react";
import styled from "styled-components";

import { Header } from "semantic-ui-react";

import Summary from "./Summary";
import CreateNewBoard from "../sharedComponents/CreateNewBoard";
import { BoardContext } from "../../utils/contextUtils";

const Section = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 250px);
  vertical-align: top;
`;

const BoardSection = ({
  header,
  icon,
  isDefault,
  section,
  showNewBoardModal
}) => {
  const { boards, loading, handleBoardStarClick } = useContext(BoardContext);

  return (
    <>
      <Header icon={`${icon} outline`} as="h5" content={header} />
      <Section>
        {!loading &&
          boards.map(
            board =>
              board.section.includes(section) && (
                <Summary
                  key={board._id}
                  id={board._id}
                  header={board.title}
                  handleBoardStarClick={handleBoardStarClick}
                  starred={board.section.includes("starred")}
                />
              )
          )}

        {isDefault && <CreateNewBoard showNewBoardModal={showNewBoardModal} />}
      </Section>
    </>
  );
};

export default BoardSection;
