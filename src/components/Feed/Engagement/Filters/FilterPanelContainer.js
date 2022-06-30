import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  fetchEngagementFeedFilters,
  saveEngagementShape,
  saveEngagementPrice,
  saveEngagementMetal,
  saveEngagementStyle,
  saveEngagementSize,
  saveEngagementCollection,
  saveEngagementOffers,
  changeEngagementSizeTab,
  changeEngagementGenderTab,
  toggleEngagementFilter,
  clearEngagementFilter,
  clearEngagementFilters,
  resetEngagementFilters,
  setEngagementShape,
  setEngagementStyle,
  setEngagementMetal,
  setEngagementOffers,
  setEngagementGender,
  filterChange
} from "../EngagementFeedActions";
import selectors from "../../../_selectors/engagementFeedSelectors";
import { flowRight as compose } from "lodash";
import FilterPanel from "./FilterPanel";
import { deviceSelector } from '../../../_selectors/deviceSelector';

const mapStateToProps = (state, props) => ({
  status: selectors.filterStatus(state),
  config: selectors.filterConfig(state),
  input: selectors.filterInput(state),
  handleModal: props.handleModal,
  showMobileFilters: props.showMobileFilters,
  forwardRef: props.forwardRef,
  isMobile: deviceSelector(state)
});

const toggleAllMetals = saveEngagementMetal.fulfill;

export default compose(
  withRouter,
  connect(
    mapStateToProps,
    {
      fetchFilters: fetchEngagementFeedFilters,
      changeSizeTab: changeEngagementSizeTab,
      changeGenderTab: changeEngagementGenderTab,
      toggle: toggleEngagementFilter,
      clear: clearEngagementFilter,
      clearState: resetEngagementFilters,
      clearFilters: clearEngagementFilters,
      toggleAllMetals,
      saveEngagementShape,
      saveEngagementPrice,
      saveEngagementMetal,
      saveEngagementStyle,
      saveEngagementSize,
      saveEngagementCollection,
      saveEngagementOffers,

      setEngagementShape,
      setEngagementStyle,
      setEngagementMetal,
      setEngagementOffers,
      setEngagementGender,

      filterChange
    }
  )
)(FilterPanel);
