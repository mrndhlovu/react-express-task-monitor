import React from "react";
import styled from "styled-components";

import { Modal } from "semantic-ui-react";
import CardDetailSegment from "../sharedComponents/CardDetailSegment";

import AddCover from "./AddCover";

const ButtonWrapper = styled.div`
  position: absolute;
  bottom: 0px;
  right: 5px;
`;

const CoverContainer = styled(Modal.Header)`
  background-color: #e2dfe4 !important;
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

const ModalImageCover = ({ cardCover, isLoading, ...props }) => {
  return isLoading ? (
    <CardDetailSegment>Loading...</CardDetailSegment>
  ) : (
    cardCover && (
      <CoverContainer cover={cardCover}>
        <ButtonWrapper>
          <AddCover buttonSize="tiny" color="#00000014" {...props} />
        </ButtonWrapper>
      </CoverContainer>
    )
  );
};

export default ModalImageCover;
