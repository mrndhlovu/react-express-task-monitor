import React from "react";
import { Dimmer, Loader } from "semantic-ui-react";
import styled from "styled-components";

const Container = styled.div`
  align-items: center;
  display: grid;
  justify-items: center;
  min-height: 100vh;
  width: 100%;
  opacity: 0.5;
`;

const UILoadingSpinner = () => {
  return (
    <Container>
      <Dimmer active inverted>
        <Loader inverted size="mini" content="Loading..." />
      </Dimmer>
    </Container>
  );
};

export default UILoadingSpinner;
