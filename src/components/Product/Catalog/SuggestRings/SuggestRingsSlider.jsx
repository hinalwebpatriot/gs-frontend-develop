import React from "react";
import Slider from "react-slick";

import SliderButtons from "../../../_common/Buttons/SliderButtons";
import SuggestRingsSlide from "./SuggestRingsSlide";
import { connect } from "react-redux";
import selectors from "../../../_selectors/engagementProductSelectors";
import { fetchEngagementRingRecRings } from "../CatalogPageActions";

class SuggestRingsSlider extends React.Component {
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
    const { data, status, isMobile, size } = this.props;

    if (status !== "success") return null;

    const settings = {
      className: "main-slider slider",
      dots: false,
      arrows: false,
      infinite: false,
      autoplay: false,
      lazyLoad: true,
      slidesToShow: isMobile ? 1 : 4,
      slidesToScroll: 1
    };

    const slides = data.products.map((item, index) => (
      <SuggestRingsSlide
        item={item}
        size={size}
        key={`${item.id}_suggest_ring`}
        position={index + 1}
      />
    ));

    return (
      <section className="recently-section ">
        <div className="container">
          <p className="section-title section-title--type3">{data.title}</p>
          <div className="row justify-content-center ">
            <div className="col-lg-6 subtitle-wrap">
              <p className="theme-subtitle theme-subtitle--type2  theme-subtitle--smaller">
                {data.subtitle}
              </p>
            </div>
          </div>
          <div className="home-slider-box prod-slider-box prod-slider-box--type2">
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
  const { data, status } = selectors.recommendedEngagementRings(state);

  return { data, status, ...props };
};

const mapDispatchToProps = {
  fetchData: fetchEngagementRingRecRings
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SuggestRingsSlider);
