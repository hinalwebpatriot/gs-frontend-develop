import React, { Fragment } from "react";

const ImageToggler = ({ src, activeSrc, isActive, alt = '' }) => (
  <Fragment>
    <img src={activeSrc} style={{ display: isActive ? "block" : "none" }} alt={alt} />
    <img src={src} style={{ display: !isActive ? "block" : "none" }} alt={alt} />
  </Fragment>
);

export default ImageToggler;
