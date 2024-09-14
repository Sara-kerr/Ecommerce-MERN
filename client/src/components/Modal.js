import React from "react";
import "../css/Modal.css"; 

function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        {children}
        <button onClick={onClose} className="modal-close-button">
          Close
        </button>
      </div>
    </div>
  );
}

export default Modal;
