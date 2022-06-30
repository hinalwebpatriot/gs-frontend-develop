import { handleActions } from "redux-actions";
import * as actions from "../Checkout/Confirmation/ConfirmationActions";
import { makeStatusReducer } from "../../utils/reduxHelpers";
import { combineReducers } from "redux";

const orderStatus = makeStatusReducer(actions.pushConfirmationPayment);

const orderDataInitial = {
  items: [],
  count: 0,
  total: {},
  info: {},
  isPayed: false,
  invoice: null,
  orderType: ""
};

const orderDataReducer = handleActions(
  {
    [actions.pushConfirmationPayment.SUCCESS](state, { payload }) {
      const definedItems = payload.order_type === 'service' ? payload.service_invoice.services : payload.products_list;
      return {
        items: definedItems,
        count: payload.products_count,
        total: payload.products_total,
        info: payload.order_info,
        paymentSystem: payload.payment_system,
        isPayed: payload.is_payed,
        invoice: payload.invoice,
        orderType: payload.order_type,
      };
    },
    [actions.pushConfirmationPayment.FULFILL]() {
      return orderDataInitial;
    }
  },
  orderDataInitial
);

const confirmation = combineReducers({
  status: orderStatus,
  data: orderDataReducer
});

export default confirmation;
