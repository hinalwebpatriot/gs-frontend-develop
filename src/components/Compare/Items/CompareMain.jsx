import React from "react";
import SliderButtons from "../../_common/Buttons/SliderButtons";
import Slider from "react-slick";
import selectors from "../../_selectors/compareSelectors";
import {
  removeDiamondFromCompare,
  removeEngagementFromCompare,
  removeWeddingFromCompare,
  removeProductFromCompare,
  removePendantFromCompare,
  removeRingFromCompare,
  removeEarringFromCompare,
  removeBraceletFromCompare
} from "../CompareActions";
import { connect } from "react-redux";
import { Preloader } from "../../_common/Preloader";

import CompareDiamondTopSlide from "./Diamond/CompareDiamondTopSlide";
import CompareDiamondBottomSlide from "./Diamond/CompareDiamondBottomSlide";
import CompareRingTopSlide from "./Ring/CompareRingTopSlide";
import CompareEngagementBottomSlide from "./Engagement/CompareEngagementBottomSlide";
import CompareWeddingBottomSlide from "./Wedding/CompareWeddingBottomSlide";
import CompareCatalogTopSlide from "./Catalog/CompareCatalogTopSlide";
import CompareCatalogBottomSlide from "./Catalog/CompareCatalogBottomSlide";

class CompareMain extends React.Component {
  constructor(props) {
    super(props);

    this.topSlider = React.createRef();
    this.bottomSlider = React.createRef();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.currentTab !== this.props.currentTab) {
      if (this.topSlider.current && this.bottomSlider.current) {
        this.topSlider.current.slickGoTo(0);
        this.bottomSlider.current.slickGoTo(0);
      }
    }
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
    const {
      data,
      status,
      currentTab,
      removeDiamondFromCompare,
      removeEngagementFromCompare,
      removeWeddingFromCompare,
      removePendantFromCompare,
      removeRingFromCompare,
      removeEarringFromCompare,
      removeBraceletFromCompare
    } = this.props;

    if (currentTab === null) {
      return "Select tab";
    }

    if (status === "request") {
      return (
        <div className="row fav-list-row">
          <Preloader margin="0 400px" />
        </div>
      );
    }

    let topSlides = [];
    let bottomSlides = [];
    const category = data[currentTab].items;


    switch (currentTab) {
      case "diamond":
        topSlides = category.map((item, index) => (
          <CompareDiamondTopSlide
            data={item}
            removeAction={removeDiamondFromCompare}
            key={`${item.id}_diamond_top_compare`}
            position={index + 1}
          />
        ));
        bottomSlides = category.map(item => (
          <CompareDiamondBottomSlide
            data={item}
            key={`${item.id}_diamond_bot_compare`}
          />
        ));
        break;
      case "engagement":
        topSlides = category.map((item, index) => (
          <CompareRingTopSlide
            data={item}
            removeAction={removeEngagementFromCompare}
            currentTab={currentTab}
            key={`${item.id}_engagement_top_compare`}
            position={index + 1}
          />
        ));
        bottomSlides = category.map(item => (
          <CompareEngagementBottomSlide
            data={item}
            key={`${item.id}_engagement_bot_compare`}
          />
        ));
        break;
      case "wedding":
        topSlides = category.map((item, index) => (
          <CompareRingTopSlide
            data={item}
            removeAction={removeWeddingFromCompare}
            currentTab={currentTab}
            key={`${item.id}_wedding_top_compare`}
            position={index + 1}
          />
        ));
        bottomSlides = category.map(item => (
          <CompareWeddingBottomSlide
            data={item}
            key={`${item.id}_wedding_bot_compare`}
          />
        ));
        break;
      case "earring":
        topSlides = category.map((item, index) => (
            <CompareCatalogTopSlide
                data={item}
                removeAction={removeEarringFromCompare}
                currentTab={currentTab}
                key={`${item.id}_product_top_compare`}
                position={index + 1}
            />
        ));
        bottomSlides = category.map(item => (
            <CompareCatalogBottomSlide
                data={item}
                key={`${item.id}_product_bot_compare`}
            />
        ));
        break;
      case "pendant":
        topSlides = category.map((item, index) => (
            <CompareCatalogTopSlide
                data={item}
                removeAction={removePendantFromCompare}
                currentTab={currentTab}
                key={`${item.id}_product_top_compare`}
                position={index + 1}
            />
        ));
        bottomSlides = category.map(item => (
            <CompareCatalogBottomSlide
                data={item}
                key={`${item.id}_product_bot_compare`}
            />
        ));
        break;
      case "ring":
        topSlides = category.map((item, index) => (
            <CompareCatalogTopSlide
                data={item}
                removeAction={removeRingFromCompare}
                currentTab={currentTab}
                key={`${item.id}_product_top_compare`}
                position={index + 1}
            />
        ));
        bottomSlides = category.map(item => (
            <CompareCatalogBottomSlide
                data={item}
                key={`${item.id}_product_bot_compare`}
            />
        ));
        break;
      case "bracelet":
        topSlides = category.map((item, index) => (
            <CompareCatalogTopSlide
                data={item}
                removeAction={removeBraceletFromCompare}
                currentTab={currentTab}
                key={`${item.id}_product_top_compare`}
                position={index + 1}
            />
        ));
        bottomSlides = category.map(item => (
            <CompareCatalogBottomSlide
                data={item}
                key={`${item.id}_product_bot_compare`}
            />
        ));
        break;
      default: break;
    }

    if (!category.length) {
      return (
        <div
          className="row fav-list-row"
          style={{
            height: "60vh",
            padding: "20vh 0",
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
      slidesToShow: category.length < 4 ? category.length : 4,
      slidesToScroll: 1,
      afterChange: this.setSlide,
      responsive: [
        {
          breakpoint: 991,
          settings: {
            slidesToShow: category.length < 3 ? category.length : 3
          }
        },
        {
          breakpoint: 767,
          settings: {
            slidesToShow: category.length < 2 ? category.length : 2
          }
        }
      ]
    };

    // if (items.length < 3) {
    //   return (
    //     <div className="compare-main">
    //       <div className="compare-main__top">
    //         <div className="compare-row compare-top-slider">{topSlides}</div>
    //       </div>
    //       <div className="compare-main__bottom">
    //         <div className="compare-table compare-table-slider">{bottomSlides}</div>
    //       </div>
    //     </div>
    //   );
    // }

    return (
      <div className="compare-main">
        {category.length > 4 && (
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

const mapStateToProps = (state, props) => ({
  data: selectors.data(state),
  status: selectors.status(state),
  ...props
});

const mapDispatchToProps = {
  removeDiamondFromCompare,
  removeEngagementFromCompare,
  removeWeddingFromCompare,
  removeProductFromCompare,
  removePendantFromCompare,
  removeRingFromCompare,
  removeEarringFromCompare,
  removeBraceletFromCompare

};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CompareMain);
