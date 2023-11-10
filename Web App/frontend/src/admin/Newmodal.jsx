import React from "react";
import "../css/modal.css";

function Modal2({ setOpenModal, confirmAction }) {
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
          <h5>Are You Sure, Did you verify all these details?</h5>
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
          <button onClick={handleContinue}>Confirm</button>
        </div>
      </div>
    </div>
  );
}

export default Modal2;
