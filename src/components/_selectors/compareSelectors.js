const status = state => state.compare.status;
const syncStatus = state => state.compare.syncStatus;
const data = state => state.compare.data;
const diamond = state => state.compare.data.diamond;
const engagement = state => state.compare.data.engagement;
const wedding = state => state.compare.data.wedding;
const product = state => state.compare.data.product;
const pendant = state => state.compare.data.pendant;
const earring = state => state.compare.data.earring;
const bracelet = state => state.compare.data.bracelet;
const eternityRing = state => state.compare.data['eternity-ring'];
const category = state => state.feed.catalogFeed.catalogCategory;

const tabData = (state, type) => state.compare.data[type];
const tabCount = (state, type) => state.compare.data[type].count;
const tabKeys = (state, type) => state.compare.data[type].keys;
const tabItems = (state, type) => state.compare.data[type].items; 

const totalCount = state => {
  const count = diamond(state).count + engagement(state).count + wedding(state).count + product(state).count +
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
