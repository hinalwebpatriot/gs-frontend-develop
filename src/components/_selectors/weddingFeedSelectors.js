const filterConfig = state => state.feed.weddingFeed.filters.config;
const filterStatus = state => state.feed.weddingFeed.filters.status;
const filterInput = state => state.feed.weddingFeed.filters.input;
const filterSizeInput = state =>
  state.feed.weddingFeed.filters.input.size.currentTab;

const dataStatus = state => state.feed.weddingFeed.status;
const newDataStatus = state => state.feed.weddingFeed.newItemsStatus;
const pagination = state => state.feed.weddingFeed.pagination;

const feedDataObject = state => {
  const obj = {};
  state.feed.weddingFeed.data.forEach(item => (obj[item.group_sku] = item));
  return obj;
};
export const getItemsGroupSku = state =>
  state.feed.weddingFeed.data.map(item => item.group_sku);

const shoppingEasy = state => state.feed.weddingFeed.blocks.shoppingEasy;

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
