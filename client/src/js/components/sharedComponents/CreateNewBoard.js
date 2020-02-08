import React, { useContext } from "react";
import styled from "styled-components";
import { DimensionContext } from "../../utils/contextUtils";

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

const Card = styled.div``;

const Wrapper = styled.div`
  max-width:   max-width: ${props => (props.mobile ? "50%" : "242px")};
  height: 100%;
  margin-right: 10px;
`;

const Header = styled.h5`
  color: #8f99a9;
`;

const CreateNewBoard = ({ showNewBoardModal }) => {
  const { mobile } = useContext(DimensionContext).device;

  return (
    <Wrapper mobile={mobile}>
      <Card mobile={mobile} color="grey" onClick={() => showNewBoardModal()}>
        <StyledCard>
          <Header>Create new board</Header>
        </StyledCard>
      </Card>
    </Wrapper>
  );
};

export default CreateNewBoard;
