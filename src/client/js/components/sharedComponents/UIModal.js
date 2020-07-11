import React from "react";
import styled from "styled-components";

import Modal from "react-modal";

import { X } from "react-feather";

const IconContainer = styled.div`
  position: absolute;
  top: 8px;
  right: 8px;
  background: white;
  z-index: 10;
  padding: 8px;
  display: flex;
  justify-content: center;
  align-items: baseline;
  border-radius: 50px;
`;

const UIModal = ({
  children,
  isOpen,
  onClose,
  closeIcon = false,
  modalStyle,
}) => {
  return (
    isOpen && (
      <Modal
        style={{ content: modalStyle }}
        isOpen={isOpen}
        onRequestClose={onClose}
        shouldCloseOnOverlayClick={false}
      >
        {closeIcon && (
          <IconContainer>
            <X onClick={onClose} />
          </IconContainer>
        )}
        {children}
      </Modal>
    )
  );
};

export default UIModal;
