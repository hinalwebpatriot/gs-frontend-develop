import React, { Fragment } from "react";

import CogSvg from "../../../../img/svg/cog.svg";

import ProductActionsButtons from "../../Shared/ProductActionsButtons";
import ConflictFreeItem from "../../Shared/ConflictFreeItem";
import FreeShippingItem from "../../Shared/FreeShippingItem";
import NeedFasterItem from "../../Shared/NeedFasterItem";
import ExpertHelpButton from "../../Shared/ExpertHelpButton";
import Rating from "../../../_common/Rating";
import localeStore from "../../../../config/LocalesStore";
import EngagementDetails from "./EngagementDetails";
import RingMetalDropdown from "../../Shared/RingMetalDropdown";
import RingSizeDropdown from "../../Shared/RingSizeDropdown";
import EngagementGuide from "./EngagementGuide";
import ConstructorProductButton from "../../../_common/RingConstructor/ConstructorProductButton";
import GoogleEE from '../../../_common/GoogleEE/GoogleEE';
import Engraving from "../../Engraving/Engraving";
import EngagementBuyButton from "../../Shared/EngagementBuyButton";
import RingConstructor from "../../../_common/RingConstructor/RingConstructor";

export default class EngagementMain extends React.Component {
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
      h2,
      header,
      subtitle = '',
      sku,
      rate,
      reviews_count,
      id,
      disable_constructor,
      delivery_period = '',
      in_store,
      options,
      delivery_to
    } = data.selected;
    const { description = {} } = data.selected;
    const setting_type = options && options.setting_type ? options.setting_type : '';
    let hasPresetRings = (options && options.ring_collection && options.ring_collection.slug
                         && options.ring_collection.slug === 'Preset rings') ? true : false;
    RingConstructor.setCaratRange(options.min_stone_carat, options.max_stone_carat);

    return (
      <Fragment>
        <div className="product-main">
          <h1 className="section-title product-main__title">
            <span>{`${header} ${setting_type}`}</span>
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
            <div className="product-price">
              <p className="table-price table-price--type3">
                {localeStore.formatPrice(price.count)}
                <span>{localeStore.taxString.split('.').join('. ')}</span>
              </p>

              <p className="table-price table-price--type2">
                {price.old_count && localeStore.formatPrice(price.old_count)}
              </p>


              <p className="product-price__setting">
                {
                  disable_constructor ? "Includes centre diamond" :  <><span>
                  <img src={CogSvg} alt={`Engagement main ${subtitle}`} />
                  </span>
                  { hasPresetRings ? 'Preset Rings' : 'Ring setting only'}
                  </>
                }
              </p>
            </div>

            <div className="engraving-block">
              <Engraving
                handleSave={handleSave} />
            </div>

            <div className="product-engraving">

            </div>
            <div className="product-choice d-flex justify-content-between">
              <RingMetalDropdown data={data} type="engagement" />
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
            {/* <p className="info-p info-p--type2 font-bold">
              Due to lockdown restrictions, orders might be delayed. Contact our team to learn more.
            </p> */}
          </div>
          <NeedFasterItem />
          <div className="product-info__item">
            <FreeShippingItem />
            <ConflictFreeItem />
            {
              disable_constructor ?  <EngagementBuyButton
                  id={id}
                  product={data.selected}
                  selectedSize={selectedSize}
              /> : <ConstructorProductButton
                  type="engagement"
                  id={id}
                  selectedSize={selectedSize}
              />
            }

            <ProductActionsButtons
              type="engagement"
              data={data.selected}
              selectedSize={selectedSize}
            />
          </div>
        </div>
        {isMobile && (
          <EngagementDetails
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
