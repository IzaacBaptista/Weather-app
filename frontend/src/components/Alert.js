import React from "react";
import PropTypes from "prop-types";
import "../assets/styles/Alert.css";

function Alert({ message, onClose }) {
  return (
    <div className="alert-container">
      <div className="alert-box">
        <p>{message}</p>
        <button onClick={onClose}>Fechar</button>
      </div>
    </div>
  );
}

Alert.propTypes = {
  message: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Alert;
