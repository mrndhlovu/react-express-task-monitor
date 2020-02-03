import React from "react";
import styled from "styled-components";

import { Header, Icon } from "semantic-ui-react";

const StyledHeader = styled(Header)`
  font-size: 13px !important;
`;

const HeaderWrapper = styled.div`
  display: grid;
  grid-template-columns: 90% 10%;
  padding-bottom: 10px;
`;

const StyledDiv = styled.div`
  cursor: pointer;
`;

const ListHeader = ({ title, showListActions }) => {
  return (
    <HeaderWrapper>
      <StyledDiv>
        <StyledHeader content={title} />
      </StyledDiv>
      <StyledDiv>
        <Icon
          link
          name="ellipsis horizontal"
          color="grey"
          onClick={() => showListActions()}
        />
      </StyledDiv>
    </HeaderWrapper>
  );
};

export default ListHeader;
