import React from "react";
import { Link } from 'react-router-dom';

export default function BestSellersImageBlock({ image, link, isFirst }) {
  return (
    <div className="container">
      <div className={`series-banner ${isFirst ? "" : "series-banner--type4"}`}>
        <div className="series-banner__img">
          { link ? (
            <Link to={link}>
              <img src={image} alt="" />
            </Link>
          ) :  <img src={image} alt="" />}
        </div>
      </div>
    </div>
  );
}
