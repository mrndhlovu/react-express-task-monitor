import React from "react";
import { Dimmer, Loader } from "semantic-ui-react";

const UILoadingSpinner = ({ inverted = true }) => (
  <Dimmer active inverted={inverted}>
    <Loader size="mini" content="Loading..." inverted={inverted} />
  </Dimmer>
);

export default UILoadingSpinner;
