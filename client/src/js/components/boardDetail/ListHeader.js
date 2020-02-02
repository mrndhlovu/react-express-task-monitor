import React from "react";
import styled from "styled-components";

import { Header, Icon } from "semantic-ui-react";

const StyledHeader = styled(Header)`
  font-size: 13px !important;
`;

const HeaderWrapper = styled.div`
  display: grid;
  grid-template-columns: 90% 10%;
  cursor: "pointer";
`;

const ListHeader = ({ title, showListActions }) => {
  return (
    <HeaderWrapper>
      <div>
        <StyledHeader content={title} />
      </div>
      <div>
        <Icon
          link
          name="ellipsis horizontal"
          color="grey"
          onClick={() => showListActions()}
        />
      </div>
    </HeaderWrapper>
  );
};

export default ListHeader;
