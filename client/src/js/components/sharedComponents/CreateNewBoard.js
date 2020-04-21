import React, { useContext } from "react";
import styled from "styled-components";
import { MainContext } from "../../utils/contextUtils";

const Card = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  display: flex;
  margin: 5px;
  min-height: 100px;
  background-color: #dce3eb;
  border-radius: 2px;
  cursor: pointer;
  opacity: 5;
  position: relative;

  &:hover {
    background-color: #dce3db;
  }
`;

const CreateNewBoardHeader = styled.span`
  color: #8f99a9;
  font-family: "Noto Sans", sans-serif;
  text-align: center;

  &:before {
    content: "Create new board";
  }
`;

const CreateNewBoard = ({ showNewBoardModal }) => {
  const { mobile } = useContext(MainContext).device;

  return (
    <Wrapper mobile={mobile} onClick={() => showNewBoardModal()}>
      <Card mobile={mobile} color="grey">
        <CreateNewBoardHeader />
      </Card>
    </Wrapper>
  );
};

export default CreateNewBoard;
