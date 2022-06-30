import React from "react";
import ShapesBlockMain from "./Items/ShapesBlockMain";
import ShapesBlockSlider from "./Items/ShapesBlockSlider";
import { connect } from "react-redux";
import { citySelector } from "../../_selectors/citySelectors";

import redArrow from "../../../img/svg/red_arrow.svg";
import { Link } from "react-router-dom";
import ImageLoader from '../ImageLoader';

class ShapesBlock extends React.Component {
  render() {
    const { data, selected, handleSelect, path, title, page, type, currentSlide, isMobile, city } = this.props;
    const selectedItem = data[currentSlide.currentIndex] || data[0] || null;
    const linkText = (page === 'feed' && type === 'engagement') 
      ? `Engagement rings with ${selectedItem.title} Diamonds`
      : `Choose your ${selectedItem.title} diamond`;
    let pageCategory = '';
    if (page === 'feed' && type === 'engagement') {
      pageCategory = 'engagement-rings/';
    }
    if (page === 'main') {
      pageCategory = 'diamonds/';
    }
    const template = (
      <div className="occasion-section test">
        <div className="row no-gutters">
          <div
            className={`occasion-section__container col-12 col-lg-6 ${page === "feed" ? "sm-hide" : ""}`}
          >
            {(selectedItem.banner) ? 
            <div className="occasion-img">
              <ImageLoader src={selectedItem.banner} alt="GS Diamonds - best engagement rings" importance="high" />
            </div>
            :'' }
          </div>
          <div className="col-12 col-lg-6">
            <div className="occasion-block">
              <p className="section-title text-center">{title}</p>
              <div className="tab-slider occasion-block__slider">
                <ShapesBlockMain
                  image={selectedItem.preview_image}
                  title={selectedItem.title}
                  alt={`Shapes block slider ${selectedItem.alt}`}
                />
                <ShapesBlockSlider currentSlide={currentSlide} data={data} handleSelect={handleSelect} isMobile={isMobile} />
              </div>
              <div className="occasion-block__btn">
                <Link
                  to={ `${city === 'sydney' ? '/' : `/${city}/`}${pageCategory}${selectedItem.slug}` || "#"}
                  className="default-btn default-btn--bigger"
                >
                  {linkText}
                  <span className="btn-arrow">
                      <img className="red-arrow" src={redArrow} alt="red arrpw" />
                    </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    )

    return template;

    // if (page === 'main') {
    //   return template
    // } else {
    //   const lazyOptions = {
    //     offset: 0,
    //     height: "718px",
    //     once: true,
    //   };
    //
    //   return template
    //
    //   return (
    //     <LazyLoadWithServer {...lazyOptions} forceLoad>
    //       {template}
    //     </LazyLoadWithServer>
    //   );
    // }
  }
}

const mapStateToProps = (state) => {
  return {
    city: citySelector(state),
  }
};

export default connect(
  mapStateToProps,
  {}
)(ShapesBlock);
