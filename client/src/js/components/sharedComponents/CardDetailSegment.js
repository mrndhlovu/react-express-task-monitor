import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Container = styled.div`
  border-radius: 3px;
  letter-spacing: 1px;
  padding: 10px 8px;
  margin: 5px 0 10px 20px;
  transition-duration: 300ms;
  transition-property: background;
  transition-timing-function: ease-in-out;
  &:hover {
    background-color: #091e820a;
  }
`;

const CardDetailSegment = ({ children, className }) => (
  <Container className={className}>{children}</Container>
);

CardDetailSegment.propTypes = {
  className: PropTypes.string,
};

export default CardDetailSegment;
