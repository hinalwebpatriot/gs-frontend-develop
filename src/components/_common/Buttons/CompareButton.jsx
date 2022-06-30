import React from "react";
import selectors from "../../_selectors/compareSelectors";
import {
  addDiamondToCompare,
  addWeddingToCompare,
  addEngagementToCompare,
  addProductToCompare,
  addEternityRingToCompare,
  removeDiamondFromCompare,
  removeWeddingFromCompare,
  removeEngagementFromCompare,
  removeProductFromCompare,
  removeEternityRingFromCompare,
  addPendantToCompare,
  removePendantFromCompare,
  addEarringToCompare,
  removeEarringFromCompare,
  addBraceletToCompare, removeBraceletFromCompare, addRingToCompare, removeRingFromCompare
} from "../../Compare/CompareActions";
import { connect } from "react-redux";
import CompareSvg from "../../../img/jsSvg/CompareSvg";

const CompareButton = props => {
  const {
    addDiamondToCompare,
    addWeddingToCompare,
    addEngagementToCompare,
    addProductToCompare,
    addPendantToCompare,
    addRingToCompare,
    addEarringToCompare,
    addBraceletToCompare,
    addEternityRingToCompare,
    removeBraceletFromCompare,
    removeEarringFromCompare,
    removePendantFromCompare,
    removeRingFromCompare,
    removeDiamondFromCompare,
    removeWeddingFromCompare,
    removeEngagementFromCompare,
    removeProductFromCompare,
    removeEternityRingFromCompare,
    isActive,
    type,
    data,
    className,
    children
  } = props;

  let addAction;
  let removeAction;
  
  // console.log('compare type is: ', type);

  switch (type) {
    case "diamond":
      addAction = addDiamondToCompare;
      removeAction = removeDiamondFromCompare;
      break;
    case "engagement":
      addAction = addEngagementToCompare;
      removeAction = removeEngagementFromCompare;
      break;
    case "wedding":
      addAction = addWeddingToCompare;
      removeAction = removeWeddingFromCompare;
      break;
    case "pendant":
      addAction = addPendantToCompare;
      removeAction = removePendantFromCompare;
      break;
    case "ring":
      addAction = addRingToCompare;
      removeAction = removeRingFromCompare;
      break;
    case "earring":
      addAction = addEarringToCompare;
      removeAction = removeEarringFromCompare;
      break;
    case "bracelet":
      addAction = addBraceletToCompare;
      removeAction = removeBraceletFromCompare
      break;
    case "eternity-ring":
      addAction = addEternityRingToCompare;
      removeAction = removeEternityRingFromCompare;
      break;
    case "products":
      addAction = addProductToCompare;
      removeAction = removeProductFromCompare;
      break;
      default:
        break;
  }
  return (
    <button aria-label="Compare"
      className={`${className ? className : ""} ${isActive ? "active" : ""}`}
      onClick={isActive ? () => removeAction(data) : () => addAction(data)}
    >
      <span className="extra-icon extra-icon--cart">
        <CompareSvg />
      </span>
      {children}
    </button>
  );
};

const mapStateToProps = (state, props) => {
  let type = props.type === 'products' ? 'product': props.type;
  return {
    isActive: selectors.tabKeys(state, type).includes(props.data.id),
    type: props.type,
    data: props.data,
    className: props.className,
    children: props.children
  }
};

const mapDispatchToProps = {
  addDiamondToCompare,
  addWeddingToCompare,
  addEngagementToCompare,
  addProductToCompare,
  addBraceletToCompare,
  addEarringToCompare,
  addPendantToCompare,
  addRingToCompare,
  addEternityRingToCompare,

  removePendantFromCompare,
  removeRingFromCompare,
  removeBraceletFromCompare,
  removeEarringFromCompare,
  removeDiamondFromCompare,
  removeWeddingFromCompare,
  removeEngagementFromCompare,
  removeProductFromCompare,
  removeEternityRingFromCompare
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CompareButton);
