import React, { Component } from "react";
import localeStore from "../../../../config/LocalesStore";
import ImageLoaderLanding from "../../../_common/ImageLoaderLanding";
import routing from "../../../../config/routing";
import { Link } from "react-router-dom";

class DiamondLandItem extends Component {
  preventLinkClick = (e) => {
    e.stopPropagation();
  };

  render() {
    const { data, id, list, position, handleDiamond, activeDiamond, diamondCarat } = this.props;
    const {
      shape = {},
      color = {},
      clarity = {},
      cut = {},
      carat = "",
    } = data.options;

    const { price = {}, preview_image, title, subtitle, sku, slug } = data;

    const activeClass = activeDiamond === id ? "active" : "";

    return (
      <div className="col-xs-6 col-md-6 col-xl-4">
        <div className={` slide slide--full slide--complete slide-diamond--landing ${activeClass}`}
          onClick={() => handleDiamond(id, diamondCarat, price.count)}>
          <div className="mobile-show">
            <p className="slide__title">{title}</p>
            <Link
              onClick={this.preventLinkClick}
              target="_blank"
              to={routing({ slug, id }).diamondProduct}
              className="slide__name slide__name-link">
                {subtitle}
              </Link>
            <p className="slide__text">SKU {sku}</p>
          </div>
          <div className="revert">
            <div className="slide__img">
              <a>
                <ImageLoaderLanding
                  src={preview_image ? preview_image.path.medium : null}
                  product={data}
                  list={list}
                  position={position}
                  preloadStyles={{
                    height: "40px",
                    margin: "12px auto"
                  }}
                  height={64}
                />
                {/*<img*/}
                  {/*src={preview_image ? preview_image.path.medium : null}*/}
                  {/*alt={""}*/}
                  {/*style={{ ...preloadStyles, display: ""}}*/}
                  {/*className="lazy-img"*/}
                {/*/>*/}
              </a>
            </div>
            <div className="slide-info">
              <p className="slide__title mobile-hide">{title}</p>
              <Link
                onClick={this.preventLinkClick}
                target="_blank"
                to={routing({ slug, id }).diamondProduct}
                className="slide__name slide__name-link mobile-hide">
                  {subtitle}
              </Link>
              <p className="slide__text mobile-hide">SKU {sku}</p>
              <div className="complete-options">
                <div className="slide-option">
                  <p className="slide-option__item">Shape</p>
                  <span className="slide-option__val">
                    {shape ? shape.title : ""}
                  </span>
                </div>
                <div className="slide-option">
                  <p className="slide-option__item">Carat</p>
                  <span className="slide-option__val">{carat ? carat : ""}</span>
                </div>
                <div className="slide-option">
                  <p className="slide-option__item">Color</p>
                  <span className="slide-option__val">
              {color ? color.title : ""}
            </span>
                </div>
                <div className="slide-option">
                  <p className="slide-option__item">Clarity</p>
                  <span className="slide-option__val">
              {clarity ? clarity.title : ""}
            </span>
                </div>
                <div className="slide-option">
                  <p className="slide-option__item">Cut</p>
                  <span className="slide-option__val">{cut ? cut.title : ""}</span>
                </div>
                <div className="slide-option">
                  <p className="slide-option__item">Lab</p>
                  <span className="slide-option__val">GIA</span>
                </div>
              </div>
            </div>
          </div>
          <div className="complete-item-price">
            <p className="table-price table-price--type3">
              {localeStore.formatPrice(price.count)}
              <span>{localeStore.taxString.split('.').join('. ')}</span>
            </p>
            <p className="table-price table-price--type2">
              {price.old_count && localeStore.formatPrice(price.old_count)}
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default DiamondLandItem;
