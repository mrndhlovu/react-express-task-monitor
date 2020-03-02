import React from "react";
import styled from "styled-components";

import { Button } from "semantic-ui-react";

const ButtonWrapper = styled.div`
  position: absolute;
  bottom: 5px;
  right: 5px;
`;

const CloseIconWrapper = styled.div`
  position: absolute;
  top: 5px;
  right: 5px;
`;

const StyledIcon = styled(Button)`
  border-radius: 50px !important;
`;

const CoverContainer = styled.div`
  background-color: #7a7472;
  background-image: url(${props => props.cover});
  background-origin: content-box;
  background-position: center center;
  background-repeat: no-repeat;
  background-size: contain;
  box-sizing: border-box;
  cursor: pointer;
  height: 160px;
  position: relative;
  transition: opacity 85ms;
`;

const ModalImageCover = ({ cardCover, handleCardClick }) => {
  return (
    cardCover && (
      <CoverContainer cover={cardCover}>
        <CloseIconWrapper>
          <StyledIcon
            onClick={() => handleCardClick()}
            icon="delete"
            size="tiny"
          />
        </CloseIconWrapper>
        <ButtonWrapper>
          <Button content="Cover" icon="image" size="tiny" floated="right" />
        </ButtonWrapper>
      </CoverContainer>
    )
  );
};

export default ModalImageCover;
