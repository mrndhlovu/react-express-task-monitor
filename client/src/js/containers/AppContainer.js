import React from "react";
import styled from "styled-components";

import NavHeader from "../components/navBar/NavHeader";

const Container = styled.div`
  height: 100vh;
  padding-left: 5px;
  background-color: #acb4bb;
`;

const AppContainer = ({ children }) => {
  return (
    <Container>
      <NavHeader />
      {children}
    </Container>
  );
};

export default AppContainer;
