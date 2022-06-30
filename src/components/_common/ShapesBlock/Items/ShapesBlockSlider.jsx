import React from "react";
import Slider from "react-slick";

import ShapesBlockListItem from "./ShapesBlockListItem";

import SliderButtons from "../../Buttons/SliderButtons";

export default class ShapesBlockSlider extends React.Component {
  speed = 500;
  changing = false;

  constructor(props) {
    super(props);

    this.slider = React.createRef();
  }

  setChanging() {
    this.changing = true;

    setTimeout(() => {
      this.changing = false;
    }, this.speed + 200);
  }

  nextSlide = () => {
    if (this.changing) return;
    this.setChanging();
    const { data } = this.props;
    let { currentIndex, currentSlug, length } = this.props.currentSlide;
    const nextIndex = (++currentIndex) % length;
    this.slider.current.slickNext();
    this.props.handleSelect(data[nextIndex].id, currentSlug, nextIndex);
  };

  prevSlide = () => {
    if (this.changing) return;
    this.setChanging();
    const { data } = this.props;
    let { currentIndex, currentSlug, length } = this.props.currentSlide;
    const prevIndex = currentIndex === 0 ? length - 1 : (--currentIndex);
    this.slider.current.slickPrev();
    this.props.handleSelect(data[prevIndex].id, currentSlug, prevIndex);
  };

  render() {
    const { data = [], handleSelect } = this.props;

    const settings = {
      className: "tab-list",
      dots: false,
      arrows: false,
      infinite: true,
      autoplay: false,
      // lazyLoad: true,
      slidesToShow: 3,
      slidesToScroll: 1,
      centerMode: false,
      centerPadding: '5px',
      speed: this.speed
    };

    const slides = data.map((item, index) => (
      <ShapesBlockListItem
        key={`shape_${item.id}`}
        id={item.id}
        title={item.title}
        alt={`Shapes block slider ${item.alt}`}
        image={item.preview_image}
        index={index}
        slug={item.slug}
        handleSelect={handleSelect}
      />
    ));

    return (
      <div className="tab-list-box">
        <SliderButtons next={this.nextSlide} prev={this.prevSlide} />
        <Slider {...settings} ref={this.slider}>
          {slides}
        </Slider>
      </div>
    );
  }
}
