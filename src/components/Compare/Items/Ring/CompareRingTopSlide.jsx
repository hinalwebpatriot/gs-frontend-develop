import React from "react";
import CloseSvg from "../../../../img/jsSvg/CloseSvg";
import EyeSvg from "../../../../img/jsSvg/EyeSvg";
import { Link } from "react-router-dom";

import localeStore from "../../../../config/LocalesStore";
import routing from "../../../../config/routing";
import ImageLoader from "../../../_common/ImageLoader";
import FavoriteButton from "../../../_common/Buttons/FavoriteButton";
import ConstructorFavCompareButton from "../../../_common/RingConstructor/ConstructorFavCompareButton";
import GoogleEE from '../../../_common/GoogleEE/GoogleEE';

function handleLogClick({ product, position = 1 }) {
  GoogleEE.productClick({
    product: product,
    list: GoogleEE.LIST_COMPARE,
    position: position
  })
}

const CompareRingTopSlide = ({ data, removeAction, currentTab, position }) => {
  const {
    // slug,
    id,
    h1,
    preview_image,
    price = {},
    title = "",
    subtitle = ""
  } = data;

  const link =
    currentTab === "engagement"
      ? routing({ slug: h1, id }).engagementProduct
      : routing({ slug: h1, id }).weddingProduct;

  return (
    <div className="compare-col" onClick={() => handleLogClick({ product: data, position })}>
      <div className=" slide slide--full listing listing--compare">
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
        <div className="scale-img slider__img">
          {
            id === null ? <ImageLoader
                  product={data}
                  list={GoogleEE.LIST_COMPARE}
                  position={position}
                  src={preview_image ? preview_image.path.medium : ""}
                  preloadStyles={{
                    height: "100px",
                    transform: "none",
                    margin: "40px auto"
                  }}
              /> : <Link to={link}>
              <ImageLoader
                  product={data}
                  list={GoogleEE.LIST_COMPARE}
                  position={position}
                  src={preview_image ? preview_image.path.medium : ""}
                  preloadStyles={{
                    height: "100px",
                    transform: "none",
                    margin: "40px auto"
                  }}
              />
            </Link>
          }

        </div>
        <div className="slide-info">
          <span className="sm-hide slide__title">{subtitle}</span>
          <p className="slide__name">{title}</p>
          {
            id === null ?  <p className="table-price table-price--type3">SOLD</p> : <>
              <p className="table-price table-price--type3">
                {localeStore.formatPrice(price ? price.count : 0)}
                <span>{localeStore.taxString.split('.').join('. ')}</span>
              </p>
              <p className="table-price table-price--type2">
                {price.old_count && localeStore.formatPrice(price.old_count)}
              </p>
            </>
            }

          {
            id !== null && <>
              {currentTab === "engagement" && (
                  <ConstructorFavCompareButton type="engagement" id={id} />
              )}
            </>
          }


          <div className="d-flex compare-action">
            <Link
              to={
                currentTab === "engagement"
                  ? routing().engagementFeed
                  : routing().weddingFeed
              }
              className="slide__more"
              style={{marginRight: `${id === null && '0px'}`}}
            >
              More like this
            </Link>
            {
              id !== null &&  <div className="slide-action">
                <FavoriteButton
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
            }

          </div>
        </div>
      </div>
    </div>
  );
};

export default CompareRingTopSlide;
