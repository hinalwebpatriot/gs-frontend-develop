import React from "react";
import Slider from "react-slick";

import redArrow from "../../../../../img/svg/red_arrow.svg";
import SliderButtons from "../../../../_common/Buttons/SliderButtons";
import DiamondRingSlideMobile from "./DiamondRingSlideMobile";
import DiamondRingSlideDesktop from "./DiamondRingSlideDesktop";
import { Link } from "react-router-dom";
import routing from "../../../../../config/routing";
import { get } from 'lodash'

export default class DiamondRingSlider extends React.Component {
  constructor(props) {
    super(props);

    this.slider = React.createRef();

    this.state = {
      selected: get(props, 'data[0].id', null)
    };
  }

  componentDidMount() {
    if (this.props.status !== 'success') {
      this.props.fetchData();
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.data.length === 0 && this.props.data.length !== 0) {
      this.setState({
        selected: get(this.props, 'data[0].id', null)
      })
    }
  }

  nextSlide = () => {
    this.slider.current.slickNext();
  };

  prevSlide = () => {
    this.slider.current.slickPrev();
  };

  handleSelect = id => {
    this.setState({
      selected: id
    });
  };

  render() {
    const { data = [], isMobile, title, status } = this.props;
    const { selected } = this.state;

    if (status !== "success") {
      return null;
    }

    if (!data.length) {
      return null;
    }

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
          <DiamondRingSlideMobile
            product={item}
            key={`${title.slice(3)}_${item.id}_diamond_ring_feed_slid`}
            handleSelect={this.handleSelect}
            position={index + 1}
          />
        ))
      : data.map((item, index) => (
          <DiamondRingSlideDesktop
            product={item}
            key={`${title.slice(3)}_${item.id}_diamond_ring_feed_slid`}
            position={index + 1}
          />
        ));

    const previewDiamond = data.find(item => selected === item.id) || data[0];

    return (
      <section className="main-section">
        <div className="container">
          {title && <p className="section-title">{title}</p>}
          <div className="home-slider-box">
            <SliderButtons next={this.nextSlide} prev={this.prevSlide} />
            {isMobile && (
              <DiamondRingSlideDesktop product={previewDiamond} position={0} />
            )}{" "}
            {/* mobile preview */}
            <Slider {...settings} ref={this.slider}>
              {slides}
            </Slider>
          </div>
          <div className="section-btn">
            <Link to={routing().engagementFeed} className="theme-btn  ">
              Engagement rings
              <span className="btn-arrow">
                <img className="red-arrow" src={redArrow} alt="" />
              </span>
            </Link>
          </div>
        </div>
      </section>
    );
  }
}
