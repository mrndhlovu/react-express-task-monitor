import React from "react";
import styled from "styled-components";

import { Icon } from "semantic-ui-react";

const StyledMenuButton = styled.span`
  color: #0079bf;
  align-items: center;
  background-color: transparent;
  box-shadow: none;
  font-weight: 500;
  text-decoration: none;
  &:after {
    content: '${props => props.content}';  
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
  margin-bottom: 10px;
  transition-property: background-color, border-color, box-shadow;
  transition-duration: 85ms;
  transition-timing-function: ease;
  text-align: left !important;

  &:hover {
    background-color: #e4f0f6;
    color: #091e42;
  }
`;

const HomeSidebarButton = ({ iconName, buttonText, onClick }) => {
  return (
    <Wrapper>
      <StyledMenuButton content={buttonText} onClick={onClick}>
        <Icon name={iconName} />
      </StyledMenuButton>
    </Wrapper>
  );
};

export default HomeSidebarButton;
