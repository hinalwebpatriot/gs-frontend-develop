import React from "react";
import { connect } from "react-redux";
import {
  enableDiamondsFilterTriple,
  disableDiamondsFilterTriple
} from "../../DiamondsFeedActions";
import { diamondsFeedFilterTripleSelector } from "../../../../_selectors/diamondsFeedSelectors";
import CustomTooltip from "../../../../_common/CustomTooltip";

class CheckboxTripleExcellent extends React.Component {
  handleToggle = () => {
    const { isTriple, enable, disable } = this.props;

    isTriple ? disable() : enable();
  };

  render() {
    const { isTriple } = this.props;

    return (
      <div className="filter-check result-panel__check">
        <div className="filter-check__item">
          <input
            type="checkbox"
            id="filt1"
            className="checkbox"
            onChange={this.handleToggle}
            checked={isTriple}
          />
          <label htmlFor="filt1">
            <span>Triple Excellent</span>
          </label>
        </div>
        <CustomTooltip path="diamondsFeed.tripleExcellent" />
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  // isExpanded: diamondsFeedFilterExpandSelector(state),
  isTriple: diamondsFeedFilterTripleSelector(state),
  ...props
});

export default connect(
  mapStateToProps,
  {
    enable: enableDiamondsFilterTriple,
    disable: disableDiamondsFilterTriple
  }
)(CheckboxTripleExcellent);
