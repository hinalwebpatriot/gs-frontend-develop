import React from "react";
import selectors from "../../_selectors/favoriteSelectors";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import FavoriteSvg from "../../../img/jsSvg/FavoriteSvg";
import routing from "../../../config/routing";
import { flowRight as compose } from "lodash";

const NavFavoriteButton = props => {
  const { type, count, className, history } = props;

  let link;
  switch (type) {
    case "diamond":
      link = routing("diamond").favoriteTab;
      break;
    case "engagement":
      link = routing("engagement").favoriteTab;
      break;
    case "wedding":
      link = routing("wedding").favoriteTab;
      break;
    case "pendant":
      link = routing("pendant").favoriteTab;
      break;
    case "earring":
      link = routing("earring").favoriteTab;
      break;
    case "bracelet":
      link = routing("bracelet").favoriteTab;
      break;
    case "eternity-ring":
      link = routing("eternity-ring").favoriteTab;
      break;
    default:
      link = routing().favorite;
      break;
  }

  return (
    <button className={className} onClick={() => history.push(link)}>
      <span className="extra-icon">
        <FavoriteSvg />
      </span>
      {count}
    </button>
  );
};

const mapStateToProps = (state, props) => ({
  count:
    props.type === "header"
      ? selectors.totalCount(state)
      : selectors.tabCount(state, props.type),
  type: props.type,
  className: props.className
});

export default compose(
  withRouter,
  connect(mapStateToProps)
)(NavFavoriteButton);
