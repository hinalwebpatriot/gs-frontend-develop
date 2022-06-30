import React from "react";

import image from "../../../../img/home_r1.jpg";
import localeStore from "../../../../config/LocalesStore";

const SpecialRingsSlideDesktop = ({}) => (
  <div className="slide slide--full">
    <div className="slider__img">
      <img src={image} alt="" />
    </div>
    <p className="slide__name">Cathedral Knife edge Round</p>
    <p className="slide__price">{localeStore.formatPrice(5424)}</p>
  </div>
);

export default SpecialRingsSlideDesktop;
