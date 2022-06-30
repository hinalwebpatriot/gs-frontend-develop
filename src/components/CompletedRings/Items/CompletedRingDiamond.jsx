import React from "react";

import ImageLoader from "../../_common/ImageLoader";
import localeStore from "../../../config/LocalesStore";
import routing from "../../../config/routing";
import { Link } from "react-router-dom";

const CompletedRingDiamond = ({
  data,
  handleUpdate,
  optionId,
  settingId,
  ringSize,
  isSharing,
  list,
  position
}) => {
  const { title, subtitle, sku, id, preview_image, price } = data;
  const { shape, carat, color, clarity, cut } = data.options;

  const link = routing({ slug: sku, id }).diamondProduct;
  return (
    <div className="col-md-6">
      <div className=" slide slide--full slide--complete">
        <div className="slide__img">
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
          <p className="slide__title">{title}</p>
          <p className="slide__name">{subtitle}</p>
          {/*<p className="slide__name" style={{ overflow: 'none' }}>*/}
          {/*{subtitle}*/}
          {/*</p>*/}
          <p className="slide__text">SKU {sku}</p>
          <div className="complete-options">
            <div className="slide-option">
              <p className="slide-option__item">Shape</p>
              <span className="slide-option__val">
                {shape ? shape.title : ""}
              </span>
            </div>
            <div className="slide-option">
              <p className="slide-option__item">Carat</p>
              <span className="slide-option__val">{carat}</span>
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
        <div className="complete-item-price">
          <p className="table-price table-price--type3">
            {localeStore.formatPrice(price.count)}
            <span>{localeStore.taxString.split('.').join('. ')}</span>
          </p>
          <p className="table-price table-price--type2">
            {price.old_count && localeStore.formatPrice(price.old_count)}
          </p>
        </div>

        {!isSharing && (
          <div
            className="slide__btns"
            onClick={() =>
              handleUpdate({
                type: "diamond",
                optionId: optionId,
                id: settingId,
                ringSize
              })
            }
          >
            <button className="theme-btn">Change</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompletedRingDiamond;
