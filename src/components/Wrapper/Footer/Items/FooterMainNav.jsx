import React from "react";
import { NavLink } from "react-router-dom";
import routing from "../../../../config/routing";

import HeaderDiamondsSvg from "../../../../img/jsSvg/HeaderDiamondSvg";
import HeaderEngagementRingSvg from "../../../../img/jsSvg/HeaderEngagementRingSvg";
import HeaderWeddingRingSvg from "../../../../img/jsSvg/HeaderWeddingRingSvg";
import HeaderJewellerySvg from "../../../../img/jsSvg/HeaderJewellerySvg";

export default class FooterMainNav extends React.Component {
  render() {
    return (
      <ul className="theme-nav theme-nav--f-type">
        <li className="">
          <NavLink to={routing().diamondsFeed}>
            <span className="nav-ico">
              <HeaderDiamondsSvg />
            </span>
            Diamonds
          </NavLink>
        </li>

        <li className="">
          <NavLink to={routing().engagementFeed}>
            <span className="nav-ico">
              <HeaderEngagementRingSvg />
            </span>
            Engagement Rings
          </NavLink>
        </li>
        <li>
          <NavLink to={routing().weddingFeed}>
            <span className="nav-ico">
              <HeaderWeddingRingSvg />
            </span>
            Wedding Rings
          </NavLink>
        </li>
        <li>
          <NavLink to={routing().jewelleryFeed}>
            <span className="nav-ico">
              <HeaderJewellerySvg />
            </span>
            Jewellery
          </NavLink>
        </li>
      </ul>
    );
  }
}
