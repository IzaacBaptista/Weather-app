import React from "react";
import Modal from "react-modal";

Modal.setAppElement("#root");

function CustomModal({ isOpen, onClose, message }) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="custom-modal"
      overlayClassName="custom-modal-overlay"
    >
      <div className="modal-content">
        <h2 className="modal-title">Sucesso!</h2>
        <p className="modal-message">{message}</p>
        <button className="modal-close-button" onClick={onClose}>
          Fechar
        </button>
      </div>
    </Modal>
  );
}

export default CustomModal;
