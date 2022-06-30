import React, { Fragment } from "react";
import ArrowButtonBlack from "../../../img/jsSvg/ArrowButtonBlack";

const SliderButtons = ({ next, prev }) => (
  <Fragment>
    <button aria-label="slide-prev" className="slider-btn slider-btn--type3" onClick={prev}>
      <span className="slider-btn__arrow slider-btn__arrow--type2">
        <ArrowButtonBlack alt="Next slide"/>
        {/* <img src={SlideArrow} alt="Prev slide" /> */}
      </span>
    </button>
    <button aria-label="slide-next"
      className="slider-btn slider-btn--type2 slider-btn--type3"
      onClick={next}
    >
      <span className="slider-btn__arrow">
        <ArrowButtonBlack alt="Next slide"/>
        {/* <img src={SlideArrow} alt="Next slide" /> */}
      </span>
    </button>
  </Fragment>
);

export default SliderButtons;
