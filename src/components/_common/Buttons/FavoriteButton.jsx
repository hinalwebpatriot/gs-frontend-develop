import React from "react";
import selectors from "../../_selectors/favoriteSelectors";
import {
  addDiamondToFav,
  addWeddingToFav,
  addEngagementToFav,
  addProductToFav,
  addPendantToFav,
  addEarringToFav,
  addBraceletToFav,
  addEternityRingToFav,
  removeDiamondFromFav,
  removeWeddingFromFav,
  removeEngagementFromFav,
  removeProductFromFav,
  removePendantFromFav,
  removeRingFromFav,
  removeEarringFromFav,
  removeBraceletFromFav,
  removeEternityRingFromFav,
  addRingToFav
} from "../../Favorite/FavoriteActions";
import { connect } from "react-redux";
import FavoriteSvg from "../../../img/jsSvg/FavoriteSvg";

const FavoriteButton = props => {
  const {
    addDiamondToFav,
    addWeddingToFav,
    addEngagementToFav,
    addProductToFav,
    addPendantToFav,
    addRingToFav,
    addEarringToFav,
    addBraceletToFav,
    addEternityRingToFav,
    removeDiamondFromFav,
    removeWeddingFromFav,
    removeEngagementFromFav,
    removeProductFromFav,
    removePendantFromFav,
    removeRingFromFav,
    removeEarringFromFav,
    removeBraceletFromFav,
    removeEternityRingFromFav,
    isActive,
    type,
    data,
    className,
    iconClassName,
    height,
    width,
    children
  } = props;

  let addAction;
  let removeAction;
  switch (type) {
    case "diamond":
      addAction = addDiamondToFav;
      removeAction = removeDiamondFromFav;
      break;
    case "engagement":
      addAction = addEngagementToFav;
      removeAction = removeEngagementFromFav;
      break;
    case "wedding":
      addAction = addWeddingToFav;
      removeAction = removeWeddingFromFav;
      break;
    case "pendant":
      addAction = addPendantToFav;
      removeAction = removePendantFromFav;
      break;
    case "ring":
      addAction = addRingToFav;
      removeAction = removeRingFromFav;
      break;
    case "eternity-ring":
      addAction = addEternityRingToFav;
      removeAction = removeEternityRingFromFav;
      break;
    case "earring":
      addAction = addEarringToFav;
      removeAction = removeEarringFromFav;
      break;
    case "bracelet":
      addAction = addBraceletToFav;
      removeAction = removeBraceletFromFav
      break;
    case "product":
    case "products":
      addAction = addProductToFav;
      removeAction = removeProductFromFav;
      break;
    default: console.log("Error in FavoriteButton")
  }

  return (
    <button aria-label="Favourite"
      className={`${className ? className : ""} ${isActive ? "active" : ""}`}
      onClick={isActive ? () => removeAction(data) : () => addAction(data)}
    >
      <span className={iconClassName ? iconClassName : "extra-icon"}>
        <FavoriteSvg height={height} width={width} />
      </span>
      {children}
    </button>
  );
};

const mapStateToProps = (state, props) => {
  let type = props.type === 'products' ? 'product' : props.type;
  return {
    isActive: selectors.tabKeys(state, type).includes(props.data.id),
    type: props.type,
    data: props.data,
    className: props.className,
    iconClassName: props.iconClassName,
    height: props.height,
    width: props.width,
    children: props.children
  }
};

const mapDispatchToProps = {
  addDiamondToFav,
  addWeddingToFav,
  addEngagementToFav,
  addProductToFav,
  addPendantToFav,
  addRingToFav,
  addEarringToFav,
  addBraceletToFav,
  addEternityRingToFav,

  removeDiamondFromFav,
  removeWeddingFromFav,
  removeEngagementFromFav,
  removeProductFromFav,
  removePendantFromFav,
  removeRingFromFav,
  removeEarringFromFav,
  removeBraceletFromFav,
  removeEternityRingFromFav
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FavoriteButton);
