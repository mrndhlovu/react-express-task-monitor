import React, { useState } from "react";
import styled from "styled-components";

import List from "./List";

const ListWrapper = styled.div`
  min-width: 272px;
  vertical-align: top;
  white-space: nowrap;
  margin: 0px 4px;
  display: ${(props) => props.hover && props.dragging && "none"};
`;

const ListGrid = ({ lists, ...rest }) => {
  const [hover, setHover] = useState(null);

  return lists.map((list, index) => (
    <ListWrapper key={index} hover={hover && index === hover.index}>
      <List
        index={index}
        list={list}
        position={index + 1}
        setHover={setHover}
        {...rest}
      />
    </ListWrapper>
  ));
};

export default ListGrid;
