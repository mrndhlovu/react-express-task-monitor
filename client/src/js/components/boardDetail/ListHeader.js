import React from "react";
import styled from "styled-components";

import { Icon } from "semantic-ui-react";
import EditableHeader from "../sharedComponents/EditableHeader";

const HeaderWrapper = styled.div`
  display: grid;
  grid-template-columns: 90% 10%;
  padding-bottom: 10px;
`;

const StyledDiv = styled.div`
  cursor: pointer;
`;

const ListHeader = ({ title, showListActions, position }) => {
  return (
    <HeaderWrapper>
      <StyledDiv>
        <EditableHeader
          type="listHeader"
          title={title}
          listPosition={position}
        />
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
