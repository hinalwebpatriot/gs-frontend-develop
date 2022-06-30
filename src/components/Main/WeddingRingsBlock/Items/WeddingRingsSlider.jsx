import React from "react";
import Slider from "react-slick";
import { connect } from "react-redux";
import { deviceSelector } from "../../../_selectors/deviceSelector";
import WeddingRingsSliderItem from "./WeddingRingsSliderItem";
import WeddingRingsSliderItemMobile from "./WeddingRingsSliderItemMobile";
import SliderButtons from "../../../_common/Buttons/SliderButtons";

class WeddingRingsSlider extends React.Component {
  constructor(props) {
    super(props);

    this.slider = React.createRef();

    this.state = {
      selected: 0
    };
  }

  handleSelect = index => {
    if (this.state.selected !== index) {
      this.setState({
        selected: index
      });
    }
  };

  nextSlide = () => {
    this.slider.current.slickNext();
  };

  prevSlide = () => {
    this.slider.current.slickPrev();
  };

  render() {
    const { data, isMobile } = this.props;
    const { selected } = this.state;

    //TODO: Replace mobile view logic to desktop view
    const settings = {
      className: isMobile ? "slider-mob-preview" : "home-slider slider",
      dots: false,
      arrows: false,
      infinite: false,
      autoplay: false,
      draggable: false,
      swipe: false,
      slidesToShow: isMobile ? 3 : 4,
      // slidesToShow: data.length < 3 ? data.length : 3,
      slidesToScroll: 1
    };

    const slides = isMobile
      ? data.map((slide, index) => (
          <WeddingRingsSliderItemMobile
            index={index}
            handleSelect={this.handleSelect}
            key={`weddingSlider_${index}_m`}
            data={slide}
          />
        ))
      : data.map((slide, index) => (
          <WeddingRingsSliderItem key={`weddingSlider_${index}`} data={slide} />
        ));

    console.log('isMobile', isMobile);
    return (
      <div className="home-slider-box product-slider-box">
        <div className="main-slider-box">
          <SliderButtons next={this.nextSlide} prev={this.prevSlide} />
          {/*<WeddingRingsSliderItem data={data[selected]} />*/}
          <Slider ref={this.slider} {...settings}>
            {slides}
          </Slider>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  ...props,
  isMobile: deviceSelector(state)
});

export default connect(mapStateToProps)(WeddingRingsSlider);
