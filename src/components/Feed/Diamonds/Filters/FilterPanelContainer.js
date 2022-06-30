import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  fetchDiamondsFeedFilters,
  saveDiamondsShape,
  saveDiamondsFilter,
  toggleDiamondsFilter,
  disableDiamondsFilters,
  setDiamondsShape,
  setCaratFromUrl,
  expandDiamondsFilters,
  clearDiamondsFilters
} from "../DiamondsFeedActions";
import {
  diamondsFeedFilterExpandSelector,
  diamondsFeedFiltersDataSelector,
  diamondsFeedFiltersStatusSelector,
  diamondsFeedInputDataSelector,
  diamondsFeedPaginationSelector
} from "../../../_selectors/diamondsFeedSelectors";
import { flowRight as compose } from "lodash";
import FilterPanel from "./FilterPanel";

const mapStateToProps = (state, props) => ({
  isExpanded: diamondsFeedFilterExpandSelector(state),
  status: diamondsFeedFiltersStatusSelector(state),
  config: diamondsFeedFiltersDataSelector(state),
  input: diamondsFeedInputDataSelector(state),
  handleModal: props.handleModal,
  showMobileFilters: props.showMobileFilters,
  total: diamondsFeedPaginationSelector(state).total
  // input: diamondsFeedFiltersSharedInputSelector(state),
  // ...props,
});

const clearState = saveDiamondsFilter.fulfill;

export default compose(
  withRouter,
  connect(
    mapStateToProps,
    {
      fetchFilters: fetchDiamondsFeedFilters,
      clearFilters: clearDiamondsFilters,
      setDiamondsShape,
      setCaratFromUrl,
      disableDiamondsFilters,
      expandDiamondsFilters,
      saveDiamondsFilter,
      saveDiamondsShape,
      toggleDiamondsFilter,
      clearState
    }
  )
)(FilterPanel);
