import React, { Fragment } from "react";

import { Grid, Container, Header } from "semantic-ui-react";
import styled from "styled-components";
import CreateCard from "./CreateCard";
import CardItem from "./CardItem";

const StyledContainer = styled(Container)`
  max-width: 300px;
  min-height: 100px;
  background-color: #ebecf0 !important;
  padding-left: 10px;
  boarder-radius: 3px !important;
  position: relative;
  flex-direction: column;
`;

const StyledHeaderHeader = styled(Header)`
  padding-top: 5px !important;
`;

const Column = ({ name, columnHasCards, activeColumn, columnId, ...rest }) => {
  return (
    <Grid.Column>
      <StyledContainer>
        <StyledHeaderHeader size="tiny">{name}</StyledHeaderHeader>
        {columnHasCards && <CardItem {...rest} />}
        <CreateCard
          columnId={columnId}
          activeColumn={activeColumn === columnId}
          {...rest}
        />
      </StyledContainer>
    </Grid.Column>
  );
};

export default Column;
