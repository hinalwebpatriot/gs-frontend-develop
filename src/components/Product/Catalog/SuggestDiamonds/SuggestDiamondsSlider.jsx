import React from "react";
import Slider from "react-slick";

import SliderButtons from "../../../_common/Buttons/SliderButtons";
import SuggestDiamondSlide from "./SuggestDiamondsSlide";
import { connect } from "react-redux";
import selectors from "../../../_selectors/engagementProductSelectors";
import { fetchEngagementRingRecDiamonds } from "../CatalogPageActions";

class SuggestDiamondsSlider extends React.Component {
  constructor(props) {
    super(props);

    this.slider = React.createRef();
  }

  componentDidMount() {
    if (this.props.status !== "success") {
      this.props.fetchData(this.props.id);
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.id !== this.props.id) {
      this.props.fetchData(this.props.id);
    }
  }
  nextSlide = () => {
    this.slider.current.slickNext();
  };

  prevSlide = () => {
    this.slider.current.slickPrev();
  };

  render() {
    const { data, status, isMobile } = this.props;

    if (status !== "success") return null;

    const settings = {
      lassName: "main-slider slider",
      dots: false,
      arrows: false,
      infinite: true,
      autoplay: false,
      lazyLoad: true,
      slidesToShow: isMobile ? 1 : 4,
      slidesToScroll: 1
    };

    const slides = data.products.map((item, index) => (
      <SuggestDiamondSlide
        item={item}
        key={`${item.id}_suggest_diamond`}
        position={index + 1}
      />
    ));

    return (
      <section className="recently-section ">
        <div className="container">
          <p className=" section-title section-title--xs-type">{data.title}</p>
          <div className="home-slider-box prod-slider-box">
            <SliderButtons next={this.nextSlide} prev={this.prevSlide} />
            <Slider ref={this.slider} {...settings}>
              {slides}
            </Slider>
          </div>
        </div>
      </section>
    );
  }
}

const mapStateToProps = (state, props) => {
  const { data, status } = selectors.recommendedDiamonds(state);
  return { data, status, ...props };
};

const mapDispatchToProps = {
  fetchData: fetchEngagementRingRecDiamonds
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SuggestDiamondsSlider);
