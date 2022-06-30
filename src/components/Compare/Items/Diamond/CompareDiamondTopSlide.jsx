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
import capitalizeString from '../../../../utils/capitalizeString';

function handleLogClick({ product, position = 1 }) {
  GoogleEE.productClick({
    product: product,
    list: GoogleEE.LIST_COMPARE,
    position: position
  })
}

const CompareDiamondTopSlide = ({ data, removeAction, position }) => {
  const { id, slug, title, subtitle, price = {}, preview_image = {} } = data;
  const { shape = {} } = data.options;
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
        <div className="slider__img">
          {
            id === null ?
              <ImageLoader
                  product={data}
                  list={GoogleEE.LIST_COMPARE}
                  position={position}
                  src={preview_image ? preview_image.path.medium : ""}
                  preloadStyles={{ height: "125px", margin: "50px auto" }}
              />
             : <Link to={routing({ slug, id }).diamondProduct}>
                <ImageLoader
                product={data}
                list={GoogleEE.LIST_COMPARE}
                position={position}
                src={preview_image ? preview_image.path.medium : ""}
                preloadStyles={{ height: "125px", margin: "50px auto" }}
            />
                </Link>
          }

        </div>
        <div className="slide-info">
          <span className="sm-hide slide__title ">{title}</span>
          <p className="slide__name">{subtitle}</p>
            {
              id === null ? <p className="table-price table-price--type3">SOLD </p> : <>
                <p className="table-price table-price--type3">{localeStore.formatPrice(price ? price.count : 0)}
                <span>{localeStore.taxString.split('.').join('. ')}</span>
                </p>
                <p className="table-price table-price--type2">
                  {price.old_count && localeStore.formatPrice(price.old_count)}
                </p>
                  </>
            }


          <ConstructorFavCompareButton type="diamond" id={id} />
          <div className="d-flex compare-action">
            <Link
              to={routing(shape ? capitalizeString(shape.slug) : "Round").diamondsFeedWithShape}
              className="slide__more"
              style={{marginRight: `${id === null && '0px'}`}}
            >
              More like this
            </Link>
            <div className="slide-action">
              {
                id !== null && <>
                  <FavoriteButton
                      data={data}
                      type="diamond"
                      className="prod-action prod-action--type2"
                  />

                  <button className="prod-action ">
                    <Link to={routing({ slug, id }).diamondProduct}>
                  <span className="extra-icon ">
                    <EyeSvg />
                  </span>
                    </Link>
                  </button>
                </>
              }

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompareDiamondTopSlide;
