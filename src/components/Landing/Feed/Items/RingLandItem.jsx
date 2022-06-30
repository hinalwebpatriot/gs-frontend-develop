import React, { Component } from "react";
import { Link } from 'react-router-dom';
import localeStore from "../../../../config/LocalesStore";
import ImageLoader from "../../../_common/ImageLoader";
import GoogleEE  from '../../../_common/GoogleEE/GoogleEE';
import routing from "../../../../config/routing";

export default class RingLandItem extends Component {

  render() {
    const {
      type,
      wrapperClassname = "col-xs-6 col-md-6 col-xl-4",
      position,
      list,
      handleRing,
      activeRing,
      currentSize
    } = this.props;

    const {
      sku,
      options,
      preview_image,
      price = {},
      h1,
      id,
      title = "",
      subtitle = ""
    } = this.props.data;
    const {
      min_ring_size,
      max_ring_size,
      band_width
    } = options;

    const ringStaticAlt = type === "engagement" ? "Diamond Engagement Ring" : "wedding ring";
    const activeClass = activeRing === id ? "active" : "";
    const link =
      type === "engagement"
        ? routing({ slug: h1, id, size: currentSize }).engagementProduct
        : routing({ slug: h1, id, size: currentSize }).weddingProduct;

    return (
      <div className={wrapperClassname}>
        <div
          className={`slide slide--full listing listing--bar-view slide-ring--landing ${activeClass}`}
          onClick={() => handleRing(id, min_ring_size.slug, price.count, title)}>
          <div className="slider__img">
            <a aria-label="product" >
              <ImageLoader
                product={'NO'}
                position={position}
                list={list || GoogleEE.LIST_SLIDER}
                height={140}
                src={preview_image ? preview_image.path.feed : ""}
                preloadStyles={{ height: "140px", margin: "60px auto" }}
                alt={`${subtitle} ${ringStaticAlt} ${title} ${id}`}
              />
            </a>
          </div>
          <div className="slide-info">
            {/*<div className="metal-select metal-select--type2">*/}
              {/*<RingsMetalDropdown*/}
                {/*metals={metals}*/}
                {/*currentMetal={currentMetal}*/}
                {/*handleChange={this.handleChangeRing}*/}
              {/*/>*/}
            {/*</div>*/}
            <p className="slide__mini-title">{subtitle}</p>
            <Link to={link} target="_blank" className="slide__name slide__name-link">{title}</Link>
            <p className="slide__text">SKU {sku}</p>
            <div className="complete-options">
              <div className="slide-option">
                <p className="slide-option__item">Metal</p>
                <span className="slide-option__val">
                  {options.metal ? options.metal.title : ""}
              </span>
              </div>
              </div>
              <div className="slide-option">
                <p className="slide-option__item">Band width</p>
                <span className="slide-option__val">
                  {band_width ? `${band_width.count} ${band_width.dimension}` : ""}
              </span>
              </div>
              <div className="slide-option">
                <p className="slide-option__item">Available ring sizes</p>
                <span className="slide-option__val">
                {min_ring_size && max_ring_size
                  ? `${min_ring_size.title['au']}-${
                    max_ring_size.title['au']
                    }`
                  : ""}
              </span>
              </div>
              <div className="slide-option">
                <p className="slide-option__item">Certification</p>
                <span className="slide-option__val">
                INFO
              </span>
              </div>

              <p className="table-price table-price--type3 table-price--landing">
                {localeStore.formatPrice(price.count)}
                <span>{localeStore.taxString.split('.').join('. ')}</span>
              </p>
            </div>


            <p className="table-price table-price--type2">
              {price.old_count && localeStore.formatPrice(price.old_count)}
            </p>
            {/*<div className="slide-action">*/}
              {/*<CompareButton*/}
                {/*type={type}*/}
                {/*data={'NO'}*/}
                {/*className="prod-action prod-action--type2"*/}
              {/*/>*/}
              {/*<FavoriteButton*/}
                {/*type={type}*/}
                {/*data={'NO'}*/}
                {/*className="prod-action prod-action--type2"*/}
              {/*/>*/}
            {/*</div>*/}
          </div>
      </div>
    );
  }
}
