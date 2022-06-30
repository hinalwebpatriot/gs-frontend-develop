import React from "react";
import track from "../../../img/svg/track2.svg";
import redArrow from "../../../img/svg/red_arrow.svg";
import { Link } from 'react-router-dom';
import routing from '../../../config/routing';

const FreeShippingItem = () => (
  <Link to={routing().freeShipping} className="prod-link">
    <span className="prod-link-icon">
      <img src={track} alt="product icon" />
    </span>
    Free shipping in Australia and New Zealand
    <span className="prod-link-arrow">
      <img className="red-arrow" src={redArrow} alt="red arrow" />
    </span>
  </Link>
);

export default FreeShippingItem;
