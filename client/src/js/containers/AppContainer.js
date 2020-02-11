import React, { useState } from "react";
import styled from "styled-components";

import NavHeader from "../components/navBar/NavHeader";
import SearchPage from "../components/search/SearchPage";
import { DimensionContext } from "../utils/contextUtils";
import { useDimensions } from "../utils/hookUtils";

const Container = styled.div`
  height: 100vh;
  background-color: transparent;
  font-family: roboto, sans-serif;
`;

const AppContainer = ({ children }) => {
  const [search, setSearch] = useState(false);
  const [color, setColor] = useState(null);
  const { device, dimensions } = useDimensions();

  const handleSearchClick = e => {
    setSearch(e.target.value);
  };

  const getNavBgColor = bgColor => {
    setColor(bgColor);
  };

  return (
    <DimensionContext.Provider
      value={{ dimensions, device, search, handleSearchClick, getNavBgColor }}
    >
      <Container>
        <NavHeader color={color} />
        {search && <SearchPage />}
        {children}
      </Container>
    </DimensionContext.Provider>
  );
};

export default AppContainer;
