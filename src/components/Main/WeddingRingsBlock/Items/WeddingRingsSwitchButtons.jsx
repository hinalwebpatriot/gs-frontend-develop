import React from "react";

const WeddingRingsSwitchButtons = ({ selected, handleSelect }) => (
  <div className="page-toggle">
    <button
      className={`page-toggle__item ${selected === "woman" ? "active" : ""}`}
      data-type="woman"
      onClick={handleSelect}
    >
      Women's
    </button>
    <button
      className={`page-toggle__item ${selected === "man" ? "active" : ""}`}
      data-type="man"
      onClick={handleSelect}
    >
      Men's
    </button>
  </div>
);

export default WeddingRingsSwitchButtons;
