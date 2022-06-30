import React from "react";
import { Link } from "react-router-dom";
import FasterSvg from "../../../img/svg/faster.svg";
import redArrow from "../../../img/svg/red_arrow.svg";
import routing from "../../../config/routing";

const NeedFasterItem = () => (
  <div className="product-info__item product-info__item--type2">
    <div className="faster">
      <div className="faster__icon">
        <img src={FasterSvg} alt="fast icon" />
      </div>
      <div className="faster__text">
        <p>Need faster?</p>
        <Link to={routing().contactUs} className="prod-link">
          Contact our sales team
          <span className="prod-link-arrow">
            <img className="red-arrow" src={redArrow} alt="red arrow" />
          </span>
        </Link>
      </div>
    </div>
  </div>
);

export default NeedFasterItem;
