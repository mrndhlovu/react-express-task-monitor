import React from "react";
import styled from "styled-components";

import CardDetailHeader from "../sharedComponents/CardDetailHeader";

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  padding: 10px;
`;

const SubHeading = styled.div`
padding-left: 35px;
&:before {
    content: 'in list ';
  }
 &:after {
    text-decoration: underline;
    cursor: pointer;
    content: '${props => props.sourceTitle}';
  }
`;

const ModalHeader = ({ title, sourceTitle }) => {
  return (
    <Container>
      <CardDetailHeader
        icon="window maximize outline"
        description={title.toUpperCase()}
      />
      <SubHeading sourceTitle={` ${sourceTitle.toUpperCase()}`} />
    </Container>
  );
};

export default ModalHeader;
