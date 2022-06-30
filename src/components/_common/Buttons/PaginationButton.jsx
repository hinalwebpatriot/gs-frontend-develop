import React from "react";

export const PaginationButton = ({ handleClick, isFetching, text }) => (
  <div className="list-next d-flex justify-content-center">
    {!isFetching && (
      <button className="theme-btn" onClick={handleClick}>
        {text}
      </button>
    )}
  </div>
);
