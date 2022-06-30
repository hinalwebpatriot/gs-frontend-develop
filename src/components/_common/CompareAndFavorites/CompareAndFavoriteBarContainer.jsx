import React from "react";
import CompareAndFavoriteBar from "./CompareAndFavoriteBar";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { flowRight as compose } from "lodash";
import { barLastAction } from "../../_selectors/compareAndFavoriteBarSelectors";
import favorite from "../../_selectors/favoriteSelectors";
import compare from "../../_selectors/compareSelectors";
import {
  removeDiamondFromFav,
  removeEngagementFromFav,
  removeWeddingFromFav,
  removeProductFromFav,
  removeAllDiamondFromFav,
  removeAllEngagementFromFav,
  removeAllWeddingFromFav,
  removeAllProductFromFav,
  removePendantFromFav,
  removeRingFromFav,
  removeEarringFromFav,
  removeBraceletFromFav,
  removeEternityRingFromFav,
  removeAllPendantFromFav,
  removeAllRingFromFav,
  removeAllEarringFromFav,
  removeAllBraceletFromFav,
  removeAllEternityRingFromFav
} from "../../Favorite/FavoriteActions";

import {
  removeDiamondFromCompare,
  removeEngagementFromCompare,
  removeWeddingFromCompare,
  removeProductFromCompare,
  removeBraceletFromCompare,
  removeEarringFromCompare,
  removePendantFromCompare,
  removeRingFromCompare,
  removeEternityRingFromCompare,
  removeAllDiamondFromCompare,
  removeAllEngagementFromCompare,
  removeAllWeddingFromCompare,
  removeAllProductFromCompare,
  removeAllBraceletFromCompare,
  removeAllEarringFromCompare,
  removeAllPendantFromCompare,
  removeAllRingFromCompare,
  removeAllEternityRingFromCompare
} from "../../Compare/CompareActions";
import { isEqual } from "lodash";
import { isServer } from "../../../utils/isServer";

class CompareAndFavoriteBarContainer extends React.Component {
  state = {
    isActive: false
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.lastAction === "none") {
      return;
    }

    if (
      prevProps.type !== this.props.type ||
      prevProps.lastAction !== this.props.lastAction ||
      !isEqual(prevProps.data, this.props.data)
    ) {
      if (this._timerId) {
        clearTimeout(this._timerId);
      }
      this.setState(
        {
          isActive: true
        },
        () => {
          this._timerId = setTimeout(
            () => this.setState({ isActive: false }),
            4000
          );
        }
      );
    }
  }

  componentWillUnmount() {
    if (!isServer) {
      document.body.classList.remove("compare-active");
    }

    clearTimeout(this._timerId);
  }

  render() {
    const {
      type,
      lastAction,
      data,
      history,
      removeDiamondFromFav,
      removeEngagementFromFav,
      removeWeddingFromFav,
      removeProductFromFav,
      removeAllDiamondFromFav,
      removeAllEngagementFromFav,
      removeAllWeddingFromFav,
      removeAllProductFromFav,

      removePendantFromFav,
      removeRingFromFav,
      removeEarringFromFav,
      removeBraceletFromFav,
      removeEternityRingFromFav,
      removeAllPendantFromFav,
      removeAllRingFromFav,
      removeAllEarringFromFav,
      removeAllBraceletFromFav,
      removeAllEternityRingFromFav,

      removeDiamondFromCompare,
      removeEngagementFromCompare,
      removeWeddingFromCompare,
      removeProductFromCompare,
      removeAllDiamondFromCompare,
      removeAllEngagementFromCompare,
      removeAllWeddingFromCompare,
      removeAllProductFromCompare,
      removeBraceletFromCompare,
      removeEarringFromCompare,
      removePendantFromCompare,
      removeRingFromCompare,
      removeEternityRingFromCompare,
      removeAllBraceletFromCompare,
      removeAllEarringFromCompare,
      removeAllPendantFromCompare,
      removeAllRingFromCompare,
      removeAllEternityRingFromCompare
    } = this.props;
  
    if (isServer || lastAction === "none") {
      return null;
    }

    const { isActive } = this.state;

    if (data.length && lastAction !== "none" && isActive) {
      document.body.classList.add("compare-active");
    } else {
      document.body.classList.remove("compare-active");

      return null;
    }

    let remove;
    let removeAll;

    switch (type) {
      case "diamond":
        remove =
          lastAction === "favorite"
            ? removeDiamondFromFav
            : removeDiamondFromCompare;
        removeAll =
          lastAction === "favorite"
            ? removeAllDiamondFromFav
            : removeAllDiamondFromCompare;
        break;
      case "engagement":
        remove =
          lastAction === "favorite"
            ? removeEngagementFromFav
            : removeEngagementFromCompare;
        removeAll =
          lastAction === "favorite"
            ? removeAllEngagementFromFav
            : removeAllEngagementFromCompare;
        break;
      case "wedding":
        remove =
          lastAction === "favorite"
            ? removeWeddingFromFav
            : removeWeddingFromCompare;
        removeAll =
          lastAction === "favorite"
            ? removeAllWeddingFromFav
            : removeAllWeddingFromCompare;
        break;
      case "product":
      case "products":
        remove =
          lastAction === "favorite"
            ? removeProductFromFav
            : removeProductFromCompare;
        removeAll =
          lastAction === "favorite"
            ? removeAllProductFromFav
            : removeAllProductFromCompare;
        break;
        case "earring":
          remove =
          lastAction === "favorite"
            ? removeEarringFromFav
            : removeEarringFromCompare ;
        removeAll =
          lastAction === "favorite"
            ?  removeAllEarringFromFav     
            :  removeAllEarringFromCompare;
            break;
        case "pendant":
          remove =
          lastAction === "favorite"
            ? removePendantFromFav
            :  removePendantFromCompare ;
        removeAll =
          lastAction === "favorite"
            ? removeAllPendantFromFav            
            :  removeAllPendantFromCompare;
            break;
        case "ring":
          remove =
          lastAction === "favorite"
            ? removeRingFromFav
            :  removeRingFromCompare;
        removeAll =
          lastAction === "favorite"
            ? removeAllRingFromFav            
            :  removeAllRingFromCompare;
            break;
         case "bracelet":
          remove =
          lastAction === "favorite"
            ? removeBraceletFromFav
            : removeBraceletFromCompare ;
        removeAll =
          lastAction === "favorite"
            ? removeAllBraceletFromFav 
            : removeAllBraceletFromCompare;
            break;
        case "eternity-ring":
          remove =
          lastAction === "favorite"
            ? removeEternityRingFromFav
            : removeEternityRingFromCompare;
        removeAll =
          lastAction === "favorite"
            ? removeAllEternityRingFromFav 
            : removeAllEternityRingFromCompare;
            break;
        default:;
    }
    return (
      <CompareAndFavoriteBar
        data={data}
        type={type}
        lastAction={lastAction}
        remove={remove}
        removeAll={removeAll}
        push={history.push}
      />
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    type: props.type,
    lastAction: barLastAction(state),
    data:
      barLastAction(state) === "favorite"
        ? favorite.tabItems(state, props.type)
        : compare.tabItems(state, props.type)
  }
};

const mapDispatchToProps = {
  removeDiamondFromFav,
  removeEngagementFromFav,
  removeWeddingFromFav,
  removeProductFromFav,
  removeAllDiamondFromFav,
  removeAllEngagementFromFav,
  removeAllWeddingFromFav,
  removeAllProductFromFav,
  removePendantFromFav,
  removeRingFromFav,
  removeEarringFromFav,
  removeBraceletFromFav,
  removeEternityRingFromFav,
  removeAllPendantFromFav,
  removeAllRingFromFav,
  removeAllEarringFromFav,
  removeAllBraceletFromFav,
  removeAllEternityRingFromFav,

  removeDiamondFromCompare,
  removeEngagementFromCompare,
  removeWeddingFromCompare,
  removeProductFromCompare,
  removeAllDiamondFromCompare,
  removeAllEngagementFromCompare,
  removeAllWeddingFromCompare,
  removeAllProductFromCompare,
  removeBraceletFromCompare,
  removeEarringFromCompare,
  removePendantFromCompare,
  removeRingFromCompare,
  removeEternityRingFromCompare,
  removeAllBraceletFromCompare,
  removeAllEarringFromCompare,
  removeAllPendantFromCompare,
  removeAllRingFromCompare,
  removeAllEternityRingFromCompare,
};

export default compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(CompareAndFavoriteBarContainer);
