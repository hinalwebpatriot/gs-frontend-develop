const status = state => state.completedRings.status;
const items = state => state.completedRings.data.items;
const keys = state => state.completedRings.data.keys;

export default {
  status,
  items,
  keys
};
