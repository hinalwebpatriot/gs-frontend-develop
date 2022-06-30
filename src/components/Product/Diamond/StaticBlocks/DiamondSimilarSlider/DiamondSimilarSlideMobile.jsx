import React from "react";

const DiamondSimilarSlideMobile = ({ image, item, handleSelect }) => (
  <div
    className="slide slide--product slide--full"
    onClick={() => handleSelect(item)}
  >
    <div className="slide__img">
      <img src={image.thumb} alt="" />
    </div>
  </div>
);

export default DiamondSimilarSlideMobile;
