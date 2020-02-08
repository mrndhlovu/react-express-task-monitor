import React, { useState } from "react";
import styled from "styled-components";

import NavHeader from "../components/navBar/NavHeader";
import SearchPage from "../components/search/SearchPage";
import { DimensionContext } from "../utils/contextUtils";
import { useDimensions } from "../utils/hookUtils";

const Container = styled.div`
  height: 100vh;
  background-color: #acb4bb;
`;

const AppContainer = ({ children }) => {
  const [search, setSearch] = useState(false);
  const { device, dimensions } = useDimensions();
  console.log("device: ", device);

  const handleSearchClick = e => {
    setSearch(e.target.value);
  };

  return (
    <DimensionContext.Provider
      value={{ dimensions, device, search, handleSearchClick }}
    >
      <Container>
        <NavHeader />
        {search && <SearchPage />}
        {children}
      </Container>
    </DimensionContext.Provider>
  );
};

export default AppContainer;
