import React from "react";
import selectors from "../../_selectors/compareSelectors";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import CompareSvg from "../../../img/jsSvg/CompareSvg";
import routing from "../../../config/routing";
import { flowRight as compose } from "lodash";

const NavCompareButton = props => {
  const { type, count, className, history } = props;

  let link;

  switch (type) {
    case "diamond":
      link = routing("diamond").compareTab;
      break;
    case "engagement":
      link = routing("engagement").compareTab;
      break;
    case "wedding":
      link = routing("wedding").compareTab;
      break;
    case "pendant":
      link = routing("pendant").compareTab;
      break;
    case "earring":
      link = routing("earring").compareTab;
      break;
    case "bracelet":
      link = routing("bracelet").compareTab;
      break;
    case "eternity-ring":
      link = routing("eternity-ring").compareTab;
      break;
    default:
      link = routing().compare;
      break;
  }

  return (
    <button className={className} onClick={() => history.push(link)}>
      <span className="extra-icon">
        <CompareSvg />
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
)(NavCompareButton);
