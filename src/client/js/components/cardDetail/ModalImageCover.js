import React from "react";
import styled from "styled-components";

import AddCover from "./AddCover";
import UIContainer from "../sharedComponents/UIContainer";
import { useCardDetailContext } from "../../utils/hookUtils";

const ButtonWrapper = styled.div`
  position: absolute;
  bottom: 0px;
  right: 5px;
`;

const CoverContainer = styled.div`
  background-color: #e2dfe4 !important;
  background-image: url(${({ cover }) => cover}) !important;
  background-position: center center !important;
  background-repeat: no-repeat !important;
  background-size: contain !important;
  height: 160px;
  position: relative;
  transition: opacity 85ms !important;
  transition-duration: 600ms !important;
`;

const style = {
  backgroundColor: "#e2dfe4 !important",
  height: "160px",
  position: "relative",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const ModalImageCover = () => {
  const { isLoading, card } = useCardDetailContext();
  return isLoading ? (
    <UIContainer display={style}>Loading...</UIContainer>
  ) : (
    card.cardCover && (
      <CoverContainer className="modal-cover" cover={card.cardCover}>
        <ButtonWrapper>
          <AddCover upward={false} buttonSize="tiny" color="#00000014" />
        </ButtonWrapper>
      </CoverContainer>
    )
  );
};

export default ModalImageCover;
