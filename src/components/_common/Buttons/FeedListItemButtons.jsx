import React, { Fragment } from "react";
import FavoriteSvg from "../../../img/jsSvg/FavoriteSvg";
import CompareSvg from "../../../img/jsSvg/CompareSvg";
import { Link } from "react-router-dom";

export const FeedListFavoriteButton = () => (
  <button className="prod-action">
    <span className="extra-icon">
      <FavoriteSvg />
    </span>
  </button>
);

export const FeedListCompareButton = () => (
  <button className="prod-action prod-action--type2">
    <span className="extra-icon">
      <CompareSvg />
    </span>
  </button>
);

export const FeedListViewButton = ({ path }) => (
  <div className="list-col ">
    <div className="table-action">
      <Link to={path} rel="nofollow">
        <button className="theme-btn table-action__item">View</button>
      </Link>
    </div>
  </div>
);

export const FeedListNextPageButton = ({
  handleClick,
  isMobile,
  count,
  countMobile,
  status,
  newItemsStatus,
  title
}) => (
  <div className="list-next d-flex justify-content-center">
    {status !== "request" && newItemsStatus !== "request" && (
      <button className="theme-btn view-more" onClick={handleClick}>
        <Fragment>
          Next {isMobile ? countMobile : count} {title}
        </Fragment>
      </button>
    )}
  </div>
);
