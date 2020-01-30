import React from "react";
import styled from "styled-components";

import { Input } from "semantic-ui-react";

const StyledDiv = styled.div`
  display: inline-block;
  justify-self: center;
  align-self: center;
`;

const StyledSearch = styled(Input)`
  border-radius: 5px !important;
  background-color: #ffffff3d !important;
`;

const SearchBar = ({ results, value }) => {
  return (
    <div>
      <StyledDiv>
        <StyledSearch
          icon="search"
          size="tiny"
          onChange={e => console.log(e.target.value)}
          results={results}
          value={value}
          placeholder="Search"
        />
      </StyledDiv>
    </div>
  );
};

export default SearchBar;
