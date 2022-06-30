const dataStatus = state => state.dynamicPages.saleFeed.status;
const newDataStatus = state => state.dynamicPages.saleFeed.newItemsStatus;
const pagination = state => state.dynamicPages.saleFeed.pagination;

const feedDataObject = state => {
  const obj = {};
  state.dynamicPages.saleFeed.data.forEach(item => (obj[item.group_sku] = item));
  return obj;
};
export const getItemsGroupSku = state =>
  state.dynamicPages.saleFeed.data.map(item => item.group_sku);

export default {
  dataStatus,
  newDataStatus,
  pagination,

  getItemsGroupSku,
  feedDataObject
};
