import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { useMainContext } from "../../utils/hookUtils";

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

const CreateNewBoard = ({ openCreateBoardModalHandler }) => {
  const { mobile } = useMainContext().device;

  return (
    <Wrapper mobile={mobile} onClick={() => openCreateBoardModalHandler()}>
      <Card mobile={mobile} color="grey">
        <CreateNewBoardHeader />
      </Card>
    </Wrapper>
  );
};

CreateNewBoard.propTypes = {
  openCreateBoardModalHandler: PropTypes.func.isRequired,
};

export default CreateNewBoard;
