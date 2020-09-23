import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

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

UIDivider.propTypes = {
  content: PropTypes.string,
  hidden: PropTypes.bool,
  horizontal: PropTypes.bool,
  inverted: PropTypes.bool,
  margin: PropTypes.string,
  vertical: PropTypes.bool,
};

export default UIDivider;
