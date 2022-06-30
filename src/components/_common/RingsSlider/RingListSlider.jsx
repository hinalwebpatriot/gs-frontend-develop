import React from "react";
import { deviceSelector } from "../../_selectors/deviceSelector";
import { connect } from "react-redux";
import Slider from "react-slick";
import SliderButtons from "../Buttons/SliderButtons";
import RingListSlide from "./RingListSlide";
import GoogleEE from '../GoogleEE/GoogleEE';

class RingListSlider extends React.Component {
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
    const { isMobile, status, data, type, currentSize, customCount } = this.props;

    if (status !== "success" || !data.products.length) return null;

    const settings = {
      className: "home-slider slider",
      dots: false,
      arrows: false,
      infinite: false,
      autoplay: false,
      lazyLoad: true,
      slidesToShow: isMobile ? 1 : (customCount || 3),
      slidesToScroll: 1,
    };

    const slides = data.products.map((item, index) => (
      <RingListSlide
        key={`${item.id}-${data.title}`}
        data={item}
        type={type}
        currentSize={currentSize}
        position={index + 1}
        list={GoogleEE.LIST_SLIDER}
      />
    ));

    return (
      <section className="inner-slider">
        <p className="section-title">{data.title}</p>
        <div className="home-slider-box ">
          <SliderButtons next={this.nextSlide} prev={this.prevSlide} />
          <Slider {...settings} ref={this.slider}>
            {slides}
          </Slider>
        </div>
      </section>
    );
  }
}

const mapStateToProps = (state, props) => ({
  ...props,
  isMobile: deviceSelector(state)
});

export default connect(mapStateToProps)(RingListSlider);
