import { get } from "lodash";

const orderStatus = state => state.confirmation.status;
const orderData = state => state.confirmation.data;
const orderType = state => state.confirmation.data.orderType;
const orderId = state => get(state, "confirmation.data.info.Shared.id", null);

export default {
  orderStatus,
  orderData,
  orderType,
  orderId
};
