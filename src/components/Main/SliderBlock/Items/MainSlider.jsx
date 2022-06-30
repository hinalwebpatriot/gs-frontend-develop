import React, { Fragment } from "react";
import Slider from "react-slick";

import MainSliderItem from "./MainSliderItem";
import SliderButtons from "../../../_common/Buttons/SliderButtons";

export default class MainSlider extends React.Component {
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
    const { data = [], city } = this.props;
    const settings = {
      dots: false,
      arrows: true,
      infinite: true,
      autoplay: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      lazyLoad: true,
      dotsClass: "slider-dot",
      className: 'main-slider',
      appendDots: dots => (
        <div className="slider-dot">
          <ul>{dots}</ul>
        </div>
      )
    };
    
    const slides = data.map((slide, index) => {
      if (slide.slider_text) {
        return (
          <MainSliderItem
            key={index}
            palette={slide.bg_color}
            image={slide.image}
            browseButton={slide.browse_button_title}
            browseButtonLink={slide.browse_button_link}
            detailsButton={slide.detail_button_title}
            detailsButtonLink={slide.detail_button_link}
            alt={slide.alt}
            htmlBlock={slide.slider_text}
            index={index}
            city={city}
          />
        )
      }

     return  <a key={`main_slider_${index}`} href={slide.browse_button_link || ''}>
        <MainSliderItem
          palette={slide.bg_color}
          image={slide.image}
          browseButton={slide.browse_button_title}
          browseButtonLink={slide.browse_button_link}
          detailsButton={slide.detail_button_title}
          detailsButtonLink={slide.detail_button_link}
          alt={slide.alt}
          index={index}
          city={city}
        />
      </a>
    });
  
    return (
      <Fragment>
        <section className="home-section">
          <div className="main-slider-box">
            <SliderButtons next={this.nextSlide} prev={this.prevSlide} />
            {/*<div className="main-slider">*/}
              <Slider ref={this.slider} {...settings}>
                {slides}
              </Slider>
            {/*</div>*/}
          </div>
        </section>
      </Fragment>
    );
  }
}
