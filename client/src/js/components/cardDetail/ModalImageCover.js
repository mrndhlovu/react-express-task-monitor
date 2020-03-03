import React from "react";
import styled from "styled-components";

import { Button, Modal } from "semantic-ui-react";
import CardDetailSegment from "../sharedComponents/CardDetailSegment";

const ButtonWrapper = styled.div`
  position: absolute;
  bottom: 5px;
  right: 5px;
`;

const CoverContainer = styled(Modal.Header)`
  background-color: #7a7472 !important;
  background-image: url(${props => props.cover}) !important;
  background-position: center center !important;
  background-repeat: no-repeat !important;
  background-size: contain !important;
  cursor: pointer !important;
  height: 160px;
  position: relative;
  transition: opacity 85ms !important;
  transition-duration: 600ms !important;
`;

const ModalImageCover = ({ cardCover, isLoading }) => {
  return isLoading ? (
    <CardDetailSegment>Loading...</CardDetailSegment>
  ) : (
    cardCover && (
      <CoverContainer cover={cardCover}>
        <ButtonWrapper>
          <Button content="Cover" icon="image" size="tiny" floated="right" />
        </ButtonWrapper>
      </CoverContainer>
    )
  );
};

export default ModalImageCover;
