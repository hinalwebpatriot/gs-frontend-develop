import { combineReducers } from "redux";
import { handleActions } from "redux-actions";
import { makeStatusWithResetReducer } from "../../utils/reduxHelpers";

import * as actions from "../Checkout/Payment/PaymentActions";

const orderStatus = makeStatusWithResetReducer(actions.fetchOrderData, actions.fetchOrderData.FULFILL);
const servicesOrderStatus = makeStatusWithResetReducer(actions.fetchServicesOrderData, actions.fetchServicesOrderData.FULFILL);
const methodsStatus = makeStatusWithResetReducer(actions.fetchPaymentMethods, actions.fetchOrderData.FULFILL);
const submitStatus = makeStatusWithResetReducer(actions.submitPayment, actions.fetchOrderData.FULFILL);

// const submitPaymentInitial = {
//   method: null,
//   methodData: null,
// };

const submitDataReducer = handleActions(
  {
    [actions.submitPayment.SUCCESS](state, { payload }) {
      return payload
    },
    [actions.fetchOrderData.FULFILL](){
      return {}
    }
  },
  {}
);

const paymentMethodsInitial = {
  data: [],
  current: null,
  isSelected: false
};

const paymentMethodsDataReducer = handleActions(
  {
    [actions.fetchPaymentMethods.SUCCESS](state, { payload }) {
      return payload;
    },
    [actions.fetchPaymentMethods.FULFILL]() {
      return paymentMethodsInitial.data;
    },
    [actions.fetchOrderData.FULFILL]() {
      return paymentMethodsInitial.data;
    }
  },
  paymentMethodsInitial.data
);

const currentMethodReducer = handleActions(
  {
    // [actions.fetchPaymentMethods.SUCCESS](state, { payload }) {
    //   return payload[0];
    // },
    [actions.changePaymentMethod.TRIGGER](state, { payload }) {
      return payload;
    },
    [actions.fetchPaymentMethods.FULFILL]() {
      return paymentMethodsInitial.current;
    },
    [actions.fetchOrderData.FULFILL]() {
      return paymentMethodsInitial.current;
    }
  },
  paymentMethodsInitial.current
);

const selectMethodReducer = handleActions(
  {
    [actions.selectPaymentMethod.TRIGGER]() {
      return true;
    },
    [actions.fetchPaymentMethods.FULFILL]() {
      return paymentMethodsInitial.isSelected;
    },
    [actions.fetchOrderData.FULFILL]() {
      return paymentMethodsInitial.isSelected;
    }
  },
  paymentMethodsInitial.isSelected
);

const paymentMethods = combineReducers({
  status: methodsStatus,
  data: paymentMethodsDataReducer,
  current: currentMethodReducer,
  isSelected: selectMethodReducer,

  submitStatus: submitStatus,
  submitData: submitDataReducer
});

const orderDataInitial = {
  items: [],
  count: 0,
  total: {},
  info: {}
};

const orderDataReducer = handleActions(
  {
    [actions.fetchOrderData.SUCCESS](state, { payload }) {
      return {
        items: payload.products_list,
        count: payload.products_count,
        total: payload.products_total,
        info: payload.order_info
      };
    },
      [actions.fetchServicesOrderData.SUCCESS](state, { payload }) {
          return {
              items: payload.service_invoice.services,
              count: payload.products_count,
              total: payload.products_total,
              info: payload.order_info
          };
      },
      [actions.fetchServicesOrderData.FULFILL]() {
          return orderDataInitial;
      },
    [actions.fetchOrderData.FULFILL]() {
      return orderDataInitial;
    }
  },
  orderDataInitial
);

const order = combineReducers({
  status: orderStatus,
  servicesOrderStatus: servicesOrderStatus,
  data: orderDataReducer
});

const payment = combineReducers({
  paymentMethods,
  order
});

export default payment;
