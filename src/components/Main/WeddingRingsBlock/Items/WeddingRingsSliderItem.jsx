import React from "react";

import moveIcon from "../../../../img/svg/move-icon.svg";
import NewProductImageRotate from "../../../_common/ProductImageRotate/NewProductImageRotate";
import { Link } from "react-router-dom";
import routing from "../../../../config/routing";
import { get } from "lodash";

const WeddingRingsSliderItem = ({ data }) => (
  <div className="slide slide--full slide-360">
    <NewProductImageRotate images={get(data, "images_360", [])} />
    <Link to={routing({ id: data.id, slug: data.h1 }).weddingProduct}>
      <p className="slide__title">{data.title}</p>
      <p className="slide__name">{data.subtitle}</p>
    </Link>
    <button className="move-slide">
      <img src={moveIcon} alt="" />
      move
    </button>
  </div>
);

export default WeddingRingsSliderItem;
