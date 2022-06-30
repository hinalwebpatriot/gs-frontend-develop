import { createRoutine } from "redux-saga-routines";
import { all, call, put, takeLatest, getContext } from "redux-saga/effects";
import api from "../../../config/api";
import notification from "../../../utils/notification";
import { getInscriptionFontStorage, getInscriptionStorage } from "../../Product/Engraving/methods";

export const addToCart = createRoutine("ADD_TO_CART");
export const addToCartCompetedRing = createRoutine(
  "ADD_TO_CART_COMPLETED_RING"
);
export const removeFromCart = createRoutine("REMOVE_FROM_CART");
export const fetchCart = createRoutine("CART_FETCH");
export const clearPromocode = createRoutine("CLEAR_PROMOCODE");

function* addOrRemoveWorker(action, actionType, payload) {
  const { type, id, ringSize, noMessage } = payload;
  let fetchUrl;
  let params = { id };
  const api = yield getContext("api");
  const engraving = {
    text: getInscriptionStorage(id),
    font: getInscriptionFontStorage(id)
  };
  switch (type) {
    case "diamond":
      fetchUrl = api.cart[`${actionType}Diamond`];
      break;
    case "engagement":
      fetchUrl = api.cart[`${actionType}Engagement`];
      params["size_slug"] = ringSize;
      params["engraving"] = engraving;
      break;
    case "wedding":
      fetchUrl = api.cart[`${actionType}Wedding`];
      params["size_slug"] = ringSize;
      params["engraving"] = engraving;
      break;
    case "pendant":
    case "ring":
    case "earring":
    case "bracelet":
    case "eternity-ring":
    case "product":
    case "products":
      fetchUrl = api.cart[`${actionType}Product`];
      params["size_slug"] = ringSize;
      params["engraving"] = engraving;
      break;
      default:
        break;
  }
  try { 
    const res = yield call(() => fetchUrl(params));

    if (!noMessage) {
      notification("success", res.data.message);
    }
    yield put(action.success(payload));
  } catch (err) {
    if (err && err.response) {
      if (err.response.status === 404 && !noMessage) {
        notification("info", err.response.data.message);
      }
    }
  }
}

function* pushAddWorker({ payload }) {
  yield call(() => addOrRemoveWorker(addToCart, "add", payload));
}

function* pushRemoveWorker({ payload }) {
  yield call(() => addOrRemoveWorker(removeFromCart, "remove", payload));
}

function* pushAddCompletedRingWorker({ payload }) {
  const { diamondId, settingId, ringSize } = payload;

  // const diamondParams = {
  //   type: 'diamond',
  //   id: diamondId,
  //   noMessage: true,
  // };
  //
  // const ringParams = {
  //   type: 'engagement',
  //   id: settingId,
  //   ringSize: ringSize,
  // };

  try {
    const engraving = {
      text: getInscriptionStorage(settingId),
      font: getInscriptionFontStorage(settingId)
    };
    const api = yield getContext("api");
    yield call(() => api.cart.addDiamond({ id: diamondId }));
    yield call(() =>
      api.cart.addEngagement({ id: settingId, size_slug: ringSize, engraving })
    );
    yield put(addToCartCompetedRing.success());
    notification("success", "Ring has been added to cart", {settingId, ringSize});
  } catch (err) {
    if (err.response) {
      notification("error", err.response.data.message);
    } else {
      notification("error", "Something went wrong");
    }
  }
}

export function* clearPromocodeWorker() {
  yield put(clearPromocode.request());
  try {
    const api = yield getContext("api");
    const res = yield call(() => api.cart.clearPromocode());
    yield put(clearPromocode.success());
  } catch(e) {
    console.log('clearPromocode has error');
    yield put(clearPromocode.failure());
  }
}

export function* fetchCartWorker() {
  yield put(fetchCart.request());
  try {
    const api = yield getContext("api");
    const res = yield call(() => api.cart.getCart());
    yield put(fetchCart.success(res.data.data));
  } catch (e) {
    yield put(fetchCart.failure());
  }
}

export function* cartWatcher() {
  yield all([
    takeLatest(fetchCart.TRIGGER, fetchCartWorker),
    takeLatest(clearPromocode.TRIGGER, clearPromocodeWorker),
    takeLatest(removeFromCart.SUCCESS, fetchCartWorker),
    takeLatest(addToCart.TRIGGER, pushAddWorker),
    takeLatest(removeFromCart.TRIGGER, pushRemoveWorker),
    takeLatest(addToCartCompetedRing.TRIGGER, pushAddCompletedRingWorker),
  ]);
}
