import React from "react";

import { RingsMetalDots, RingsMetalDropdown } from "../RingsMetal";
import localeStore from "../../../../config/LocalesStore";
import ImageLoader from "../../../_common/ImageLoader";
import { Link } from "react-router-dom";
import routing from "../../../../config/routing";
import FavoriteButton from "../../../_common/Buttons/FavoriteButton";
import CompareButton from "../../../_common/Buttons/CompareButton";
import GoogleEE from '../../../_common/GoogleEE/GoogleEE';

export default class RingListItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      rings: this.generateRingsWithMetal(props.data.rings),
      currentMetal: props.data.rings[0].options.metal.slug
    };
  }

  generateRingsWithMetal = data => {
    const obj = {};

    data.forEach(ring => {
      obj[ring.options.metal.slug] = ring;
    });

    return obj;
  };

  handleChangeRing = ({ target }) => {
    const metal = target.dataset.metal;
    if (metal) {
      this.setState({
        currentMetal: metal
      });
    }
  };

  handleLogClick = () => {
    const { currentMetal, rings } = this.state;
    const { list, position } = this.props;

    GoogleEE.productClick({
      product: rings[currentMetal],
      list: list || GoogleEE.LIST_SLIDER,
      position: position
    })
  };

  render() {
    const { rings, currentMetal } = this.state;
    const { currentSize, type, data, position, list, metaSlug } = this.props;
    const { metals } = data;

    const {
      slug,
      h1,
      id,
      preview_image,
      price = {},
      title = "",
      subtitle = ""
    } = rings[currentMetal];

    const ringStaticAlt = type === "engagement" ? "Diamond Engagement Ring" : "wedding ring";

    const link =
      type === "engagement"
        ? routing({ slug: h1, id, size: currentSize }).engagementProduct
        : routing({ slug: h1, id, size: currentSize }).weddingProduct;

    return (
      <div className="list-row list-row--type2" onClick={this.handleLogClick}>
        <div className="list-img">
          <Link to={link}>
            <ImageLoader
              product={rings[currentMetal]}
              position={position}
              list={list || GoogleEE.LIST_SLIDER}
              src={preview_image ? preview_image.path.feed : ""}
              height={25}
              preloadStyles={{ height: "25px" }}
              alt={`${subtitle} ${ringStaticAlt} ${title} ${id}`}
            />
          </Link>
        </div>
        <div className="listing-ring">
          <p className="listing-ring__item " data-label="Shape">
            <Link to={link}>
              <span className="list-val list-val--bold">{title}</span>
            </Link>
            <Link to={link}>
              <span className="ring-options sm-hide">{metaSlug === 'engagement-rings-halo' ? 'Halo engagement ring' : subtitle}</span>
            </Link>
            <span className="ring-options sm-show">{title.style}</span>
          </p>
          <div className="metal-select">
            <RingsMetalDropdown
              metals={metals}
              currentMetal={currentMetal}
              handleChange={this.handleChangeRing}
            />
          </div>
          {/*<RingsMetalDots*/}
            {/*metals={Object.keys(metals)}*/}
            {/*handleSelect={this.handleChangeRing}*/}
            {/*wrapClass="sm-hide"*/}
          {/*/>*/}
        </div>
        <div className="list-right-group list-right-group--type2">
          <div className="list-col list-col--center">
            <CompareButton
              type={type}
              data={rings[currentMetal]}
              className="prod-action prod-action--type2"
            />
          </div>
          <div className="list-col list-col--center">
            <FavoriteButton
              type={type}
              data={rings[currentMetal]}
              className="prod-action"
            />
          </div>
          <div className="list-col list-col--price list-col--center">
            <span className="table-price">
              {localeStore.formatPrice(price.count)}
              <span>{localeStore.taxString}</span>
            </span>
            <p className="table-price table-price--type2">
              {price.old_count && localeStore.formatPrice(price.old_count)}
            </p>
          </div>

          <div className="list-col ">
            <div className="table-action">
              <Link to={link}>
                <button className="theme-btn table-action__item">View</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
