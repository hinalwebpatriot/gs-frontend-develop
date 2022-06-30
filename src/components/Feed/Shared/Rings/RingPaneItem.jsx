import React from "react";
import { RingsMetalDropdown } from "../RingsMetal";
import localeStore from "../../../../config/LocalesStore";
import ImageLoader from "../../../_common/ImageLoader";
import routing from "../../../../config/routing";
import { Link } from "react-router-dom";
import FavoriteButton from "../../../_common/Buttons/FavoriteButton";
import CompareButton from "../../../_common/Buttons/CompareButton";
import RingsOffers from '../RingsOffers';
import GoogleEE  from '../../../_common/GoogleEE/GoogleEE';
import ImageLoaderAdaptive from "../../../_common/ImageLoaderAdaptive";

export default class RingPaneItem extends React.Component {
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
  }

  render() {
    const { rings, currentMetal } = this.state;
    const {
      currentSize,
      type,
      wrapperClassname = "col-6 col-lg-6 col-xl-4",
      position,
      list,
      metaSlug,
    } = this.props;

    const { metals } = this.props.data;

    const {
      // slug,
      id,
      h1,
      preview_image,
      image,
      price = {},
      title = "",
      subtitle = "",
      // product_type,
      options = {}
    } = rings[currentMetal];
    // const { metal = {}, ring_collection = {}, stone_shape = {}, ring_style = {} } = rings[currentMetal].options;
    //
    // const title = {
    //   collection: ring_collection ? ring_collection.title : '',
    //   shape: stone_shape ? stone_shape.title : '',
    //   style: ring_style ? ring_style.title : '',
    //   metal: metal ? metal.title : '',
    // };

    const ringStaticAlt = type === "engagement" ? "Diamond Engagement Ring" : "wedding ring";

    const link =
      type === "engagement"
        ? routing({ slug: h1.toLowerCase(), id, size: currentSize }).engagementProduct
        : routing({ slug: h1.toLowerCase(), id, size: currentSize }).weddingProduct;
    return (
      <div className={wrapperClassname} onClick={this.handleLogClick}>
        <div className="slide slide--full listing listing--bar-view">
          <RingsOffers ringId={id} offers={options.offers}/>
          <div className="slider__img">
            <Link to={link} aria-label="ring" >
              {image &&
                <ImageLoaderAdaptive
                  src={image.origin}
                  alt={`${subtitle} ${ringStaticAlt} ${title} ${id}`}
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
                  product={rings[currentMetal]}
                  position={position}
                  list={list || GoogleEE.LIST_SLIDER}
                  origin={image && image.origin}
                  preloadStyles={{ height: "30px", margin: "5px auto" }}
                  withoutLoader={true}
                /> }
              { !image && preview_image &&
                <ImageLoader
                  product={rings[currentMetal]}
                  position={position}
                  list={list || GoogleEE.LIST_SLIDER}
                  height={140}
                  src={preview_image ? preview_image.path.feed : ""}
                  srcSetMin={preview_image ? preview_image.path.feed_min : ""}
                  srcSetMedium={preview_image ? preview_image.path.medium : ""}
                  preloadStyles={{ height: "140px", margin: "60px auto" }}
                  alt={`${subtitle} ${ringStaticAlt} ${title} ${id}`}
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

            <Link to={link} aria-label="ring">
              <span className="ring-options">
                {metaSlug === 'engagement-rings-halo' ? 'Halo engagement ring' : subtitle}
                {/*{title.style}, {title.metal}*/}
              </span>
            </Link>
            <Link to={link} aria-label="ring">
              <p className="slide__name">
                {title}
                {/*{title.collection} {title.shape}*/}
              </p>
            </Link>
            <p className="table-price table-price--type3">
              {localeStore.formatPrice(price.count)}
              <span>{localeStore.taxString.split('.').join('. ')}</span>
            </p>

            <p className="table-price table-price--type2">
              {price.old_count && localeStore.formatPrice(price.old_count)}
            </p>
            {/*<p className="table-price table-price--type2">$2000</p>*/}
            <div className="slide-action">
              <CompareButton
                type={type}
                data={rings[currentMetal]}
                className="prod-action prod-action--type2"
              />
              <FavoriteButton
                type={type}
                data={rings[currentMetal]}
                className="prod-action prod-action--type2"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
