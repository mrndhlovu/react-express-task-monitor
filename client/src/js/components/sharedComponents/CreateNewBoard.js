import React from "react";
import styled from "styled-components";

const StyledCard = styled.div`
  display: grid;
  justify-items: center;
  align-items: center;
  background-color: #dce3eb;
  cursor: pointer;
  border-radius: 5px;
  height: 111px;
  opacity: 5;

  &:hover {
    background-color: #dce3db;
  }
`;

const Card = styled.div`
  max-width: 242px;
  max-height: 100px;
`;

const Wrapper = styled.div`
  max-width: 250px;
  height: 100%;
`;

const Header = styled.h5`
  color: #8f99a9;
`;

const CreateNewBoard = ({ showNewBoardModal }) => {
  return (
    <Wrapper>
      <Card color="grey" onClick={() => showNewBoardModal()}>
        <StyledCard>
          <Header>Create new board</Header>
        </StyledCard>
      </Card>
    </Wrapper>
  );
};

export default CreateNewBoard;
