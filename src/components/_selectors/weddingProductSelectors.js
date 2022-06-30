const ringData = state => state.product.weddingProduct.current;

const moreMetalsStatus = state =>
  state.product.weddingProduct.moreMetals.status;
const moreMetalsData = state => state.product.weddingProduct.moreMetals.data;
const similarCollectionsStatus = state =>
  state.product.weddingProduct.similarCollections.status;
const similarCollectionsData = state =>
  state.product.weddingProduct.similarCollections.data;

export default {
  ringData,

  moreMetalsStatus,
  moreMetalsData,

  similarCollectionsStatus,
  similarCollectionsData
};
