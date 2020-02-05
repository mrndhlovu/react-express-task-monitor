import React from "react";
import styled from "styled-components";

import NavHeader from "../components/navBar/NavHeader";

const Container = styled.div`
  background-color: ${props => props.bgColor};
  height: 100vh;
  padding-left: 5px;
`;

const bgColor = "#828c90";

const AppContainer = ({ children }) => {
  return (
    <Container bgColor={bgColor}>
      <NavHeader />
      {children}
    </Container>
  );
};

export default AppContainer;
