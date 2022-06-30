import React from "react";
import Slider from "react-slick";

import SliderButtons from "../../../_common/Buttons/SliderButtons";
import RingListSlide from "../../../_common/RingsSlider/RingListSlide";
import LazyLoadWithServer from '../../../_common/LazyLoadWithServer';

export default class WeddingSlider extends React.Component {
  constructor(props) {
    super(props);

    this.slider = React.createRef();
  }

  nextSlide = () => {
    this.slider.current.slickNext();
  };

  prevSlide = () => {
    this.slider.current.slickPrev();
  };

  render() {
    const { data, status, isMobile, size, title } = this.props;

    if (status !== "success") return null;

    const settings = {
      lassName: "main-slider slider",
      dots: false,
      arrows: false,
      infinite: false,
      autoplay: false,
      lazyLoad: true,
      slidesToShow: isMobile ? 1 : 4,
      slidesToScroll: 1
    };

    const slides = data.map((item, index) => (
      <RingListSlide
        data={item}
        position={index + 1}
        currentSize={size}
        key={`${item.id}_more_metals`}
        type="wedding"
      />
    ));

    return (
      <LazyLoadWithServer height="400px" once>
        <section className="recently-section ">
          <div className="container">
            <p className="section-title section-title--type3">{title}</p>
            <div className="home-slider-box prod-slider-box prod-slider-box--type2">
              <SliderButtons next={this.nextSlide} prev={this.prevSlide} />
              <Slider ref={this.slider} {...settings}>
                {slides}
              </Slider>
            </div>
          </div>
        </section>
      </LazyLoadWithServer>
    );
  }
}
