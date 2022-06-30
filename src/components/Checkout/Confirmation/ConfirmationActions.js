import { createRoutine } from "redux-saga-routines";
import { all, call, put, takeLatest , getContext } from "redux-saga/effects";
import notification from "../../../utils/notification";
import routing from "../../../config/routing";
import qs from "qs";
import GoogleEE from '../../_common/GoogleEE/GoogleEE';

export const parsePaymentParams = createRoutine("PAYMENT_PARAMS_PARSE");

export const pushPayment = createRoutine("PAYMENT_PUSH");

export const pushConfirmationPayment = createRoutine(
  "PAYMENT_CONFIRMATION_PUSH"
);
export const fetchPaymentOrder = createRoutine("PAYMENT_ORDER_FETCH");

function* paymentOrderWorker({ payload }) {
  yield put(pushConfirmationPayment.request());
  try {
    const api = yield getContext('api');
    const res = yield call(() =>
      api.checkout.getOrder(qs.parse(payload.params).id)
    );

    const order = res.data.data;

    GoogleEE.checkoutStep({
      products: order.products_list,
      step: 4
    });

    GoogleEE.checkoutSuccess({
      order,
      method: payload.type,
    });

    yield put(pushConfirmationPayment.success(order));
  } catch (err) {
    payload.replace(routing().cart);
    yield put(pushConfirmationPayment.failure());
  }
}

function* paymentWorker({ payload }) {
  yield put(pushConfirmationPayment.request());
  try {
    const api = yield getContext('api');
    const res = yield call(() =>
      api.checkout.executePaypalPayment(payload.params)
    );

    if (res.data.message) {
      notification("success", res.data.message);
    }

    const order = res.data.order;

    GoogleEE.checkoutStep({
      products: order.products_list,
      step: 4,
    });

    GoogleEE.checkoutSuccess({
      order,
      method: payload.type,
    });

    yield put(pushConfirmationPayment.success(res.data.order));
  } catch (err) {
    if (err.response) {
      switch (err.response.status) {
        case 404:
          notification("info", "Order already paid");

          yield put(pushConfirmationPayment.success(err.response.data.order));
          //already payed
          break;
        case 422:
          yield put(pushConfirmationPayment.failure());
          payload.replace(routing("default").paymentFailure);
          //wrong params
          break;
        default:
          yield put(pushConfirmationPayment.failure());
          payload.replace(routing("default").paymentFailure);
      }
    } else {
      payload.replace(routing("default").paymentFailure);
    }
  }
}

function* parsePaymentParamsWorker({ payload }) {
  const { type, queryString, replace } = payload;
  try {
    if (type && queryString) {
      const paymentParams = qs.parse(queryString);
      yield put(pushPayment({ params: paymentParams, replace: replace, type }))
    } else {
      notification("error", "Wrong url");
      // replace(routing().cart);
    }
  } catch (err) {
  }
}

export function* confirmationWatcher() {
  yield all([
    takeLatest(parsePaymentParams.TRIGGER, parsePaymentParamsWorker),
    takeLatest(pushPayment, paymentWorker),
    takeLatest(fetchPaymentOrder.TRIGGER, paymentOrderWorker)
    // takeLatest(fetchPaymentMethods.TRIGGER, fetchMethodsWorker),
    // takeLatest(removeFromCart.SUCCESS, fetchCartWorker),
    // takeLatest(addToCart.TRIGGER, pushAddWorker),
    // takeLatest(removeFromCart.TRIGGER, pushRemoveWorker),
  ]);
}
