import React from "react";
import { deviceSelector } from "../../_selectors/deviceSelector";
import { connect } from "react-redux";
import Slider from "react-slick";
import RingSlideMobile from "./Items/RingSlideMobile";
import RingSlideDesktop from "./Items/RingSlideDesktop";

import redArrow from "../../../img/svg/red_arrow.svg";
import SliderButtons from "../../_common/Buttons/SliderButtons";
import { Link } from "react-router-dom";
import routing from "../../../config/routing";

class RingSlider extends React.Component {
  constructor(props) {
    super(props);

    this.slider = React.createRef();

    this.state = {
      selected: 0,
      length: props.data.length - 1
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
    const { selected, length } = this.state;
    const slide = selected >= length ? length : selected + 1;

    this.slider.current.slickNext();
    this.handleSelect(slide);
  };

  prevSlide = () => {
    const { selected, length } = this.state;
    const slide = selected <= 0 ? length : selected - 1;

    this.slider.current.slickPrev();
    this.handleSelect(slide);
  };

  render() {
    const { data, title = "", id, isMobile, noButton } = this.props;
    const { selected } = this.state;

    const settings = {
      className: isMobile ? "slider-mob-preview" : "home-slider slider",
      dots: false,
      arrows: false,
      infinite: false,
      autoplay: false,
      lazyLoad: true,
      slidesToShow: isMobile ? 3 : 4,
      slidesToScroll: 1
    };

    const slides = isMobile
      ? data.map((item, index) => (
          <RingSlideMobile
            index={index}
            handleSelect={this.handleSelect}
            item={item}
            key={`slider_${id}_${item.id}`}
            alt={`Home page ${item.title}`}
          />
        ))
      : data.map(item => (
          <RingSlideDesktop item={item} key={`slider_${id}_${item.id}`} alt={`Home page ${item.title}`} />
        ));
    return (
      <section className="main-section">
        <div className="container">
          <p className="section-title">{title}</p>
          <div className="home-slider-box">
            <SliderButtons next={this.nextSlide} prev={this.prevSlide} />
            {isMobile && <RingSlideDesktop item={data[selected]} />}{" "}
            {/* mobile preview */}
            <Slider {...settings} ref={this.slider}>
              {slides}
            </Slider>
          </div>
          {!noButton && (
            <div className="section-btn">
              <Link to={routing().engagementFeed} className="theme-btn">
                Engagement rings
                <span className="btn-arrow">
                <img className="red-arrow" src={redArrow} alt="red arrow" />
              </span>
              </Link>
            </div>
          )}
        </div>
      </section>
    );
  }
}

const mapStateToProps = (state, props) => ({
  ...props,
  isMobile: deviceSelector(state)
});

export default connect(mapStateToProps)(RingSlider);
