import React, { Fragment } from "react";

import ProductActionsButtons from "../../Shared/ProductActionsButtons";
import ConflictFreeItem from "../../Shared/ConflictFreeItem";
import FreeShippingItem from "../../Shared/FreeShippingItem";
import NeedFasterItem from "../../Shared/NeedFasterItem";
import ExpertHelpButton from "../../Shared/ExpertHelpButton";
import Rating from "../../../_common/Rating";
import localeStore from "../../../../config/LocalesStore";
import WeddingGuide from "./WeddingGuide";
import RingMetalDropdown from "../../Shared/RingMetalDropdown";
import RingSizeDropdown from "../../Shared/RingSizeDropdown";
import WeddingBuyButton from "../../Shared/WeddingBuyButton";
import WeddingDetails from "./WeddingDetails";
import GoogleEE from '../../../_common/GoogleEE/GoogleEE';
import Engraving from "../../Engraving/Engraving";

export default class WeddingMain extends React.Component {
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
    const { isMobile, data, currentSize, handleSave } = this.props;
    const {
      price,
      // title,
      // subtitle,
      // h1,
      h2,
      header,
      sku,
      rate,
      reviews_count,
      delivery_period = '',
      delivery_to,
      in_store
    } = data.selected;
    const { gender } = data.selected.options;
    const { description = {} } = data.selected;

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
            {in_store ? <p className="product-main__availability">in store</p> : null}
            <p className="product-main__code d-flex">
              <span>SKU {sku}</span>
              {gender === "male" && (
                  <span className="prod-gender"> | For him</span>
              )}
              {gender === "female" && (
                  <span className="prod-gender"> | For her</span>
              )}
              {!gender && <span className="prod-gender"> | For both</span>}
            </p>
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
            <div className="product-price">
              <p className="table-price table-price--type3">
                {localeStore.formatPrice(price.count)}
                <span>{localeStore.taxString.split('.').join('. ')}</span>
              </p>
              <p className="table-price table-price--type2">
                {price.old_count && localeStore.formatPrice(price.old_count)}
              </p>
              {/*<p className="table-price table-price--type2">$2000</p>*/}
              {/*<p className="product-price__setting">*/}
              {/*<span>*/}
              {/*<img src={CogSvg} alt="" />*/}
              {/*</span>*/}
              {/*For setting*/}
              {/*</p>*/}
            </div>

            <div className="engraving-block">
              <Engraving handleSave={handleSave} />
            </div>

            <div className="product-choice d-flex justify-content-between">
              <RingMetalDropdown data={data} type="wedding" />
              <RingSizeDropdown
                data={data}
                currentSize={currentSize}
                selectedSize={selectedSize}
                handleChange={this.handleChangeSize}
              />
            </div>
          </div>

          <div className="product-info__item">
            <p className="info-p info-p--type2">
              {delivery_to && delivery_to.text ? delivery_to.text : delivery_period}
            </p>
            {/* {gender !== 'male' && (<p className="info-p info-p--type2 font-bold">
              Due to lockdown restrictions, orders might be delayed. Contact our team to learn more.
            </p>)} */}
          </div>
          <NeedFasterItem />
          <div className="product-info__item">
            <FreeShippingItem />
            <ConflictFreeItem />
            <WeddingBuyButton
              id={data.selected.id}
              product={data.selected}
              selectedSize={selectedSize}
            />
            <ProductActionsButtons type="wedding" data={data.selected} />
          </div>
        </div>
        {isMobile && (
          <WeddingDetails
            data={data}
            currentSize={currentSize}
            isMobile={isMobile}
          />
        )}
        <WeddingGuide isMobile={isMobile} />
      </Fragment>
    );
  }
}
