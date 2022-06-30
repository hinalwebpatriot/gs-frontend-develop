import React from "react";

const CompareTableRow = ({ children, bold }) => (
  <div className="compare-row ">
    <div className="compare-col">
      <p className={`compare-val ${bold ? "compare-val--bold" : ""}`}>
        {children}
      </p>
    </div>
  </div>
);

export default CompareTableRow;
