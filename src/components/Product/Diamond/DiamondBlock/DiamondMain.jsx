import React, { Fragment } from "react";
import { Link } from 'react-router-dom';

import CogSvg from "../../../../img/svg/cog.svg";

import DiamondDetails from "./DiamondDetails";
import ProductActionsButtons from "../../Shared/ProductActionsButtons";
import DiamondGuide from "./DiamondGuide";
import ConflictFreeItem from "../../Shared/ConflictFreeItem";
import FreeShippingItem from "../../Shared/FreeShippingItem";
import NeedFasterItem from "../../Shared/NeedFasterItem";
import localeStore from "../../../../config/LocalesStore";
import ConstructorProductButton from "../../../_common/RingConstructor/ConstructorProductButton";
import CustomTooltip from "../../../_common/CustomTooltip";
import routing from '../../../../config/routing';
import GoogleEE from '../../../_common/GoogleEE/GoogleEE';

const ProductOption = ({ title, text = "", tooltip }) => (
  <div className="col-3">
    <div className="prod-option">
      <p className="prod-option__item">
        {title}
        <CustomTooltip path={tooltip} />
      </p>
      <span className="prod-option__val">{text}</span>
    </div>
  </div>
);

export default class DiamondMain extends React.Component {
  componentDidMount() {
    GoogleEE.productDetailsView({ product: this.props.data})
  }

  render() {
    const { isMobile, data } = this.props;
    const {
      cut = {},
      color = {},
      clarity = {},
      carat = "",
      symmetry = {},
      shape = {}
    } = data.options;
    const { price, title, subtitle, sku, in_store, delivery_period } = data;
    return (
      <Fragment>
        <div className="product-main">
          <h2 className="section-title product-main__title">
            {/*0.50 Ct. Round Shape Diamond - GIA*/}
            {title} {subtitle}
          </h2>
          {/*<div className="category-block product-main__category">*/}
          {/*<button className="category">Designer collection 2018</button>*/}
          {/*<button className="category active">New</button>*/}
          {/*</div>*/}
          <div className="product-main__flex-box">
            {in_store ? <p className="product-main__availability">in-store</p> : null}
            <p className="product-main__code">SKU {sku}</p>
          </div>
          <div className="product-main__options">
            <div className="row no-gutters">
              {shape.slug === "round" ? (
                <ProductOption
                  title="Cut"
                  text={cut ? cut.title : ""}
                  tooltip="diamond.cut"
                />
              ) : (
                <ProductOption
                  title="Symmetry"
                  text={symmetry ? symmetry.title : ""}
                  tooltip="diamond.symmetry"
                />
              )}
              <ProductOption
                title="Carat"
                text={carat || ""}
                tooltip="diamond.carat"
              />
              <ProductOption
                title="Color"
                text={color ? color.title : ""}
                tooltip="diamond.color"
              />
              <ProductOption
                title="Clarity"
                text={clarity ? clarity.title : ""}
                tooltip="diamond.clarity"
              />
            </div>
          </div>

          {!isMobile && (
            <p className="product-main__text">
              Want to be sure about this diamond before you buy it? Click on this <Link to={routing().contactUs}>link</Link> and we will investigate it for you and be in touch with you within 24 hours with our recommendation.
            </p>
          )}
        </div>
        <div className="product-info">
          <div className="product-info__item">
            <div className="product-price diamond">          
              <p className="table-price table-price--type3">
                {localeStore.formatPrice(price.count)}
                <span>{localeStore.taxString.split('.').join('. ')}</span>
              </p>
              {
                price && price.old_count
                && <p className="table-price table-price--type4">
                    {localeStore.formatPrice(price.old_count)}
                   </p>
              }
              {/*<p className="table-price table-price--type2">$2000</p>*/}
              <p className="product-price__setting">
                <span>
                  <img src={CogSvg} alt="" />
                </span>
                Without setting
              </p>
            </div>
            <p className="prod-estimate info-p info-p--type2">
              {delivery_period}
            </p>
          </div>
          <NeedFasterItem />
          {isMobile && (
            <p className="product-main__text">
              Want to be sure about this diamond before you buy it? Click on this <Link to={routing().contactUs}>link</Link> and we will investigate it for you and be in touch with you within 24 hours with our recommendation.
            </p>
          )}
          <div className="product-info__item">
            <FreeShippingItem />
            <ConflictFreeItem />
            <ConstructorProductButton type="diamond" id={data.id} />
            <ProductActionsButtons type="diamond" data={data} />
          </div>
        </div>
        {isMobile && (
          <DiamondDetails data={this.props.data} isMobile={isMobile} />
        )}

        <DiamondGuide isMobile={isMobile} />
      </Fragment>
    );
  }
}
