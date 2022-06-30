import React from "react";
import slideArrow from "../../../../img/svg/slide_arrow.svg";
import ImageLoader from "../../../_common/ImageLoader";

const ProductCategoriesSlide = ({ name, image, slug, alt }) => (
  <div className="slide slide--full">
    <div className="slider__img">
      <a href={slug} aria-label="ring" >
        <ImageLoader src={image} alt={alt} />
      </a>
    </div>
    <a href={slug} className="slide__link">
      {name}
      <span>
        <img className="slide-arrow" src={slideArrow} alt="" />
      </span>
    </a>
  </div>
);

export default ProductCategoriesSlide;
