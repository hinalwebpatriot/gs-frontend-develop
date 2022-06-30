import { combineReducers } from "redux";
import { handleActions } from "redux-actions";
import { makeStatusReducer } from "../../utils/reduxHelpers";

import * as actions from "../Checkout/Cart/CartActions";
import * as servicesActions from "../Checkout/CartServices/CartServicesActions";
import { removeFromCartAfterOrder } from "../Checkout/Delivery/DeliveryActions";

const status = makeStatusReducer(actions.fetchCart);
const servicesStatus = makeStatusReducer(servicesActions.fetchServicesCart);
const servicesPushDataStatus = makeStatusReducer(servicesActions.pushServicesData);

const dataInitial = {
  count: 0,
  price: 0,
  items: [],
  servicesCount: 0,
  servicesPrice: null,
  servicesItems: [],
  invoiceId: 0,
    delivery: null,
};

const countReducer = handleActions(
  {
    [actions.fetchCart.SUCCESS](state, { payload }) {
      return payload.products_count;
    },
    [actions.addToCart.SUCCESS](state) {
      return state + 1;
    },
    [actions.addToCartCompetedRing.SUCCESS](state) {
      return state + 2;
    },
    [removeFromCartAfterOrder.SUCCESS](state, { payload }) {
      return state - payload;
    }
  },
  dataInitial.count
);

const deliveryReducer = handleActions(
    {
        [actions.fetchCart.SUCCESS](state, { payload }) {
            return payload.delivery;
        },
        [actions.fetchCart.FULFILL]() {
            return dataInitial.delivery;
        }
    },
    dataInitial.delivery
);

const priceReducer = handleActions(
  {
    [actions.fetchCart.SUCCESS](state, { payload }) {
      return payload.products_total.count;
    },
    [actions.fetchCart.FULFILL]() {
      return dataInitial.price;
    }
  },
  dataInitial.price
);

const referral_discount = handleActions(
  {
    [actions.fetchCart.SUCCESS](state, { payload }) {
      return payload.products_total.referral_discount;
    },
    [actions.fetchCart.FULFILL]() {
      return null;
    }
  },
  null
);

const cart_discount = handleActions(
  {
    [actions.fetchCart.SUCCESS](state, { payload }) {
      return payload.products_total.cart_discount;
    },
    [actions.fetchCart.FULFILL]() {
      return null;
    }
  },
  null
);

const promo_code = handleActions(
  {
    [actions.fetchCart.SUCCESS](state, { payload }) {
      return payload.products_total.promo_code;
    },
    [actions.fetchCart.FULFILL]() {
      return null;
    }
  },
  null
);

const promocodeStatus = handleActions(
  {
    [actions.clearPromocode.REQUEST](state, { payload }) {
      return 'REQUEST';
    },
    [actions.clearPromocode.SUCCESS](state, { payload }) {
      return 'SUCCESS';
    },
    [actions.clearPromocode.FAILURE](state, { payload }) {
      return 'FAILURE';
    },
  },
  'NOT_CLEARED'
);

const itemsReducer = handleActions(
  {
    [actions.fetchCart.SUCCESS](state, { payload }) {
      return payload.products_list;
    },
    [actions.fetchCart.FULFILL]() {
      return dataInitial.items;
    }
  },
  dataInitial.items
);


const servicesCountReducer = handleActions({
        [servicesActions.fetchServicesCart.SUCCESS](state, { payload }){
            return payload.services.length;
        }
    },
    dataInitial.servicesCount
);

const referral_discount_services = handleActions({
  [servicesActions.fetchServicesCart.SUCCESS](state, { payload }){
      return payload.referral_discount ? payload.referral_discount : null;
    }
  },
  null
);

const promo_code_services = handleActions({
  [servicesActions.fetchServicesCart.SUCCESS](state, { payload }){
      return payload.promo_code ? payload.promo_code : null;
    }
  },
  null
);

const servicesPriceReducer = handleActions({
    [servicesActions.fetchServicesCart.SUCCESS](state, { payload }) {
      return {
         raw_price: payload.raw_price,
         inc_price: payload.inc_price
      };
    },
    [servicesActions.fetchServicesCart.FULFILL](){
        return dataInitial.servicesPrice;
    }
},
    dataInitial.servicesPrice
);

const servicesItemsReducer = handleActions({
    [servicesActions.fetchServicesCart.SUCCESS](state, { payload }){
        return payload.services
    },
    [servicesActions.fetchServicesCart.FULFILL](){
         return dataInitial.servicesItems;
    }
},
    dataInitial.servicesItems
)

const servicesInvoiceId = handleActions({
    [servicesActions.fetchServicesCart.SUCCESS](state, { payload }){
        return payload.id
    },
    [servicesActions.pushServicesData.FULFILL](){
      return console.error("create orders error")
    }
},
    dataInitial.invoiceId
)

const data = combineReducers({
  count: countReducer,
  price: priceReducer,
  items: itemsReducer,
  delivery: deliveryReducer,
  servicesCount: servicesCountReducer,
  servicesPrice: servicesPriceReducer,
  servicesItems: servicesItemsReducer,
  invoiceId: servicesInvoiceId,
  referral_discount: referral_discount,
  referral_discount_services,
  promo_code_services,
  cart_discount: cart_discount,
  promo_code: promo_code,
  promocodeStatus,
});

const cart = combineReducers({
  data,
  status,
  servicesStatus,
  servicesPushDataStatus,
});

export default cart;
