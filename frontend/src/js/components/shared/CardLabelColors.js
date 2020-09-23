import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import { BG_COLORS } from "../../constants/constants";
import { Icon } from "semantic-ui-react";

const ColorsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
`;

const LabeColor = styled.div`
  padding: 2px;
  display: flex;
  align-items: center;
  justify-items: center;
`;

const Color = styled.div`
  background-color: ${(props) => props.color};
  border-radius: 2px;
  height: 30px;
  width: 200px;
  cursor: pointer;
  padding-right: 10px;
  display: flex;
  align-items: center;
  justify-content: flex-end;

  &:hover {
    opacity: 0.8;
    transition: visibility 0s, opacity 0.5s linear;
  }
`;

const Container = styled.div`
  padding: 10px 20px;
`;

const CardLabelColors = ({ handleColorClick, labels = [] }) => {
  return (
    <Container>
      <ColorsWrapper>
        {BG_COLORS.map((color) => (
          <LabeColor key={color}>
            <Color color={color} onClick={() => handleColorClick(color)}>
              {labels.includes(color) && (
                <Icon name="check" size="small" color="black" />
              )}
            </Color>
          </LabeColor>
        ))}
      </ColorsWrapper>
    </Container>
  );
};

CardLabelColors.propTypes = {
  handleColorClick: PropTypes.func.isRequired,
  labels: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default CardLabelColors;
