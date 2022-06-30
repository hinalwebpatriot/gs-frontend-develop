import React from "react";

import { faMinus } from "@fortawesome/free-solid-svg-icons/faMinus";
import { faPlus } from "@fortawesome/free-solid-svg-icons/faPlus";
import RefreshSvg from "../../../../img/jsSvg/RefreshSvg";
import IconFA from '../../../_common/IconFA';

const FilterPanelMore = ({ handleExpand, isExpanded, handleRefresh }) => {
  return (
    <div className="col-12">
      <div className="more-filter">
        <button className="more-filter__btn" onClick={handleRefresh}>
          <span>
            <RefreshSvg />
          </span>
          deselect all
        </button>

        {isExpanded ? (
          <button className="more-filter__btn" onClick={handleExpand}>
            <span data-key="minus">
              <IconFA icon={faMinus}/>
            </span>
            Less filters
          </button>
        ) : (
          <button className="more-filter__btn" onClick={handleExpand}>
            <span data-key="minus">
              <IconFA icon={faPlus}/>
            </span>
            More filters
          </button>
        )}
      </div>
    </div>
  );
};

export default FilterPanelMore;
