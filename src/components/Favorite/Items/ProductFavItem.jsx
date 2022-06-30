import React from "react";
import CloseSvg from "../../../img/jsSvg/CloseSvg";
import EyeSvg from "../../../img/jsSvg/EyeSvg";
import { Link } from "react-router-dom";

import localeStore from "../../../config/LocalesStore";
import routing from "../../../config/routing";
import ImageLoader from "../../_common/ImageLoader";
import ImageLoaderAdaptive from "../../_common/ImageLoaderAdaptive";
import CompareButton from "../../_common/Buttons/CompareButton";
import ConstructorFavCompareButton from "../../_common/RingConstructor/ConstructorFavCompareButton";
import GoogleEE from '../../_common/GoogleEE/GoogleEE';

function handleLogClick({ product, position = 1 }) {
  GoogleEE.productClick({
    product: product,
    list: GoogleEE.LIST_FAVORITE,
    position: position
  })
}

const ProductFavItem = ({ data, currentTab, removeAction, position }) => {
  const {
    slug,
    h1,
    id,
    preview_image,
    image,
    price = {},
    title = "",
    subtitle = ""
  } = data;
  const link = routing({ slug: h1, id }).catalogProduct;
  const moreLink = currentTab === 'pendant' ? `/jewellery/${currentTab}` : `/jewellery/${currentTab}s`;

  return (
      <div className="col-6 col-lg-4" onClick={() => handleLogClick({ product: data, position })}>
        <div className=" slide slide--full listing listing--fav ">
          {/*<div className="category-block category-block--type2">*/}
          {/*<button className="category active">*/}
          {/*Get a GIFT with diamond*/}
          {/*</button>*/}
          {/*</div>*/}
          {removeAction && (
              <button
                  className="listing-control "
                  onClick={() => removeAction(data)}
              >
                <CloseSvg width="17" height="17" />
              </button>
          )}

          <div className="slider__img">
            <Link to={link} aria-label="ring" >
              {image ? (
                <ImageLoaderAdaptive
                  product={data}
                  list={GoogleEE.LIST_FAVORITE}
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
                <ImageLoader src={preview_image ? preview_image.path.medium : ""} product={data} list={GoogleEE.LIST_FAVORITE} position={position} />
              )}
            </Link>
          </div>
          <div className="slide-info">
            <span className="slide__title">{subtitle}</span>
            <p className="slide__name">{title}</p>
            <p className="table-price table-price--type3">
              {localeStore.formatPrice(price ? price.count : 0)}
              <span>{localeStore.taxString.split('.').join('. ')}</span>
            </p>
            <p className="table-price table-price--type2">
              {price.old_count && localeStore.formatPrice(price.old_count)}
            </p>
            {currentTab === "engagement" && (
                <ConstructorFavCompareButton type="engagement" id={id} />
            )}

            <Link
                to={moreLink}
                className="slide__more"
            >
              More like this
            </Link>
            <div className="slide-action">
              <CompareButton
                  data={data}
                  type={currentTab}
                  className="prod-action prod-action--type2"
              />

              <button className="prod-action ">
                <Link to={link}>
                <span className="extra-icon ">
                  <EyeSvg />
                </span>
                </Link>
              </button>
            </div>
          </div>
        </div>
      </div>
  );
};

export default ProductFavItem;
