import React from "react";

import { faStar } from "@fortawesome/free-solid-svg-icons/faStar";
import IconFA from './IconFA';

const Rating = ({
  rate,
  rateCount,
  readOnly,
  handleChange,
  disabled = false
}) => {
  const key = Math.random();
  const ratingButtons = Array(5)
    .fill(null)
    .map((item, index) => (
      <button
        key={`rating_${index}_${key}`}
        className={`rate__item ${rate >= index + 1 ? "active" : ""}`}
        onClick={!readOnly ? () => handleChange(index + 1) : undefined}
        type="button"
        disabled={disabled}
      >
        <IconFA icon={faStar}/>
      </button>
    ));

  return (
    <div className="d-flex rate-box">
      <div className="rate">{ratingButtons}</div>
      {rateCount !== 0 && <p className="rate-box__val">{rateCount}</p>}
    </div>
  );
};

export default Rating;
