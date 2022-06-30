import React from "react";

const ResultPanelWrapper = ({ children, type, style }) => (
  <div
    className={`result-panel d-flex ${
      type !== "diamond" ? "result-panel--type2" : ""
    }`}
    style={style}
  >
    {children}
  </div>
);

export default ResultPanelWrapper;
