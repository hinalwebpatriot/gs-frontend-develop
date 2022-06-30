import React from "react";

const ConfirmationSuccessHeader = ({ title }) => (
  <div className="d-flex cart-header  cart-header--type3 ">
    <p className="section-title cart-header__title">
      <span className="success-icon">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          version="1.1"
          width="25"
          height="25"
          viewBox="0 0 137.8 137.8"
        >
          <path
            className="cls-1"
            d="M68.9,0C30.8,0,0,30.8,0,68.9c0,38,30.8,68.9,68.9,68.9c38,0,68.9-30.8,68.9-68.9C137.7,30.9,106.9,0.1,68.9,0z   M109.8,55.9l-49.4,49.4c-4.1,4.1-10.9,4.1-15,0L26.6,86.4c-4-4.2-3.9-11,0.4-15c4.1-3.9,10.5-3.9,14.6,0l11.4,11.4l41.9-41.9  c4.2-4,11-3.9,15,0.4C113.7,45.4,113.7,51.8,109.8,55.9z"
          />
        </svg>
      </span>
      {title}
    </p>
  </div>
);

export default ConfirmationSuccessHeader;
