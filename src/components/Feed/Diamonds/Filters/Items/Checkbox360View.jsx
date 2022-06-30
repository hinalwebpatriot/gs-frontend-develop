import React from "react";
import view360 from "../../../../../img/svg/360_view.svg";
import { connect } from "react-redux";
import { toggleDiamondsVideoFilter } from "../../DiamondsFeedActions";
import { diamondsFeedFilterVideoSelector } from "../../../../_selectors/diamondsFeedSelectors";

const Checkbox360View = ({ isActive, toggle }) => (
  <div className="filter-check result-panel__check result-panel__check--360">
    <div className="filter-check__item">
      <input
        type="checkbox"
        id="filt2"
        className="checkbox"
        checked={isActive}
        onChange={() => toggle()}
      />
      <label htmlFor="filt2">
        <img src={view360} alt="360 view" />
        <span>View Available</span>
      </label>
    </div>
  </div>
);

const mapStateToProps = state => ({
  isActive: diamondsFeedFilterVideoSelector(state)
});

const mapDispatchToProps = {
  toggle: toggleDiamondsVideoFilter
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Checkbox360View);
