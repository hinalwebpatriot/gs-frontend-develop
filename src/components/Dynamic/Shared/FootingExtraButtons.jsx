import React from "react";
import { Link, withRouter } from "react-router-dom";
import routing from "../../../config/routing";
import buy1 from "../../../img/svg/buy1_1.svg";
import buy2 from "../../../img/svg/buy2.svg";
import BuyArrowSvg from "../../../img/jsSvg/BuyArrowSvg";

function FootingExtraButtons({ history }) {
  return (
    <div className="container">
      <div className="landing-extra">
        <div className="d-flex landing-extra__btn">
          <button
            className="buy-btn"
            onClick={() => history.push(routing().diamondsFeed)}
          >
            <span className="buy-btn__icon">
              <img src={buy2} alt="" />
            </span>
            <span className="buy-btn__text">Choose diamond</span>
            <span className="buy-btn__arrow">
              <BuyArrowSvg />
            </span>
          </button>
          <button
            className="buy-btn"
            onClick={() => history.push(routing().engagementFeed)}
          >
            <span className="buy-btn__icon">
              <img src={buy1} alt="" />
            </span>
            <span className="buy-btn__text">Choose setting</span>
            <span className="buy-btn__arrow">
              <BuyArrowSvg />
            </span>
          </button>
        </div>
        <div className="landing-extra__link">
          <Link to={routing().metalsMadeEasy} className="prod-link">
            Metals made easy
          </Link>
          <Link to={routing().howToChooseStyle} className="prod-link">
            How to pick your style
          </Link>
          <Link to={routing().sixThingsToLook} className="prod-link">
            6 things to look for in a diamond
          </Link>
        </div>
      </div>
    </div>
  );
}

export default withRouter(FootingExtraButtons);
