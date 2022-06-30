export const filterCategories = state => state.feed.catalogFeed.filters.config.categories;
const filterConfig = state => state.feed.catalogFeed.filters.config;
const filterStatus = state => state.feed.catalogFeed.filters.status;
const filterInput = state => state.feed.catalogFeed.filters.input;
const filterSizeInput = state =>
  state.feed.catalogFeed.filters.input.size.currentTab;

const dataStatus = state => state.feed.catalogFeed.status;
const newDataStatus = state => state.feed.catalogFeed.newItemsStatus;
const pagination = state => state.feed.catalogFeed.pagination;

const feedDataObject = state => {
  const obj = {};
  state.feed.catalogFeed.data.forEach(item => (obj[item.group_sku] = item));
  return obj;
};
export const getItemsGroupSku = state =>
  state.feed.catalogFeed.data.map(item => item.group_sku);

const shoppingEasy = state => state.feed.catalogFeed.blocks.shoppingEasy;

const lastCategory = state => state.feed.catalogFeed.lastCatalogCategory;

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

  shoppingEasy,
  lastCategory
};
