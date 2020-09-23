import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import { Dimmer, Loader } from "semantic-ui-react";

const Container = styled.div`
  align-items: center;
  display: grid;
  justify-items: center;
  min-height: 100vh;
  width: 100%;
  opacity: 0.4;
`;

const UILoadingSpinner = ({ inverted = true }) => (
  <Container>
    <Dimmer active inverted={inverted}>
      <Loader size="mini" content="Loading..." inverted={inverted} />
    </Dimmer>
  </Container>
);

UILoadingSpinner.propTypes = {
  inverted: PropTypes.bool,
};

export default UILoadingSpinner;
