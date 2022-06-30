import React from "react";

import localeStore from "../../../config/LocalesStore";
import ImageLoader from "../ImageLoader";
import ImageLoaderAdaptive from "../ImageLoaderAdaptive";
import routing from "../../../config/routing";
import { Link } from "react-router-dom";
import FavoriteButton from "../Buttons/FavoriteButton";
import CompareButton from "../Buttons/CompareButton";
import GoogleEE from '../GoogleEE/GoogleEE';

export default class RingListSlide extends React.Component {
  handleLogClick = () => {
    const { data, list, position } = this.props;

    GoogleEE.productClick({
      product: data,
      list: list || GoogleEE.LIST_SLIDER,
      position: position
    })
  }

  render() {
    const { currentSize, type, data, list, position } = this.props;

    const {
      // slug,
      h1,
      id,
      preview_image,
      price = {},
      title = "",
      subtitle = "",
      image
    } = data;
    // const { metal = {}, ring_collection = {}, stone_shape = {}, ring_style = {} } = data.options;

    // const title = {
    //   collection: ring_collection ? ring_collection.title : '',
    //   shape: stone_shape ? stone_shape.title : '',
    //   style: ring_style ? ring_style.title : '',
    //   metal: metal ? metal.title : '',
    // };

    const link =
      type === "engagement"
        ? routing({ slug: h1.toLowerCase(), id, size: currentSize }).engagementProduct
        : routing({ slug: h1.toLowerCase(), id, size: currentSize }).weddingProduct;

    return (
      <div className="slide slide--full" onClick={this.handleLogClick}>
        <div className="slider__img">
          <Link to={link} aria-label="Top picks of the month">
            {image
            ?  <ImageLoaderAdaptive
                product={data}
                list={list || GoogleEE.LIST_SLIDER}
                position={position}
                mobile={{
                  webp: image && image.webp['280x280'],
                  jpg: image && image.jpg['280x280']
                }}
                desktop={{
                  webp: image && image.webp['225x225'],
                  webp2x: image && image.webp['450X450'],
                  jpg: image && image.jpg['225x225'],
                  jpg2x: image && image.jpg['450x450'],
                  width: '225'
                }}
                src={image.origin}
                preloadStyles={{ height: "140px", margin: "17px auto" }}
                alt=""
              />
            : <ImageLoader
                product={data}
                list={list || GoogleEE.LIST_SLIDER}
                position={position}
                src={preview_image ? preview_image.path.feed : ""}
                preloadStyles={{ height: "140px", margin: "17px auto" }}
                alt=""
              />
            }
          </Link>
        </div>
        <div className="slide-info">
          <Link to={link} aria-label="Top picks of the month">
            <span className="ring-options">{subtitle}</span>
          </Link>
          <Link to={link} aria-label="Top picks of the month">
            <p className="slide__name">{title}</p>
          </Link>
          <p className="table-price table-price--type3">
            {localeStore.formatPrice(price.count)}
            <span>{localeStore.taxString.split('.').join('. ')}</span>
          </p>
          <p className="table-price table-price--type2">
            {price.old_count && localeStore.formatPrice(price.old_count)}
          </p>
          <div className="slide-action">
            <CompareButton
              data={data}
              type={type}
              className="prod-action prod-action--type2"
            />
            <FavoriteButton
              data={data}
              type={type}
              className="prod-action prod-action--type2"
            />
          </div>
        </div>
      </div>
    );
  }
}
