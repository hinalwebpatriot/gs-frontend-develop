import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  fetchWeddingFeedFilters,
  saveWeddingPrice,
  saveWeddingMetal,
  saveWeddingStyle,
  saveWeddingSize,
  setWeddingStyle,
  setWeddingMetal,
  changeWeddingSizeTab,
  changeWeddingGenderTab,
  toggleWeddingFilter,
  clearWeddingFilter,
  clearWeddingFilters,
  saveWeddingOffers,
  resetWeddingFilters,
  filterChange
} from "../WeddingFeedActions";
import selectors from "../../../_selectors/weddingFeedSelectors";
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

const toggleAllMetals = saveWeddingMetal.fulfill;

export default compose(
  withRouter,
  connect(
    mapStateToProps,
    {
      fetchFilters: fetchWeddingFeedFilters,
      changeSizeTab: changeWeddingSizeTab,
      changeGenderTab: changeWeddingGenderTab,
      toggle: toggleWeddingFilter,
      clear: clearWeddingFilter,
      clearFilters: clearWeddingFilters,
      clearState: resetWeddingFilters,
      toggleAllMetals,
      saveWeddingPrice,
      saveWeddingMetal,
      saveWeddingStyle,
      saveWeddingSize,
      saveWeddingOffers,
      setWeddingStyle,
      setWeddingMetal,
      filterChange,
    }
  )
)(FilterPanel);
