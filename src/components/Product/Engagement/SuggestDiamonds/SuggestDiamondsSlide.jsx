import React from "react";
import localeStore from "../../../../config/LocalesStore";
import { Link } from "react-router-dom";
import routing from "../../../../config/routing";
import ImageLoader from "../../../_common/ImageLoader";
import GoogleEE from "../../../_common/GoogleEE/GoogleEE";

function handleLogClick({ product, position = 1 }) {
  GoogleEE.productClick({
    product: product,
    list: GoogleEE.LIST_SLIDER,
    position: position
  })
}

const SuggestDiamondSlide = ({ item, position }) => {
  const { preview_image, title, subtitle, id, price, slug } = item;
  const link = routing({ slug, id }).diamondProduct;
  return (
    <div className="slide slide--full slide--diamond" onClick={() => handleLogClick({ product: item, position })}>
      <Link to={link}>
        <div className="slide__img">
          <ImageLoader
            src={preview_image ? preview_image.path.medium : ""}
            list={GoogleEE.LIST_SLIDER}
            product={item}
            position={position}
          />
        </div>
      </Link>
      <div className="slide-info">
        <p className="slide__title">{title}</p>
        <p className="slide__name">{subtitle}</p>
        <p className="slide__price">
          {localeStore.formatPrice(price.count)}
          <span> For diamond only</span>
        </p>
        <div className="slide__btns">
          {/*<a href="#" className="theme-btn theme-btn--type2">*/}
          {/*Complete ring*/}
          {/*</a>*/}
          <Link to={link} className="theme-btn ">
            View diamond
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SuggestDiamondSlide;
