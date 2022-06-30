import React from "react";

const CompareWrapper = ({ children }) => (
  <div className="compare-container">
    <div className="container">
      <div className="compare-wrap">
        <div className="compare-wrap__inner">{children}</div>
      </div>
    </div>
  </div>
);

export default CompareWrapper;
