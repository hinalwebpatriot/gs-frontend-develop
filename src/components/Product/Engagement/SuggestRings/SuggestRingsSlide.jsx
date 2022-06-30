import React from "react";
import localeStore from "../../../../config/LocalesStore";
import { Link } from "react-router-dom";
import routing from "../../../../config/routing";
import ImageLoader from "../../../_common/ImageLoader";
import ImageLoaderAdaptive from "../../../_common/ImageLoaderAdaptive";
import GoogleEE from '../../../_common/GoogleEE/GoogleEE';

function handleLogClick({ product, position = 1 }) {
  GoogleEE.productClick({
    product: product,
    list: GoogleEE.LIST_SLIDER,
    position: position
  })
}

const SuggestRingsSlide = ({ item, size, position }) => {
  const {
    preview_image = {},
    image,
    price = {},
    id,
    // slug,
    h1,
    title,
    subtitle
  } = item;
  const link = routing({ slug: h1, id, size }).engagementProduct;

  return (
    <div className="slide slide--full" onClick={() => handleLogClick({ product: item, position })}>
      <div className="slide__img">
        <Link to={link}>
          {image ? (
            <ImageLoaderAdaptive
              product={item}
              list={GoogleEE.LIST_SLIDER}
              position={position}
              mobile={{
                webp: image && image.webp['280x280'],
                jpg: image && image.jpg['280x280']
              }}
              desktop={{
                webp: image && image.webp['225x225'],
                webp2x: image && image.webp['450X450'],
                jpg: image && image.jpg['225x225'],
                jpg2x: image && image.jpg['450x450'],
                width: '186'
              }}
              src={image.origin}
              preloadStyles={{ height: "186px" }}
              alt={title}
            />
          ) : (
            <ImageLoader
              product={item}
              list={GoogleEE.LIST_SLIDER}
              position={position}
              src={preview_image ? preview_image.path.feed : ""}
            />
          )}
        </Link>
      </div>

      <div className="slide-info">
        <p className="slide__name">{title}</p>
        <p className="slide__text">{subtitle}</p>
        <p className="slide__price">
          {localeStore.formatPrice(price.count)}
          <span> + diamond</span>
        </p>
        <p className="table-price table-price--type2">
          {price.old_count && localeStore.formatPrice(price.old_count)}
        </p>
      </div>
    </div>
  );
};

export default SuggestRingsSlide;
