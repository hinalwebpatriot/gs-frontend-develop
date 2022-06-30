import React from "react";
import SliderButtons from "../../_common/Buttons/SliderButtons";
import Slider from "react-slick";
import { Preloader } from "../../_common/Preloader";

import CompareDiamondTopSlide from "../Items/Diamond/CompareDiamondTopSlide";
import CompareDiamondBottomSlide from "../Items/Diamond/CompareDiamondBottomSlide";
import CompareRingTopSlide from "../Items/Ring/CompareRingTopSlide";
import CompareEngagementBottomSlide from "../Items/Engagement/CompareEngagementBottomSlide";
import CompareWeddingBottomSlide from "../Items/Wedding/CompareWeddingBottomSlide";

export default class CompareShareMain extends React.Component {
  constructor(props) {
    super(props);

    this.topSlider = React.createRef();
    this.bottomSlider = React.createRef();
  }

  nextSlide = () => {
    this.topSlider.current.slickNext();
    this.bottomSlider.current.slickNext();
  };

  prevSlide = () => {
    this.topSlider.current.slickPrev();
    this.bottomSlider.current.slickPrev();
  };

  setSlide = index => {
    this.topSlider.current.slickGoTo(index);
    this.bottomSlider.current.slickGoTo(index);
  };

  render() {
    const { data, status, currentTab } = this.props;

    if (status === "request") {
      return (
        <div className="row fav-list-row">
          <Preloader margin="0 400px" />
        </div>
      );
    }

    let topSlides = [];
    let bottomSlides = [];

    switch (currentTab) {
      case "diamond":
        topSlides = data.map(item => (
          <CompareDiamondTopSlide
            data={item}
            key={`${item.id}_diamond_top_compare`}
          />
        ));
        bottomSlides = data.map(item => (
          <CompareDiamondBottomSlide
            data={item}
            key={`${item.id}_diamond_bot_compare`}
          />
        ));
        break;
      case "engagement":
        topSlides = data.map(item => (
          <CompareRingTopSlide
            data={item}
            currentTab={currentTab}
            key={`${item.id}_engagement_top_compare`}
          />
        ));
        bottomSlides = data.map(item => (
          <CompareEngagementBottomSlide
            data={item}
            key={`${item.id}_engagement_bot_compare`}
          />
        ));
        break;
      case "wedding":
        topSlides = data.map(item => (
          <CompareRingTopSlide
            data={item}
            currentTab={currentTab}
            key={`${item.id}_wedding_top_compare`}
          />
        ));
        bottomSlides = data.map(item => (
          <CompareWeddingBottomSlide
            data={item}
            key={`${item.id}_wedding_bot_compare`}
          />
        ));
        break;
        default:
          break;
    }

    if (!data.length) {
      return (
        <div
          className="row fav-list-row"
          style={{
            height: "60vh",
            padding: "20vh 0",
            width: "100%",
            justifyContent: "center"
          }}
        >
          <div className="section-title">No items</div>
        </div>
      );
    }

    const settings = {
      dots: false,
      arrows: false,
      infinite: false,
      autoplay: false,
      draggable: false,
      centerPadding: 0,
      slidesToShow: data.length < 4 ? data.length : 4,
      slidesToScroll: 1,
      afterChange: this.setSlide,
      responsive: [
        {
          breakpoint: 991,
          settings: {
            slidesToShow: data.length < 3 ? data.length : 3
          }
        },
        {
          breakpoint: 767,
          settings: {
            slidesToShow: data.length < 2 ? data.length : 2
          }
        }
      ]
    };

    return (
      <div className="compare-main compare-main--shared">
        {data.length > 4 && (
          <SliderButtons next={this.nextSlide} prev={this.prevSlide} />
        )}
        <div className="compare-main__top">
          <Slider
            ref={this.topSlider}
            className="compare-row compare-top-slider"
            {...settings}
          >
            {topSlides}
          </Slider>
        </div>
        <div className="compare-main__bottom">
          <Slider
            ref={this.bottomSlider}
            className="compare-table compare-table-slider"
            {...settings}
          >
            {bottomSlides}
          </Slider>
        </div>
      </div>
    );
  }
}
