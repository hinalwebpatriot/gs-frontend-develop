import React from "react";
import { connect } from "react-redux";
import { saveDiamondsSort } from "../../DiamondsFeedActions";
import SortDropdown from "../../../Shared/ResultPanel/SortDropdown";

class DiamondsSortDropdownContainer extends React.Component {
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
    save: saveDiamondsSort
  }
)(DiamondsSortDropdownContainer);
