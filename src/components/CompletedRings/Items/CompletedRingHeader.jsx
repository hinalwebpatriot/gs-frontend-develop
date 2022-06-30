import React from "react";
import TrashSvg from "../../../img/jsSvg/TrashSvg";
import { humanizeNumber } from "../../../utils/humanizeNumber";
import { removeInscriptionStorage } from "../../Product/Engraving/methods";

const CompletedRingHeader = ({ index, id, handleDelete, isOne, isSharing, ringId }) => (
  <div className="complete-header complete-header--type2 justify-content-between">
    {!isOne && (
      <div className="complete-header__group">
        <p className="complete-title">
          {humanizeNumber(index + 1)} completed ring{" "}
        </p>
      </div>
    )}

    {!isSharing && (
      <div className="complete-action">
        <div className="complete-action__item ">
          <button
            className="delete-ring complete-action__btn"
            onClick={() => {handleDelete(id); removeInscriptionStorage(ringId)}}
          >
          <span>
            <TrashSvg />
          </span>
            Delete this ring
          </button>
        </div>
      </div>
    )}
  </div>
);

export default CompletedRingHeader;
