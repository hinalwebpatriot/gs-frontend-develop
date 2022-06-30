import React from "react";
import { connect } from "react-redux";
import { saveEngagementSort } from "../../EngagementFeedActions";
import SortDropdown from "../../../Shared/ResultPanel/SortDropdown";

class EngagementSortDropdownContainer extends React.Component {
  render() {
    const { save } = this.props;
    return <SortDropdown save={save} />;
  }
}

const mapStateToProps = () => ({
  // input: diamondsFeedSortSelector(state),
});

export default connect(
  mapStateToProps,
  {
    save: saveEngagementSort
  }
)(EngagementSortDropdownContainer);
