import React from "react";

import localeStore from "../../../../config/LocalesStore";
import ImageLoader from "../../../_common/ImageLoader";
import { Link } from "react-router-dom";
import routing from "../../../../config/routing";
import GoogleEE from '../../../_common/GoogleEE/GoogleEE';

export default class CatalogListItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      products: this.generateProductsWithMetal(props.data.products),
      currentMetal: props.data.products[0].options.metal.slug
    };
  }

  generateProductsWithMetal = data => {
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
    const { currentMetal, products } = this.state;
    const { list, position, setCatalogCategory, type } = this.props;

    setCatalogCategory(type);

    GoogleEE.productClick({
      product: products[currentMetal],
      list: list || GoogleEE.LIST_SLIDER,
      position: position
    })
  };

  getLink = () => {
    const { products, currentMetal } = this.state;
    const { h1, id, currentSize } = products[currentMetal];

    return routing({ slug: h1, id, size: currentSize }).catalogProduct;
  };

  render() {
    const { products, currentMetal } = this.state;
    const { position, list } = this.props;
    // const { metals } = data;

    const {
      // slug,
      // h1,
      id,
      preview_image,
      price = {},
      title = "",
      subtitle = ""
    } = products[currentMetal];

    const productStaticAlt = "Product";
    const link = this.getLink();

    return (
      <div className="list-row list-row--type2" onClick={this.handleLogClick}>
        <div className="list-img">
          <Link to={link}>
            <ImageLoader
              product={products[currentMetal]}
              position={position}
              list={list || GoogleEE.LIST_SLIDER}
              src={preview_image ? preview_image.path.feed : ""}
              height={25}
              preloadStyles={{ height: "25px" }}
              alt={`${subtitle} ${productStaticAlt} ${title} ${id}`}
            />
          </Link>
        </div>
        <div className="listing-ring">
          <p className="listing-ring__item " data-label="Shape">
            <Link to={link}>
              <span className="list-val list-val--bold">{title}</span>
            </Link>
            <Link to={link}>
              <span className="ring-options sm-hide">{subtitle}</span>
            </Link>
            <span className="ring-options sm-show">{title.style}</span>
          </p>
          {/*<div className="metal-select">*/}
            {/*<RingsMetalDropdown*/}
              {/*metals={metals}*/}
              {/*currentMetal={currentMetal}*/}
              {/*handleChange={this.handleChangeRing}*/}
            {/*/>*/}
          {/*</div>*/}
          {/*<RingsMetalDots*/}
          {/*metals={Object.keys(metals)}*/}
          {/*handleSelect={this.handleChangeRing}*/}
          {/*wrapClass="sm-hide"*/}
          {/*/>*/}
        </div>
        <div className="list-right-group list-right-group--type2">
          {/*<div className="list-col list-col--center">*/}
            {/*<CompareButton*/}
              {/*type={'wedding'}*/}
              {/*data={products[currentMetal]}*/}
              {/*className="prod-action prod-action--type2"*/}
            {/*/>*/}
          {/*</div>*/}
          {/*<div className="list-col list-col--center">*/}
            {/*<FavoriteButton*/}
              {/*type={'wedding'}*/}
              {/*data={products[currentMetal]}*/}
              {/*className="prod-action"*/}
            {/*/>*/}
          {/*</div>*/}
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
