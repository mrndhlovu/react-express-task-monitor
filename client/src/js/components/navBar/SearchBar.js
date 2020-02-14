import React, { useContext } from "react";
import styled from "styled-components";

import { Input } from "semantic-ui-react";
import NavButton from "../sharedComponents/NavButton";
import { AppContext } from "../../utils/contextUtils";

const StyledSearch = styled(Input)`
  border-radius: 5px !important;
  background-color: #ffffff3d !important;
`;

const SearchBar = ({ handleSearchClick }) => {
  const { mobile } = useContext(AppContext).device;

  return mobile ? (
    <NavButton iconName="search" onClick={() => handleSearchClick} />
  ) : (
    <StyledSearch placeholder="Search..." icon="search" />
  );
};

export default SearchBar;
