import React from "react";

import ImageLoader from "../../../../_common/ImageLoader";
import ImageLoaderAdaptive from "../../../../_common/ImageLoaderAdaptive";
import GoogleEE from '../../../../_common/GoogleEE/GoogleEE';

const DiamondRingSlideMobile = ({ product, handleSelect }) => {
  const { preview_image, image, id } = product;
  return (
    <div className="slide slide--full" onClick={() => handleSelect(id)}>
      <div className="slider__img">
        {image ? (
          <ImageLoaderAdaptive
              product={product}
              list={GoogleEE.LIST_SLIDER}
              position={product.position}
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
              alt={`Diamond ring slide mobile: ${id}`}
            />
        ) : (
          <ImageLoader src={preview_image ? preview_image.path.thumb : null} alt={`Diamond ring slide mobile: ${id}`} />
        )}
      </div>
    </div>
  );
}

export default DiamondRingSlideMobile;
