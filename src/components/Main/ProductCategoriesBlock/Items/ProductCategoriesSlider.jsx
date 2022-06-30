import React from "react";
import Slider from "react-slick";
import ProductCategoriesSlide from "./ProductCategoriesSlide";
import slideArrow from "../../../../img/svg/slide_arrow.svg";
import { connect } from "react-redux";
import { deviceSelector } from "../../../_selectors/deviceSelector";
import { citySelector } from "../../../_selectors/citySelectors"

class ProductCategoriesSlider extends React.Component {
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
    const { data, isMobile, city } = this.props;

    const settings = {
      className: "home-slider slider",
      dots: false,
      arrows: false,
      infinite: false,
      autoplay: false,
      slidesToShow: isMobile ? 2 : 4,
      slidesToScroll: 1
    };


    const slides = data.map(({name, id, image, slug, alt}, index) =>{
      let trueSlug;
      if(name === "Earrings"){
        trueSlug = 'jewellery/earrings'
      } else if (name === "Pendants"){
        trueSlug = 'jewellery/pendant'
      } else if(name === "Bracelets"){
        trueSlug = 'jewellery/bracelets'
      } else {
        trueSlug = slug;
      }
      return(
        <ProductCategoriesSlide
        key={`product_cat_${id}`}
        index={index}
        name={name}
        id={id}
        image={image}
        slug={city === 'sydney' ? trueSlug : `/${city}` + trueSlug}
        alt={alt ? alt : `product categories ${name}`}
      />
    )});

    if (!isMobile) {
      return (
        <div className="home-slider-box product-box">
          <div className="home-slider slider">{slides}</div>
        </div>
      );
    }

    return (
      <div className="home-slider-box product-box">
        <button className="slider-btn sm-show">
          <span className="slider-btn__arrow" onClick={this.prevSlide}>
            <img className="slide-arrow" src={slideArrow} alt="" />
          </span>
        </button>
        <button
          className="slider-btn slider-btn--type2 sm-show"
          onClick={this.nextSlide}
        >
          <span className="slider-btn__arrow">
            <img className="slide-arrow" src={slideArrow} alt="" />
          </span>
        </button>
        <Slider ref={this.slider} {...settings}>
          {slides}
        </Slider>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  ...props,
  isMobile: deviceSelector(state),
  city: citySelector(state),
});

export default connect(mapStateToProps)(ProductCategoriesSlider);
