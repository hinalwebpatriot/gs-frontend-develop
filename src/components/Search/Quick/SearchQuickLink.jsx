import React from "react";
import { Link } from "react-router-dom";
import routing from "../../../config/routing";
import redArrowSvg from "../../../img/svg/red_arrow.svg";

const SearchQuickLink = ({ query }) => (
  <div className="main-search__extra">
    <Link to={routing(encodeURI(query)).search} className="drop-link">
      See results
      <span>
        <img className="red-arrow" src={redArrowSvg} alt="red arrow" />
      </span>
    </Link>
  </div>
);

export default SearchQuickLink;
