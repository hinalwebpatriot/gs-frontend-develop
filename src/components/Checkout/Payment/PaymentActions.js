import { createRoutine } from "redux-saga-routines";
import { all, call, put, select, takeLatest , fork, getContext } from "redux-saga/effects";
import notification from "../../../utils/notification";
import routing from "../../../config/routing";
import selectors from "../../_selectors/paymentSelectors";
import qs from "qs";
import { pushConfirmationPayment } from "../Confirmation/ConfirmationActions";
import GoogleEE from '../../_common/GoogleEE/GoogleEE';
import {initServerApp} from "../../rootSaga";
import { get } from "lodash";

export const fetchOrderData = createRoutine("ORDER_DATA_FETCH");
export const fetchServicesOrderData = createRoutine("SERVICES_ORDER_DATA_FETCH");
export const fetchOrderParams = createRoutine("ORDER_PARAMS_FETCH");

export const fetchPaymentMethods = createRoutine("PAYMENT_METHODS_FETCH");
export const changePaymentMethod = createRoutine("PAYMENT_METHOD_CHANGE");
export const selectPaymentMethod = createRoutine("PAYMENT_METHOD_SELECT");
export const submitPayment = createRoutine("PAYMENT_SUBMIT");

// function* fetchMethodsWorker() {
//   yield put(fetchPaymentMethods.request());
//   try {
//     const res = yield call(() => api.checkout.getPaymentMethods());
//     yield put(changePaymentMethod.trigger(res.data.data[0]));
//     yield put(fetchPaymentMethods.success(res.data.data));
//   } catch (err) {
//     yield put(fetchPaymentMethods.failure());
//   }
// }

function* submitPaymentWorker({ payload }) {
  const orderId = yield select(selectors.orderId);
  const paymentSystem = yield select(selectors.currentMethod);
  yield put(submitPayment.request());
  try {
    const api = yield getContext('api');
    const res = yield call(() =>
      api.checkout.proceedPayment({
        order_id: orderId,
        paysystem_id: paymentSystem.id
      })
    );

    // let methodPayload = {
    //   method: null,
    //   methodData: res.data,
    // }

    const cart = yield select(selectors.orderData);

    switch (paymentSystem.id) {
      case 1: //paypal
        // methodPayload.method = 'paypal';
        GoogleEE.checkoutStep({
          products: cart.items,
          step: 3,
          option: GoogleEE.CART_METHOD_PAYPAL
        });
        GoogleEE.checkoutSuccess({
          order: {
            products_list: cart.items,
            products_total: cart.total,
            order_info: {
              Shared: {
                id: cart.info.Shared.id
              }
            }
          },
          method: GoogleEE.CART_METHOD_PAYPAL,
        });
        yield put(submitPayment.success(res.data));
        break;
      case 2: //Adyen
        // methodPayload.method = 'adyen';
        GoogleEE.checkoutStep({
          products: cart.items,
          step: 3,
          option: GoogleEE.CART_METHOD_ADYEN
        });
        GoogleEE.checkoutSuccess({
          order: {
            products_list: cart.items,
            products_total: cart.total,
            order_info: {
              Shared: {
                id: cart.info.Shared.id
              }
            }
          },
          method: GoogleEE.CART_METHOD_ADYEN,
        });
        yield put(submitPayment.success(res.data));
        break;
      case 4: //bankTransfer
        GoogleEE.checkoutStep({
          products: cart.items,
          step: 3,
          option: GoogleEE.CART_METHOD_BANK
        });
        if (res && res.data && res.data.order) {
          notification("success", get(res, 'data.message', ''));
          yield put(pushConfirmationPayment.success(res.data.order));
          payload.replace(routing(`bank-transfer?id=${orderId}`).paymentSuccess);
        }
        break;
      case 5: //alipay
              // methodPayload.method = 'alipay';
        GoogleEE.checkoutStep({
          products: cart.items,
          step: 3,
          option: GoogleEE.CART_METHOD_ALIPAY
        });
        GoogleEE.checkoutSuccess({
          order: {
            products_list: cart.items,
            products_total: cart.total,
            order_info: {
              Shared: {
                id: cart.info.Shared.id
              }
            }
          },
          method: GoogleEE.CART_METHOD_ALIPAY,
        });
        yield put(submitPayment.success(res.data));
        break;
        default:
          break;
    }
  } catch (err) {
    yield put(submitPayment.failure());
  }
}

function* fetchOrderWorker({ payload }) {
  if (!payload.id) {
    payload.replace(routing().notFound);
    return;
  }

  yield put(fetchOrderData.request());

  try {
    const api = yield getContext('api');
    const [order, methods] = yield all([
      call(() => api.checkout.getOrder(payload.id)),
      call(() => api.checkout.getPaymentMethods())
    ]);

    // const payment = order.data.data.payment_system;
    const isPayed = order.data.data.is_payed;

    if (isPayed) {
      payload.replace(
        routing(`default?${qs.stringify({ id: payload.id })}`).paymentSuccess
      );
      return;
    }

    // if (payment) {
    //   yield put(changePaymentMethod.trigger(payment));
    //   yield put(selectPaymentMethod.trigger());
    // } else {
    //   yield put(changePaymentMethod.trigger(methods.data.data[0]));
    // }
    yield put(changePaymentMethod.trigger(methods.data.data[0]));
    yield put(fetchPaymentMethods.success(methods.data.data));
    yield put(fetchOrderData.success(order.data.data));
  } catch (err) {
    if (err.response) {
      notification("error", err.response.data.message);
    }
    yield put(fetchOrderData.failure());
    payload.replace(routing().notFound);
  }
}

function* fetchServicesOrderWorker({ payload }) {
  if (!payload.id) {
    payload.replace(routing().notFound);
    return;
  }

  yield put(fetchServicesOrderData.request());

  try {
    const api = yield getContext('api');
    const [order, methods] = yield all([
      call(() => api.checkout.getOrder(payload.id)),
      call(() => api.checkout.getPaymentMethods())
    ]);

    // const payment = order.data.data.payment_system;
    const isPayed = order.data.data.is_payed;

    if (isPayed) {
      payload.replace(
          routing(`default?${qs.stringify({ id: payload.id })}`).paymentSuccess
      );
      return;
    }

    // if (payment) {
    //   yield put(changePaymentMethod.trigger(payment));
    //   yield put(selectPaymentMethod.trigger());
    // } else {
    //   yield put(changePaymentMethod.trigger(methods.data.data[0]));
    // }
    yield put(changePaymentMethod.trigger(methods.data.data[0]));
    yield put(fetchPaymentMethods.success(methods.data.data));
    yield put(fetchServicesOrderData.success(order.data.data));
  } catch (err) {
    if (err.response) {
      notification("error", err.response.data.message);
    }
    yield put(fetchServicesOrderData.failure());
    payload.replace(routing().notFound);
  }
}

export function* fetchSimplifyOrderWorker(settings) {
  yield put(fetchOrderParams.request());
  try {
    const api = yield getContext('api');
    let res;

    if (settings.orderId) {
        console.log('get order by id');
        res = yield call(() => api.checkout.getOrder(settings.orderId));
    } else {
        console.log('get order by token');
        res = yield call(() => api.checkout.getOrderByToken(settings.token));
    }

    settings.orderData = res.data.data;

    yield put(fetchOrderParams.success(res.data.data));
  } catch (e) {
    yield put(fetchOrderParams.failure());

  }
}

export function* successPaymentWorker(settings) {
  yield fork(initServerApp, settings);
  yield fork(fetchSimplifyOrderWorker, settings);
}

export function* paymentWatcher() {
  yield all([
    takeLatest(fetchOrderData.TRIGGER, fetchOrderWorker),
    takeLatest(fetchServicesOrderData.TRIGGER, fetchServicesOrderWorker),
    // takeLatest(fetchPaymentMethods.TRIGGER, fetchMethodsWorker),
    takeLatest(selectPaymentMethod.TRIGGER, submitPaymentWorker)
    // takeLatest(removeFromCart.SUCCESS, fetchCartWorker),
    // takeLatest(addToCart.TRIGGER, pushAddWorker),
    // takeLatest(removeFromCart.TRIGGER, pushRemoveWorker),
  ]);
}

