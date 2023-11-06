import React from "react";
import "../css/modal.css";

function Modal({ setOpenModal, confirmAction }) {
  const handleContinue = () => {
    confirmAction();
    setOpenModal(false);
  };

  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button
            onClick={() => {
              setOpenModal(false);
            }}
          >
            X
          </button>
        </div>
        <div className="title">
          <h5>Are You Sure You Want to Remove?</h5>
        </div>
        <div className="footer">
          <button
            onClick={() => {
              setOpenModal(false);
            }}
            id="cancelBtn"
          >
            Cancel
          </button>
          <button onClick={handleContinue}>Done</button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
