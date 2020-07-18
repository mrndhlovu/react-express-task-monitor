import React, { useContext } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import { Input } from "semantic-ui-react";
import NavButton from "../sharedComponents/NavButton";
import { MainContext } from "../../utils/contextUtils";

const StyledSearchInput = styled(Input)`
  border-radius: 3px !important;
  background-color: #ffffff3d !important;
  max-height: 34px;
`;

const SearchBar = ({ handleSearchClick }) => {
  const { mobile } = useContext(MainContext).device;

  return mobile ? (
    <NavButton iconName="search" onClick={() => handleSearchClick} />
  ) : (
    <StyledSearchInput placeholder="Search..." icon="search" />
  );
};

SearchBar.propTypes = {
  handleSearchClick: PropTypes.func.isRequired,
};

export default SearchBar;
