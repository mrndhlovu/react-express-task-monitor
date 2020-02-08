import React, { useContext } from "react";
import styled from "styled-components";

import { Input } from "semantic-ui-react";
import NavButton from "./NavButton";
import { DimensionContext } from "../../utils/contextUtils";

const StyledSearch = styled(Input)`
  border-radius: 5px !important;
  background-color: #ffffff3d !important;
`;

const SearchBar = ({ results, value, handleSearchClick }) => {
  const { mobile } = useContext(DimensionContext).device;

  return mobile ? (
    <NavButton iconName="search" onClick={() => handleSearchClick} />
  ) : (
    <StyledSearch placeholder="Search..." icon="search" />
  );
};

export default SearchBar;
