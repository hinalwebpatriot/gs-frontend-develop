import React from "react";

const ShapesBlockMain = ({ image, title, alt }) => (
  <div className="main-tab">
    <div className="main-tab__img">
      <img src={image} alt={alt} importance="high"/>
    </div>
    <p className="main-tab__text">{title}</p>
  </div>
);

export default ShapesBlockMain;
