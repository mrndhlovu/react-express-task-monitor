import React from "react";
import styled from "styled-components";

const StyledContainer = styled.div`
  min-width: 240px;
`;

const StyledMenuButton = styled.li`
  background-color: #e4f0f6;
  color: #0079bf;
  align-items: center;
  background-color: transparent;
  border-radius: 4px;
  box-shadow: none;
  display: flex;
  font-weight: 700;
  margin: 0;
  min-height: 20px;
  overflow: hidden;
  padding: 6px 8px 6px 8px;
  text-decoration: none;
  transition-property: background-color, border-color, box-shadow;
  transition-duration: 85ms;
  transition-timing-function: ease;
  margin-bottom: 4px;
  cursor: pointer;

  &:hover {
    background-color: #e4f0f6;
    color: #091e42;
  }
`;

const HomeSideBar = () => {
  return (
    <StyledContainer>
      <StyledMenuButton>Boards</StyledMenuButton>
      <StyledMenuButton>Templates</StyledMenuButton>
      <StyledMenuButton>Home</StyledMenuButton>
    </StyledContainer>
  );
};

export default HomeSideBar;
