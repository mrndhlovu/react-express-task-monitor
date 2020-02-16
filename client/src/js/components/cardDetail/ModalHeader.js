import React from "react";
import styled from "styled-components";

import { Header } from "semantic-ui-react";

const Container = styled.div`
  position: relative;
  display: flex;
`;

const CardHeader = styled.div`
  position: absolute;
  top: 30px;
  left: 3%;

  &:after {
    content: '${props => props.title}';
  }
`;

const StyledHeader = styled(Header)`
  font-size: 16px !important;
`;

const SubHeading = styled.div`
margin-left: 30%;

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
      <CardHeader>
        <StyledHeader content={title} icon="window maximize outline" />
        {sourceTitle && <SubHeading sourceTitle={` ${sourceTitle}`} />}
      </CardHeader>
    </Container>
  );
};

export default ModalHeader;
