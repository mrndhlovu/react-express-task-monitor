import React from "react";
import styled from "styled-components";

import { Dropdown } from "semantic-ui-react";
import EditableHeader from "../sharedComponents/EditableHeader";
import ListMenu from "./ListMenu";

const HeaderWrapper = styled.div`
  display: grid;
  grid-template-columns: 90% 10%;
  padding-bottom: 10px;
`;

const StyledDiv = styled.div`
  cursor: pointer;
`;

const StyledButton = styled(Dropdown)`
  background-color: #ffffff3d !important;
`;

const ListHeader = ({ title, position }) => {
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
        <StyledButton
          icon="ellipsis horizontal"
          floating
          button
          className="icon"
          size="tiny"
        >
          <Dropdown.Menu>
            <ListMenu listPosition={position} />
          </Dropdown.Menu>
        </StyledButton>
      </StyledDiv>
    </HeaderWrapper>
  );
};

export default ListHeader;
