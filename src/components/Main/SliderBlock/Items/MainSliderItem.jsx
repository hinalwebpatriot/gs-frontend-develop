import React from "react";
import { removeAllTags } from '../../../../utils/htmlRegex';
// import sanitizeHtml from "sanitize-html";
// import DOMPurify from 'dompurify';

const cities = ['brisbane', 'melbourne', 'perth', 'adelaide', 'canberra'];

class MainSliderItem extends React.Component {
  addCityToLinks = (str) => {
    let result = str;
    const { city } = this.props;
    if (cities.includes(city)) {
      result = result.replace('/diamonds/', `/${city}/diamonds/`);
      result = result.replace('/engagement-rings/', `/${city}/engagement-rings/`);
      result = result.replace('/jewellery', `/${city}/jewellery`);
    }

    return result;
  }
  render() {
    const {
      image,
      browseButton,
      detailsButton,
      browseButtonLink,
      detailsButtonLink,
      alt,
      htmlBlock
    } = this.props;

    return (
      <div className="main-slide">
        <img src={image} alt={alt} importance="high" />

        {htmlBlock && <div className="html-container" dangerouslySetInnerHTML={{ __html: this.addCityToLinks(htmlBlock) }}></div>}

        <div className="home-btn xs-show">
          {browseButton && (
            <a
              href={browseButtonLink}
              className="home-btn__item home-btn__item--type2"
            >
              {browseButton}
            </a>
          )}

          {detailsButton && (
            <a href={detailsButtonLink} className="home-btn__item">
              {detailsButton}
            </a>
          )}
        </div>
      </div>
    );
  }
}

export default MainSliderItem;
