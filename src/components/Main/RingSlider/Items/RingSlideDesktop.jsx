import React from "react";

import localeStore from "../../../../config/LocalesStore";
import ImageLoader from "../../../_common/ImageLoader";
import { Link } from "react-router-dom";
import routing from "../../../../config/routing";
import GoogleEE from '../../../_common/GoogleEE/GoogleEE';
import ImageLoaderAdaptive from "../../../_common/ImageLoaderAdaptive";

function handleLogClick({ product, position = 1 }) {
  GoogleEE.productClick({
    product: product,
    list: GoogleEE.LIST_SLIDER,
    position: position
  })
}

const RingsSlideDesktop = ({ item, position = 1, alt }) => {
  const { preview_image, title, price, id, h1, product_type, image } = item;
  
  return (
    <div className="slide slide--full" onClick={() => handleLogClick({ product: item, position })}>
      <Link aria-label="ring"  to={routing({ id, slug: h1.toLowerCase() })[product_type === 'engagement-rings' ? 'engagementProduct' : 'weddingProduct']}>
        <div className="slider__img">
          {image 
          ? <ImageLoaderAdaptive
              product={item}
              list={GoogleEE.LIST_SLIDER}
              position={position}
              src={image.origin}
              mobile={{
                webp: image && image.webp['280x280'],
                jpg: image && image.jpg['280x280']
              }}
              desktop={{
                webp: image && image.webp['225x225'],
                webp2x: image && image.webp['450X450'],
                jpg: image && image.jpg['225x225'],
                jpg2x: image && image.jpg['450x450'],
                width: '225'
              }}
              alt={alt}
            />
          : <ImageLoader
              product={item}
              list={GoogleEE.LIST_SLIDER}
              position={position}
              src={preview_image ? preview_image.path.medium : ""}
              alt={alt}
            />
          }
        </div>
      </Link>
      <p className="slide__name">{title}</p>
      <p className="slide__price">
        {price ? localeStore.formatPrice(price.count) : 0}
      </p>
    </div>
  );
};

export default RingsSlideDesktop;
