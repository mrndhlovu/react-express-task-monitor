import React from "react";
import styled from "styled-components";

import { Modal } from "semantic-ui-react";

import AddCover from "./AddCover";
import UIContainer from "../sharedComponents/UIContainer";

const ButtonWrapper = styled.div`
  position: absolute;
  bottom: 0px;
  right: 5px;
`;

const CoverContainer = styled(Modal.Header)`
  background-color: #e2dfe4 !important;
  background-image: url(${(props) => props.cover}) !important;
  background-position: center center !important;
  background-repeat: no-repeat !important;
  background-size: contain !important;
  cursor: pointer !important;
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

const ModalImageCover = ({ cardCover, isLoading, ...props }) => {
  return isLoading ? (
    <UIContainer display={style}>Loading...</UIContainer>
  ) : (
    cardCover && (
      <CoverContainer cover={cardCover}>
        <ButtonWrapper>
          <AddCover
            upward={false}
            buttonSize="tiny"
            color="#00000014"
            {...props}
          />
        </ButtonWrapper>
      </CoverContainer>
    )
  );
};

export default ModalImageCover;
