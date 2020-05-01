import React from "react";
import styled from "styled-components";

import { Divider } from "semantic-ui-react";

const StyledDivider = styled(Divider)`
  ${({ margin }) => margin}
`;

const UIDivider = ({
  margin = "5px",
  content,
  horizontal,
  vertical,
  hidden,
  inverted,
}) => (
  <StyledDivider
    margin={margin}
    content={content}
    horizontal={horizontal}
    vertical={vertical}
    hidden={hidden}
    inverted={inverted}
  />
);

export default UIDivider;
