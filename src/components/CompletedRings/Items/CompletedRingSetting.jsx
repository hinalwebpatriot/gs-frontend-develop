import React, { Component } from "react";

import ImageLoader from "../../_common/ImageLoader";
import localeStore from "../../../config/LocalesStore";
import { Link } from "react-router-dom";
import routing from "../../../config/routing";
import {getInscriptionStorage, removeInscriptionStorage} from "../../Product/Engraving/methods";

class CompletedRingSetting extends Component {
  render() {
    const { data, optionId, diamondId, handleUpdate, isSharing, list, position } = this.props;
    const {
      h1,
      id,
      preview_image,
      price = {},
      title,
      sku,
      selected_size = {}
    } = data;
    const {
      metal = {},
      band_width = {},
      min_ring_size = {},
      max_ring_size = {},
      carat_weight = '',
      approx_stones = ''
    } = data.options;

    const currentSize = "au";

    const link = routing({ id, slug: h1 }).engagementProduct;

    return (
      <div className="col-md-6">
        <div className=" slide slide--full slide--complete complete--product">
          <div className="scale-img scale-img--complete slide__img">
            <Link to={link}>
              <ImageLoader
                src={preview_image ? preview_image.path.medium : null}
                product={data}
                list={list}
                position={position}
              />
            </Link>
          </div>
          <div className="slide-info">
            <p className="slide__title" />
            {title && <p className="slide__name">{title}</p>}
            <p className="slide__text">SKU {sku}</p>
            <div className="complete-options">
              <div className="slide-option">
                <p className="slide-option__item">Metal</p>
                <span className="slide-option__val">
                {metal ? metal.title : ""}
              </span>
              </div>
              <div className="slide-option">
                <p className="slide-option__item">Approx Carat Weight</p>
                <span className="slide-option__val">
                { carat_weight || '-'}
              </span>
              </div>
              <div className="slide-option">
                <p className="slide-option__item">Approx No. of Stones</p>
                <span className="slide-option__val">{approx_stones || '-'}</span>
              </div>
              <div className="slide-option">
                <p className="slide-option__item">Band width</p>
                <span className="slide-option__val">
                {band_width
                  ? `${band_width.count} ${band_width.dimension}`
                  : ""}
              </span>
              </div>
              <div className="slide-option">
                <p className="slide-option__item">Available ring sizes</p>
                <span className="slide-option__val">
                {min_ring_size && max_ring_size
                  ? `${min_ring_size.title[currentSize]}-${
                    max_ring_size.title[currentSize]
                    }`
                  : ""}
              </span>
              </div>
              <div className="slide-option">
                <p className="slide-option__item">Selected size</p>
                <span className="slide-option__val">
                {selected_size.title[currentSize]}
              </span>
              </div>
              <div className="slide-option">
                <p className="slide-option__item">Engraving inscription</p>
                <span className="slide-option__val">
                  {getInscriptionStorage(data.id) || '-'}
              </span>
              </div>
            </div>
          </div>
          <p className="table-price table-price--type3 flex-center">
            {localeStore.formatPrice(price.count)}
            <span>{localeStore.taxString.split('.').join('. ')}</span>
          </p>
          <p className="table-price table-price--type2">
            {price.old_count && localeStore.formatPrice(price.old_count)}
          </p>
          {!isSharing && (
            <div
              className="slide__btns"
              onClick={() =>
                handleUpdate({
                  type: "setting",
                  optionId: optionId,
                  id: diamondId,
                  ringSize: selected_size.slug
                })
              }
            >
              <button
                onClick={() => removeInscriptionStorage(data.id)}
                className="theme-btn">
                  Change
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }
};

export default CompletedRingSetting;
