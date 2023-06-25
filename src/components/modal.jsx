import React from "react";

const EmailModal = ({
  handleEmailChange,
  openModal,
  handleSubmit,
  isOpen,
  closeModal,
  email,
}) => {
  return (
    <div>
      {isOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <form onSubmit={handleSubmit}>
              <label>
                Email:
                <input
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                />
              </label>
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmailModal;
