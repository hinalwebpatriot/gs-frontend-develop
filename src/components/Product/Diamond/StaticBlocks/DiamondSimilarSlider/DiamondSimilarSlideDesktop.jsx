import React from "react";
import localeStore from "../../../../../config/LocalesStore";
import { Link } from "react-router-dom";
import routing from "../../../../../config/routing";
import GoogleEE from '../../../../_common/GoogleEE/GoogleEE';
import ImageLoader from '../../../../_common/ImageLoader';

function handleLogClick({ product, position = 1 }) {
  GoogleEE.productClick({
    product: product,
    list: GoogleEE.LIST_SLIDER,
    position: position
  })
}

const DiamondSimilarSlideDesktop = ({
  title,
  subtitle,
  slug,
  id,
  image,
  price,
  item,
  position
}) => (
  <div className="slide slide--diamond slide--full" onClick={() => handleLogClick({ product: item, position})}>
    <Link to={routing({ slug, id }).diamondProduct}>
      <div className="slide__img">
        <ImageLoader
          product={item}
          list={GoogleEE.LIST_SLIDER}
          position={position}
          src={image.medium}
          alt=""
        />
      </div>

      <p className="slide__title">{title}</p>
      <p className="slide__name">{subtitle}</p>
      <p className="slide__price">{localeStore.formatPrice(price.count)}</p>

      {/*<div className="slide__btns">*/}
      {/*<Link to={routing(`${slug}-${id}`).diamondProduct} className="theme-btn">*/}
      {/*View diamond*/}
      {/*</Link>*/}
      {/*</div>*/}
    </Link>
  </div>
);

export default DiamondSimilarSlideDesktop;
