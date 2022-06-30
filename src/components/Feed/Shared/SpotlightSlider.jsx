import React, { Fragment } from "react";
import Slider from "react-slick";
import SliderButtons from "../../_common/Buttons/SliderButtons";
import { get } from "lodash";
import { isEqual } from "lodash";
import { flattenDeep } from '../../../utils/flattenDeep';
import LightboxWrapper from '../../_common/Lightbox/LightboxWrapper';

export default class SpotlightSlider extends React.Component {
  constructor(props) {
    super(props);

    this.slider = React.createRef();

    this.state = {
      isOpen: false,
      photoIndex: 0,
      preloadedImages: []
    };
  }

  componentDidMount() {
    const images = get(this.props, "data.data", []);
    this.setState({
      preloadedImages: this.handlePreload(images)
    });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (!isEqual(prevProps.data, this.props.data)) {
      const images = get(this.props, "data.data", []);
      this.setState({
        preloadedImages: this.handlePreload(images)
      });
    }
  }

  handlePreload = images => {
    const preloadedImages = flattenDeep(images).map(link => {
      let preloadImg = new Image();
      preloadImg.src = link;
      return preloadImg;
    });

    return preloadedImages;
  };

  handleOpenLightbox = index => {
    this.setState({
      photoIndex: index,
      isOpen: true
    });
  };

  handleCloseLightBox = () => {
    this.setState({
      photoIndex: 0,
      isOpen: false
    });
  };

  nextSlide = () => {
    this.slider.current.slickNext();
  };

  prevSlide = () => {
    this.slider.current.slickPrev();
  };

  render() {
    const { isOpen, photoIndex, preloadedImages } = this.state;
    const { data, status } = this.props;

    if (status !== "success") return null;
    const settings = {
      className: "gallery-grid sm-hide",
      dots: false,
      arrows: false,
      infinite: true,
      autoplay: true,
      lazyLoad: true,
      slidesToShow: 5,
      slidesToScroll: 1,

      draggable: false,
      swipeToSlide: false,
      touchMove: false
    };

    const flattenImages = flattenDeep(data.data);
    const flattenImagesLength = flattenImages.length;

    let flattenIndex = 0;
    const slides = data.data.map((slide, index) => {
      if (slide.length > 1) {
        const subPicture = slide.map((sub, subIndex) => {
          const lightboxIndex = flattenIndex++;
          return (
            <div
              className="grid-slide grid-slide--hh"
              key={`l_s_${index}_${subIndex}`}
              onClick={() => this.handleOpenLightbox(lightboxIndex)}
            >
              <img src={sub} alt="" />
            </div>
          );
        });

        return (
          <div
            className="gallery-grid__col gallery-grid__col--small"
            key={`l_s_${index}`}
          >
            {subPicture}
          </div>
        );
      } else {
        const lightboxIndex = flattenIndex++;
        return (
          <div className="gallery-grid__col" key={`l_s_${index}`}>
            <div
              className="grid-slide"
              onClick={() => this.handleOpenLightbox(lightboxIndex)}
            >
              <img src={slide[0]} alt={`Spotlight slider: ${index} `} />
            </div>
          </div>
        );
      }
    });

    return (
      <Fragment>
        <section className="main-section sm-hide">
          {isOpen && (
            <LightboxWrapper
              mainSrc={preloadedImages[photoIndex].src}
              onCloseRequest={this.handleCloseLightBox}
              nextSrc={
                preloadedImages[(photoIndex + 1) % preloadedImages.length].src
              }
              prevSrc={
                preloadedImages[
                  (photoIndex + flattenImagesLength - 1) %
                    preloadedImages.length
                ].src
              }
              onMovePrevRequest={() =>
                this.setState({
                  photoIndex:
                    (photoIndex + flattenImagesLength - 1) %
                    preloadedImages.length
                })
              }
              onMoveNextRequest={() =>
                this.setState({
                  photoIndex: (photoIndex + 1) % flattenImagesLength
                })
              }
              imageLoadErrorMessage={""}
            />
          )}

          <div className="container">
            <p
              className="section-title section-title--type2"
              style={{ textAlign: "center" }}
            >
              Spotlight customer creations
            </p>
          </div>
          <div className="spotlight-slider">
            <SliderButtons next={this.nextSlide} prev={this.prevSlide} />
            <Slider ref={this.slider} {...settings}>
              {slides}
            </Slider>
          </div>
        </section>
      </Fragment>
    );
  }
}
