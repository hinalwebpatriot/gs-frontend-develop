const status = state => state.favorite.status;
const syncStatus = state => state.favorite.syncStatus;
const data = state => state.favorite.data;
const diamond = state => state.favorite.data.diamond;
const engagement = state => state.favorite.data.engagement;
const wedding = state => state.favorite.data.wedding;
const product = state => state.favorite.data.product;
const pendant = state => state.favorite.data.pendant;
const earring = state => state.favorite.data.earring;
const bracelet = state => state.favorite.data.bracelet;
const eternityRing = state => state.favorite.data['eternity-ring'];
const category = state => state.feed.catalogFeed.catalogCategory;

const tabData = (state, type) => state.favorite.data[type];
const tabCount = (state, type) => state.favorite.data[type].count;
const tabKeys = (state, type) => state.favorite.data[type].keys;
const tabItems = (state, type) => state.favorite.data[type].items;

const totalCount = state => {
  const count =
      diamond(state).count + engagement(state).count + wedding(state).count +
      pendant(state).count + earring(state).count + bracelet(state).count + eternityRing(state).count;

  return count;
};

export default {
  status,
  syncStatus,
  data,
  diamond,
  engagement,
  wedding,
  product,
  pendant,
  earring,
  bracelet,
  eternityRing,
  category,
  tabCount,
  tabItems,
  tabKeys,
  tabData,
  totalCount
};
