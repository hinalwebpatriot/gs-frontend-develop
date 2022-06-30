import { createSelector } from "reselect";

export const diamondsFeedStatusSelector = state =>
  state.feed.diamondsFeed.status;
export const diamondsFeedNextStatusSelector = state =>
  state.feed.diamondsFeed.newItemsStatus;

export const diamondsFeedPaginationSelector = state =>
  state.feed.diamondsFeed.pagination;

export const diamondsFeedFiltersDataSelector = state =>
  state.feed.diamondsFeed.filters.config;
export const diamondsFeedFiltersStatusSelector = state =>
  state.feed.diamondsFeed.filters.status;
export const diamondsFeedFiltersSharedInputSelector = state =>
  state.feed.diamondsFeed.filters.input.shared;
export const diamondsFeedFiltersShapesSelector = state =>
  state.feed.diamondsFeed.filters.input.shapes;
export const diamondsFeedSortSelector = state =>
  state.feed.diamondsFeed.filters.input.sort;
export const diamondsFeedInputDataSelector = state =>
  state.feed.diamondsFeed.filters.input;
export const diamondsFeedInputDataCaratSelector = state => state.feed.diamondsFeed.filters.input.shared.carat;

export const diamondsFeedFilterExpandSelector = state =>
  state.feed.diamondsFeed.filters.isExpanded;
export const diamondsFeedFilterTripleSelector = state =>
  state.feed.diamondsFeed.filters.isTriple;

export const diamondsFeedFilterVideoSelector = state =>
  state.feed.diamondsFeed.filters.input.isVideo;

export const getDiamondsFeedFilterInputIsActive = createSelector(
  diamondsFeedFiltersSharedInputSelector,
  input => {
    const arr = Object.keys(input).map(key => {
      if (!input[key].isDisabled) {
        return key;
      }
      // if (input[key].min !== null && input[key].max !== null && !input[key].isDisabled) {
      //   return key;
      // }
    });

    return arr;
  }
);

const getFilterInputMin = (state, props) =>
  state.feed.diamondsFeed.filters.input.shared[props.type].min;
const getFilterInputMax = (state, props) =>
  state.feed.diamondsFeed.filters.input.shared[props.type].max;
const getFilterInputIsDisabled = (state, props) =>
  state.feed.diamondsFeed.filters.input.shared[props.type].isDisabled;

export const getDiamondsFeedFilterInputSelector = createSelector(
  [getFilterInputMin, getFilterInputMax, getFilterInputIsDisabled],
  (min, max, isDisabled) => ({ min, max, isDisabled })
);

export const diamondsFeedDataObjectSelector = state => {
  const obj = {};
  state.feed.diamondsFeed.data.forEach(item => (obj[item.id] = item));
  return obj;
};

export const getDiamondsItemIdSelector = state =>
  state.feed.diamondsFeed.data.map(item => item.id);

export const getDiamondsFeedFirstRingSlider = state => state.feed.diamondsFeed.blocks.firstRingSlider;
export const getDiamondsFeedSecondRingSlider = state => state.feed.diamondsFeed.blocks.secondRingSlider;
export const getDiamondsBannersSlider = state => state.feed.diamondsFeed.blocks.banners;
