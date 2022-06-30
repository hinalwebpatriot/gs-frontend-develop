import React from "react";
import { Link, withRouter } from "react-router-dom";
import routing from "../../../config/routing";

class DiamondSuggestion extends React.Component {
  render() {
    const { shape_list } = this.props.data;

    if (!shape_list.length) {
      return null;
    }

    const shapeSuggestions = shape_list.map(shape => {
      const urlSize = this.props.location.search.split("=").pop();
      const linkParams = {
        id: shape.ring_id,
        slug: shape.h1,
        size: urlSize
      };

      return (
        <div className="suggest-item" key={`shape_sug_${shape.id}`}>
          <Link to={routing(linkParams).engagementProduct.toLowerCase()}>
            <div className="suggest-item__img">
              <img src={shape.image} alt={`Diamond Suggestion: ${shape.title}`} />
              <div className="suggest-label">{shape.title}</div>
            </div>
          </Link>
        </div>
      );
    });

    return (
      <div className="suggest">
        <p className="theme-subtitle">Diamond suggestions</p>
        <p className="infp-p info-p--type2 info-p--type2--grey">
          This ring can be set with
        </p>
        <div className="suggest-block d-flex">{shapeSuggestions}</div>

        {/*<div className="recomended d-flex">*/}
        {/*<div className="recomended__icon">*/}
        {/*<SettingWithDiamondSvg />*/}
        {/*</div>*/}
        {/*<div className="recomended__text">*/}
        {/*<p className="theme-subtitle theme-subtitle--smaller">Recommended</p>*/}
        {/*<p className="info-p info-p--type2 info-p--type2--grey">*/}
        {/*Center stone weight:*/}
        {/*<span className="bold red"> 0.25-8.0 carats</span>*/}
        {/*</p>*/}
        {/*</div>*/}
        {/*</div>*/}
      </div>
    );
  }
}

export default withRouter(DiamondSuggestion);
