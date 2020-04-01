import React, { useContext } from "react";
import styled from "styled-components";
import { MainContext } from "../../utils/contextUtils";

const Card = styled.div`
  position: absolute;
  top: ${props => (props.mobile ? "48%" : "40%")}!important;
  left: ${props => (props.mobile ? "27%" : "15%")}!important;
`;

const Wrapper = styled.div`
  background-color: #dce3eb;
  border-radius: 2px;
  cursor: pointer;
  height: 100px;
  opacity: 5;
  position: relative;
  width: ${props => (props.mobile ? "98%" : "200px")}!important;

  &:hover {
    background-color: #dce3db;
  }
`;

const CreateNewBoardHeader = styled.span`
  color: #8f99a9;
  font-family: "Noto Sans", sans-serif;
  font-size: 16px;

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
