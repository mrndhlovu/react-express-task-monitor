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
  const { boards, loading } = useContext(BoardContext);

  return (
    <>
      <Header icon={`${icon} outline`} as="h5" content={header} />
      <Section>
        {!loading &&
          boards.map(
            key =>
              key.section === section && (
                <Summary key={key._id} id={key._id} header={key.title} />
              )
          )}

        {isDefault && <CreateNewBoard showNewBoardModal={showNewBoardModal} />}
      </Section>
    </>
  );
};

export default BoardSection;
