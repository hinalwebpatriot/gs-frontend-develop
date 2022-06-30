import React from "react";
import { Link } from "react-router-dom";
import localeStore from "../../../../../config/LocalesStore";
import ImageLoader from "../../../../_common/ImageLoader";
import ImageLoaderAdaptive from "../../../../_common/ImageLoaderAdaptive";
import routing from "../../../../../config/routing";
import GoogleEE from '../../../../_common/GoogleEE/GoogleEE';

function handleLogClick({ product, position = 1 }) {
  GoogleEE.productClick({
    product: product,
    list: GoogleEE.LIST_SLIDER,
    position: position
  })
}

const DiamondRingSlideDesktop = ({ product }) => {
  const {
      position,
      preview_image,
      image,
      title,
      // slug,
      id,
      price,
      h1
  } = product;

  return (
    <Link aria-label="ring"  to={routing({ slug: h1.toLowerCase(), id }).engagementProduct} onClick={() => handleLogClick({ product, position })}>
      <div className="slide slide--full">
        <div className="slider__img">
          {image ? (
            <ImageLoaderAdaptive
              product={product}
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
              alt={`slider-colection: ${title}`}
            />
          ) : (
            <ImageLoader
              product={product}
              list={GoogleEE.LIST_SLIDER}
              position={position}
              src={preview_image ? preview_image.path.medium : ""}
              alt={`slider-colection: ${title}`}
            />
          )}
        </div>
        <p className="slide__name">{title}</p>
        <p className="slide__price">
          {price ? localeStore.formatPrice(price.count) : 0}
        </p>
        <p className="table-price table-price--type2">
          {price.old_count && localeStore.formatPrice(price.old_count)}
        </p>
      </div>
    </Link>
  );
}

export default DiamondRingSlideDesktop;
