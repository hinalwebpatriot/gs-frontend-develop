import React from "react";
import { deviceSelector } from "../../_selectors/deviceSelector";
import { connect } from "react-redux";
import Slider from "react-slick";
import SpecialRingsSlideMobile from "./Items/SpecialRingsSlideMobile";
import SpecialRingsSlideDesktop from "./Items/SpecialRingsSlideDesktop";

import redArrow from "../../../img/svg/red_arrow.svg";
import SliderButtons from "../../_common/Buttons/SliderButtons";

class SpecialRingsBlock extends React.Component {
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
    const { data = [1, 2, 3, 4, 5, 6, 7, 8], isMobile, title } = this.props;

    const settings = {
      className: isMobile ? "slider-mob-preview" : "home-slider slider",
      dots: false,
      arrows: false,
      infinite: false,
      autoplay: false,
      slidesToShow: isMobile ? 3 : 4,
      slidesToScroll: 1
    };

    const slides = isMobile
      ? data.map(() => <SpecialRingsSlideMobile />)
      : data.map(() => <SpecialRingsSlideDesktop />);

    return (
      <section className="main-section">
        <div className="container">
          <p className="section-title">
            {title || "Let your occasion be special"}
          </p>
          <div className="home-slider-box">
            <SliderButtons next={this.nextSlide} prev={this.prevSlide} />
            {isMobile && <SpecialRingsSlideDesktop />} {/* mobile preview */}
            <Slider {...settings} ref={this.slider}>
              {slides}
            </Slider>
          </div>
          <div className="section-btn">
            <a href="#" className="theme-btn  ">
              Engagement rings
              <span className="btn-arrow">
                <img className="red-arrow" src={redArrow} alt="" />
              </span>
            </a>
          </div>
        </div>
      </section>
    );
  }
}

const mapStateToProps = (state, props) => ({
  ...props,
  isMobile: deviceSelector(state)
});

export default connect(mapStateToProps)(SpecialRingsBlock);
