import { get } from "lodash";

const methodsStatus = state => state.payment.paymentMethods.status;
const methodsData = state => state.payment.paymentMethods.data;
const currentMethod = state => state.payment.paymentMethods.current;
const isMethodSelected = state => state.payment.paymentMethods.isSelected;

const submitStatus = state => state.payment.paymentMethods.submitStatus;
const submitData = state => state.payment.paymentMethods.submitData;

const orderStatus = state => state.payment.order.status;
const servicesOrderStatus = state => state.payment.order.servicesOrderStatus;
const orderData = state => state.payment.order.data;
const orderId = state => get(state, "payment.order.data.info.Shared.id", null);

export default {
  methodsStatus,
  methodsData,
  currentMethod,
  isMethodSelected,

  servicesOrderStatus,
  orderStatus,
  orderData,
  orderId,

  submitStatus,
  submitData
};
