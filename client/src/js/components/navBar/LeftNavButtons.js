import React from "react";
import styled from "styled-components";

import NavButton from "../sharedComponents/NavButton";
import SearchBar from "./SearchBar";

const StyledDiv = styled.div`
  display: flex;
  padding-left: 3px;
`;

const LeftNavButtons = ({ history, isLoading, results, value }) => {
  return (
    <StyledDiv>
      <NavButton iconName="home" redirect={() => history.push("/")} />

      <NavButton
        size="tiny"
        redirect={() => history.push("/boards")}
        iconName="columns"
        buttonText="Boards"
      />

      <SearchBar isLoading={isLoading} results={results} value={value} />
    </StyledDiv>
  );
};

export default LeftNavButtons;
