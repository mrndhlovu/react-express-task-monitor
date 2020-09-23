import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import { Icon } from "semantic-ui-react";

const StyledMenuButton = styled.span`
  color: #0079bf;
  align-items: center;
  background-color: transparent;
  box-shadow: none;
  font-weight: 500;
  text-decoration: none;
  &:after {
    content: '${(props) => props.content}';  
    margin-left: 5px
  }

`;

const Wrapper = styled.div`
  display: flex;
  min-height: 20px;
  cursor: pointer;
  overflow: hidden;
  padding: 6px 8px;
  border-radius: 3px;
  transition-property: background-color, border-color, box-shadow;
  transition-duration: 85ms;
  transition-timing-function: ease;
  text-align: left !important;
  background: ${({ active }) => active && " #e4f0f6"};
`;

const HomeSidebarButton = ({
  iconName,
  buttonText,
  onClick,
  active = true,
}) => {
  return (
    <Wrapper active={active} onClick={onClick}>
      <StyledMenuButton content={buttonText}>
        <Icon name={iconName} />
      </StyledMenuButton>
    </Wrapper>
  );
};

HomeSidebarButton.propTypes = {
  iconName: PropTypes.string.isRequired,
  buttonText: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  active: PropTypes.bool,
};

export default HomeSidebarButton;
