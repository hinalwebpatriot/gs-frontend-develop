const filterConfig = state => state.feed.engagementFeed.filters.config;
const filterStatus = state => state.feed.engagementFeed.filters.status;
const filterInput = state => state.feed.engagementFeed.filters.input;
const filterSizeInput = state =>
  state.feed.engagementFeed.filters.input.size.currentTab;

const dataStatus = state => state.feed.engagementFeed.status;
const newDataStatus = state => state.feed.engagementFeed.newItemsStatus;
const pagination = state => state.feed.engagementFeed.pagination;

const feedDataObject = state => {
  const obj = {};
  state.feed.engagementFeed.data.forEach(item => (obj[item.group_sku] = item));
  return obj;
};
export const getItemsGroupSku = state =>
  state.feed.engagementFeed.data.map(item => item.group_sku);

const shoppingEasy = state => state.feed.engagementFeed.blocks.shoppingEasy;

export default {
  filterConfig,
  filterStatus,
  filterInput,
  filterSizeInput,

  dataStatus,
  newDataStatus,
  pagination,

  getItemsGroupSku,
  feedDataObject,

  shoppingEasy
};
