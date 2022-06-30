import React, { Fragment } from "react";
import { get } from "lodash";
import Slider from "react-slick";
import ImageLoader from "../../_common/ImageLoader";
import ImageLoaderAdaptive from "../../_common/ImageLoaderAdaptive";
import ProductImageZoom from "../../_common/ProductImageZoom/ProductImageZoom";
import videoIcon from "../../../img/svg/icon_play_video.svg";
import video360Icon from "../../../img/svg/360_view.svg";
import rotateIcon from "../../../img/svg/icon_3D.svg";
import certificateImg from "../../../img/view5.png";
import noCertIconGIA from  '../../../img/gia-01.png';
import DiamondVideoModal from './DiamondVideoModal';
import { openHubspotChat } from "../../../config/hubspot";

export default class ProductGallery extends React.Component {
  constructor(props) {
    super(props);

    this.slider = React.createRef();

    this.state = {
      selected: 0,
      type: "default",
      showDiamondModal: false,
    };
  }

  handleChangeSlide = ({ index }) => {
    this.slider.current.slickGoTo(index);
  };

  handleUpdate = index => {
    this.setState({
      selected: index,
      type: index === this.rotateIndex ? "rotate360" : "default"
    });
  };

  handleDiamondModal = () => {
    this.setState({
      showDiamondModal: !this.state.showDiamondModal
    })
  }

  render() {
    const {
      images,
      video,
      images_360,
      h1 = '',
      h2 = '',
      options,
      product_type,
      pictures
    } = this.props.data;
    const { selected, type, showDiamondModal } = this.state;
    const { zoom } = this.props;
    
    const imageList = pictures ? pictures : (images ? images : []);

    const sliderImages = imageList.map((image, index) => {
      const alt = `${h1} ${h2} Alternate shot ${index + 1}`;
      return (
        <button
          key={`image_gal_${index}`}
          className={`view-control__item ${index === selected ? "active" : ""}`}
          onClick={() =>
            this.handleChangeSlide({
              index: index,
              type: "default"
            })
          }
        >
          <span>
            {
              pictures && pictures[index] 
              ? <ImageLoaderAdaptive
                  src={pictures.origin}
                  alt={alt}
                  mobile={{
                    webp: pictures[index].webp['200x200'],
                    jpg: pictures[index].jpg['200x200']
                  }}
                  desktop={{
                    webp: pictures[index].webp['100x100'],
                    webp2x: pictures[index].webp['200x200'],
                    jpg: pictures[index].jpg['100x100'],
                    jpg2x: pictures[index].jpg['200x200']
                  }}
                  origin={pictures.origin}
                  preloadStyles={{ height: "30px", margin: "5px auto" }}
              />
              : <ImageLoader
                  src={image.path.thumb}
                  alt={alt}
                  preloadStyles={{ height: "30px", margin: "5px auto" }}
                />
            }
            
          </span>
        </button>
      );
    });

    const videoIndex = (pictures && pictures.length > 0) ? pictures.length : (images && images.length);
    const videoSlide = video && (
      <button
        className={`view-control__item ${
          videoIndex === selected ? "active" : ""
        }`}
        onClick={() =>
          this.handleChangeSlide({
            index: videoIndex,
            type: "video"
          })
        }
      >
        <span>
          <img src={videoIcon} alt={`${h1} ${h2} video`} />
        </span>
      </button>
    );

    const rotateIndex = video ? videoIndex + 1 : images.length;

    this.rotateIndex = rotateIndex;
    const rotate360Slide = images_360 && (
      <button
        className={`view-control__item ${
          rotateIndex === selected ? "active" : ""
        }`}
        onClick={() =>
          this.handleChangeSlide({
            index: rotateIndex,
            type: "rotate360"
          })
        }
      >
        <span>
          <img src={rotateIcon} alt={`${h1} ${h2} rotate360`} />
        </span>
      </button>
    );

    const certificate = get(options, "certificate", null);

    const diamondVideo = get(options, "video", null);

    const settings = {
      className: "",
      dots: false,
      arrows: false,
      infinite: false,
      autoplay: false,
      lazyLoad: true,

      draggable: type !== "rotate360",
      swipeToSlide: type !== "rotate360",
      touchMove: type !== "rotate360",

      slidesToShow: 1,

      // slidesToShow: data.length < 3 ? data.length : 3,
      slidesToScroll: 1,
      beforeChange: (_, newIndex) => this.handleUpdate(newIndex)
    }; 
    return (
      <Fragment>
        { showDiamondModal && <DiamondVideoModal url={diamondVideo} handleModal={this.handleDiamondModal}/> }
      <div className="product-view-box">
        <Slider ref={this.slider} {...settings}>
          {imageList.map((item, index) => (
            <ProductImageZoom
              {...zoom}
              key={`prod_slider_${index}`}
              path={pictures ? item.origin : (images ? item.path.origin : '')}
              type="image"
              mimeType={item.mime_type}
              pictureItem={pictures && pictures[index]}
              alt={`${h1} ${h2} ${index > 0 ? `Alternate shot ${index + 1}` : ""}`}
            />
          ))}
          {video && (<div>
            <ProductImageZoom
              path={video.src}
              type="video"
              mimeType={video.mime_type}
              alt="view video"
            />
            </div>
          )}
          {images_360 && (
            <ProductImageZoom
              path={images_360}
              type="rotate360"
              mimeType={null}
            />
          )}
        </Slider>
        {/*<ProductImageZoom path={selectedPath} type={type} mimeType={mimeType} />*/}
        <div className="d-flex view-control">
          {sliderImages}
          {videoSlide}
          {rotate360Slide}

          {product_type === "diamonds" && diamondVideo && (
            <button className="view-control__item" onClick={this.handleDiamondModal}>
              <span>
                <img src={video360Icon} alt="view diamond 360 video" />
              </span>
            </button>
          )}

          {product_type === "diamonds" && (certificate && certificate !== "-" ? (
            <span>
              <a href={certificate} target="_blank" rel="noreferrer noopener">
                <img src={certificateImg} alt="view diamond certificate" />
              </a>
            </span>
          ):(
              <button type="button" className="view-control__item" onClick={() => openHubspotChat()}>
                <span>
                  <img src={noCertIconGIA} alt="chat with expert" />
                </span>
              </button>
          ))}
        </div>
      </div>
      </Fragment>
    );
  }
}
