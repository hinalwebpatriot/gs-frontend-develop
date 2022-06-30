import React, { Fragment } from "react";

import CogSvg from "../../../../img/svg/cog.svg";

import ProductActionsButtons from "../../Shared/ProductActionsButtons";
import ConflictFreeItem from "../../Shared/ConflictFreeItem";
import FreeShippingItem from "../../Shared/FreeShippingItem";
import NeedFasterItem from "../../Shared/NeedFasterItem";
import ExpertHelpButton from "../../Shared/ExpertHelpButton";
import Rating from "../../../_common/Rating";
import localeStore from "../../../../config/LocalesStore";
import CatalogDetails from "./CatalogDetails";
import RingMetalDropdown from "../../Shared/RingMetalDropdown";
import EngagementGuide from "./CatalogGuide";
import CatalogBuyButton from "../../Shared/CatalogBuyButton";
import GoogleEE from '../../../_common/GoogleEE/GoogleEE';


export default class CatalogMain extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isClient: false,
      selectedSize: props.data.size_list[0]
    };
  }

  componentDidMount() {
    GoogleEE.productDetailsView({ product: this.props.data.selected });
    this.setState(state => ({
      ...state,
      isClient: true
    }))
  }

  handleChangeSize = size => {
    this.setState(state => ({
      ...state,
      selectedSize: size
    }));
  };

  render() {
    const { selectedSize, isClient } = this.state;
    const { isMobile, data, currentSize } = this.props;
    const {
      group_sku,
      price,
      h2,
      header,
      sku,
      rate,
      reviews_count,
      id,
      delivery_period = '',
      delivery_to,
      category: {slug},
        is_sold_out,
        sold_out_title,
        in_store,
    } = data.selected;
    const { description = {} } = data.selected;
    const favoriteAndCompareBtnType = slug.includes('s') ? slug.slice(0, slug.length - 1) : slug;
    const soldOut = <p className="table-price table-price--type3">{sold_out_title}</p>;

    const isTrinityEarrings = ["GSP20163457", "GSP20072599"].indexOf(sku) === -1 &&
      ["GSD500", "GSD600"].indexOf(sku.slice(0, -2)) !== -1 && slug !== "rings";
    
    return (
        <Fragment>
          <div className="product-main">
            <h1 className="section-title product-main__title">
              {header}
              <span className="tag">{h2}</span>
            </h1>
            <ExpertHelpButton />
            <div className="product-main__item">
              {reviews_count !== 0 && (
                  <div className="product-main__rating">
                    <Rating rate={rate} rateCount={reviews_count} readOnly />
                  </div>
              )}
            </div>

            <div className="product-main__flex-box">
              {in_store ? <p className="product-main__availability">in-store</p> : null}
              <p className="product-main__code">SKU {sku}</p>
            </div>

            {
              isClient ?
                  <p
                      className="product-main__text"
                      dangerouslySetInnerHTML={{ __html: description }}>
                  </p> :
                  <p className="product-main__text">{description}</p>
            }

          </div>
          <div className="product-info">
            <div className="product-info__item">
              <div>
                {
                  is_sold_out ? <div className="product-price"> {soldOut} </div> : <div className="product-price">
                    <p className="table-price table-price--type3">
                      {localeStore.formatPrice(price.count)}
                      <span>{localeStore.taxString.split('.').join('. ')}</span>
                    </p>

                    <p className="table-price table-price--type2">
                      {price.old_count && localeStore.formatPrice(price.old_count)}
                    </p>
                    {
                      isTrinityEarrings && (
                          <p className="product-price__setting">
                            <span>
                              <img src={CogSvg} alt="Setting gear" />
                            </span>
                            Including Stones
                          </p>
                        )
                    }
                    {
                      (slug === 'pendant' || slug === 'earrings') && !isTrinityEarrings && !group_sku.includes('trinity') && (
                          <p className="product-price__setting">
                            <span>
                              <img src={CogSvg} alt="Setting gear" />
                            </span>
                            Setting only
                          </p>
                        )
                    }
                  </div>
                }
              </div>
              {/*<div className="engraving-block">*/}
              {/*  <Engraving*/}
              {/*    handleSave={handleSave} />*/}
              {/*</div>*/}
              <div className="product-engraving">
              </div>
              <div className="product-choice d-flex justify-content-between">
                <RingMetalDropdown data={data} type="catalog" />
              </div>
            </div>

            <div className="product-info__item">
              <p className="info-p info-p--type2">
                {['GSD20216542', 'GSD20216559', 'GSD20216504'].includes(sku) ? 'Available now instore' :
                  delivery_to && delivery_to.text ? delivery_to.text : delivery_period}
              </p>
              {/* {slug !== 'bracelets' && (
                <p className="info-p info-p--type2 font-bold">
                  Due to lockdown restrictions, orders might be delayed. Contact our team to learn more.
                </p>
              )} */}
            </div>
            <NeedFasterItem />
            <div className="product-info__item">
              <FreeShippingItem />
              <ConflictFreeItem />
              <CatalogBuyButton
                  type="products"
                  id={id}
                  product={data.selected}
                  selectedSize={selectedSize}
                  isSoldOut={is_sold_out}
              />
              <ProductActionsButtons
                  type={favoriteAndCompareBtnType}
                  data={data.selected}
                  selectedSize={selectedSize}
                  isSoldOut={is_sold_out}
              />
            </div>
          </div>
          {isMobile && (
              <CatalogDetails
                  data={data}
                  currentSize={currentSize}
                  isMobile={isMobile}
              />
          )}
          <EngagementGuide isMobile={isMobile} />
        </Fragment>
    );
  }
}
