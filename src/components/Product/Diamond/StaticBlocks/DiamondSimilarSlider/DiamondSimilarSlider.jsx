import React from "react";
import { flowRight as compose } from "lodash";
import { deviceSelector } from "../../../../_selectors/deviceSelector";
import { connect } from "react-redux";
import Slider from "react-slick";
import SliderButtons from "../../../../_common/Buttons/SliderButtons";
import { withRouter } from "react-router-dom";
import api from "../../../../../config/api";
import DiamondSimilarSlideMobile from "./DiamondSimilarSlideMobile";
import DiamondSimilarSlideDesktop from "./DiamondSimilarSlideDesktop";
import routing from "../../../../../config/routing";

class DiamondSimilarBlock extends React.Component {
  constructor(props) {
    super(props);

    this.slider = React.createRef();
    this.state = {
      status: "request",
      data: [],
      selected: {}
    };
  }

  componentDidMount() {
    // .getSimilarDiamonds(this.props.id)
    api.diamond
      .getSimilarDiamonds(this.props.id)
      .then(res => {
        if (res.status === 200) {
          this.setState({
            status: "success",
            data: res.data.data,
            selected: res.data.data[0]
          });
        }
      })
      .catch(err => {

        this.setState({
          status: "failure"
        });
      });
  }

  handleSelect = item => {
    this.setState({ selected: item });
  };

  nextSlide = () => {
    this.slider.current.slickNext();
  };

  prevSlide = () => {
    this.slider.current.slickPrev();
  };

  render() {
    const { status, data = [], selected } = this.state;
    const { isMobile } = this.props;

    if (status !== "success" || !data.length) return null;

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
          <DiamondSimilarSlideMobile
            key={`similar_mob_${item.id}`}
            image={item.preview_image.path}
            item={item}
            handleSelect={this.handleSelect}
            position={index + 1}
          />
        ))
      : data.map((item, index) => (
          <DiamondSimilarSlideDesktop
            key={`similar_${item.id}`}
            item={item}
            slug={item.slug}
            title={item.title}
            subtitle={item.subtitle}
            price={item.price}
            image={item.preview_image.path}
            id={item.id}
            position={index + 1}
          />
        ));

    return (
      <section className="recently-section ">
        <div className="container">
          <p className="section-title">Recently bought similar</p>
          <div className="home-slider-box prod-slider-box">
            <SliderButtons next={this.nextSlide} prev={this.prevSlide} />
            {isMobile && (
              <DiamondSimilarSlideDesktop
                key={`similar_${selected.id}`}
                slug={selected.slug}
                title={selected.title}
                subtitle={selected.subtitle}
                price={selected.price}
                image={selected.preview_image.path}
                id={selected.id}
              />
            )}{" "}
            {/* mobile preview */}
            <Slider {...settings} ref={this.slider}>
              {slides}
            </Slider>
          </div>
          <div className="section-btn section-btn--type2">
            <button
              className="theme-btn theme-btn--bigger theme-btn--type2"
              onClick={() => this.props.history.push(routing().diamondsFeed)}
            >
              Back to diamonds
            </button>
            {/*<button className="theme-btn theme-btn--bigger  ">Order Custom jewelry design</button>*/}
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

export default compose(
  withRouter,
  connect(mapStateToProps)
)(DiamondSimilarBlock);
