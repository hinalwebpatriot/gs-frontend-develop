import React from "react";
import { RingsMetalDropdown } from "../RingsMetal";
import localeStore from "../../../../config/LocalesStore";
import ImageLoader from "../../../_common/ImageLoader";
import ImageLoaderAdaptive from "../../../_common/ImageLoaderAdaptive";
import routing from "../../../../config/routing";
import { Link } from "react-router-dom";
import FavoriteButton from "../../../_common/Buttons/FavoriteButton";
import CompareButton from "../../../_common/Buttons/CompareButton";
import RingsOffers from '../RingsOffers';
import GoogleEE  from '../../../_common/GoogleEE/GoogleEE';

export default class ProductPaneItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      products: this.generateProductsWithMetal(props.data.products),
      currentMetal: props.data.products[0].options.metal.slug
    };

  }

  generateProductsWithMetal = data => {
    const obj = {};

    data.forEach(product => {
      obj[product.options.metal.slug] = product;
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

    return routing({ slug: h1.toLowerCase(), id, size: currentSize }).catalogProduct;
  };

  render() {
    const { products, currentMetal } = this.state;
    const {
      type,
      wrapperClassname = "col-6 col-lg-6 col-xl-4",
      position,
      list,
        data:{metals}
    } = this.props;

    const {
      id,
      preview_image,
      image,
      price = {},
      title = "",
      subtitle = "",
      options = {},
      is_sold_out,
      sold_out_title,
      options: {
        is_include_center_stone,
        text_for_center_stone
      }
    } = products[currentMetal];

    const productStaticAlt = "Product";
    const link = this.getLink();
    const soldOut = <p className="table-price table-price--type3">{sold_out_title}</p>;
    return (
      <div className={wrapperClassname} onClick={this.handleLogClick}>
        <div className="slide slide--full listing listing--bar-view">
          <RingsOffers ringId={id} offers={options.offers}/>
          <div className="slider__img">
            <Link to={link} aria-label="ring" >
            {image &&
              <ImageLoaderAdaptive
                src={image.origin}
                alt={`${subtitle} ${productStaticAlt} ${title} ${id}`}
                product={products[currentMetal]}
                position={position}
                list={list || GoogleEE.LIST_SLIDER}
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
                origin={image && image.origin}
                preloadStyles={{ height: "30px", margin: "5px auto" }}
                withoutLoader={true}
              /> }
              { !image && preview_image &&
                <ImageLoader
                  product={products[currentMetal]}
                  position={position}
                  list={list || GoogleEE.LIST_SLIDER}
                  height={140}
                  src={preview_image ? preview_image.path.feed : ""}
                  srcSetMin={preview_image ? preview_image.path.feed_min : ""}
                  srcSetMedium={preview_image ? preview_image.path.medium : ""}
                  preloadStyles={{ height: "140px", margin: "60px auto" }}
                  alt={`${subtitle} ${productStaticAlt} ${title} ${id}`}
                />
              }
            </Link>
          </div>
          <div className="slide-info">
            <div className="metal-select metal-select--type2">
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

            <Link to={link}>
              <p className="slide__name">
                {title}
                {/*{title.collection} {title.shape}*/}
              </p>
            </Link>
            {is_include_center_stone && (
              <Link to={link}>
                <span className="ring-subtitle">
                  {text_for_center_stone || 'INCLUDING CENTER STONE'}
                </span>
                </Link>
              )
            }
            
            <div>
              {
                is_sold_out ? soldOut : <div>
                  <div className="table-price table-price--type3">
                    {
                      !is_include_center_stone
                        &&
                        <span className="price_start_from">
                          {(type !== "bracelet" && type !== "eternity-ring") ? "Start. from " : ""}
                        </span>
                    }
                    <p>{localeStore.formatPrice(price.count)}</p>
                    <span>{localeStore.taxString.split('.').join('. ')}</span>
                  </div>

                  <p className="table-price table-price--type2">
                    {price.old_count && localeStore.formatPrice(price.old_count)}
                  </p>
                </div>
              }
            </div>
            <div className="slide-action">
              <CompareButton
                type={type}
                data={products[currentMetal]}
                className="prod-action prod-action--type2"
              />
              <FavoriteButton
                type={type}
                data={products[currentMetal]}
                className="prod-action prod-action--type2"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
