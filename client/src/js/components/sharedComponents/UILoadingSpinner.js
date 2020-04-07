import React from "react";
import { Dimmer, Loader } from "semantic-ui-react";
import styled from "styled-components";

const Container = styled.div`
  align-items: center;
  display: grid;
  justify-items: center;
  min-height: 100%;
  width: 100%;
  opacity: 0.4;
`;

const UILoadingSpinner = ({ inverted = true }) => {
  return (
    <Container>
      <Dimmer active inverted={inverted}>
        <Loader inverted={inverted} size="mini" content="Loading..." />
      </Dimmer>
    </Container>
  );
};

export default UILoadingSpinner;
