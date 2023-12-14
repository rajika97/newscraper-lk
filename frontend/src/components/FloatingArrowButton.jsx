import React from "react";
import { FaArrowUp } from "react-icons/fa";

const FloatingArrowButton = ({ onClick }) => {
  return (
    <button
      className="floating-arrow-button"
      onClick={onClick}
      title="Scroll to Top"
    >
      <FaArrowUp size={24} />
    </button>
  );
};

export default FloatingArrowButton;
