const status = state => state.cart.status;
const servicesStatus = state => state.cart.servicesStatus;
const data = state => state.cart.data;
const count = state => state.cart.data.count;
const delivery = state => state.cart.data.delivery;

export default {
  servicesStatus,
  delivery,
  status,
  data,
  count
};
