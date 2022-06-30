import { createRoutine } from "redux-saga-routines";
import { all, call, put, takeLatest, select , getContext } from "redux-saga/effects";
import { difference } from "lodash";
import favoriteSelectors from "../_selectors/favoriteSelectors";
import compareSelectors from "../_selectors/compareSelectors";

import notification from "../../utils/notification";

export const addDiamondToCompare = createRoutine("COMPARE_DIAMOND_ADD");
export const addEngagementToCompare = createRoutine(
    "COMPARE_ENGAGEMENT_RING_ADD"
);
export const addWeddingToCompare = createRoutine("COMPARE_WEDDING_RING_ADD");
export const addProductToCompare = createRoutine("COMPARE_PRODUCT_ADD");
export const addPendantToCompare = createRoutine("COMPARE_PENDANT_ADD");
export const addRingToCompare = createRoutine("COMPARE_RING_ADD");
export const addEarringToCompare = createRoutine("COMPARE_EARRING_ADD");
export const addBraceletToCompare = createRoutine("COMPARE_BRACELET_ADD");
export const addEternityRingToCompare = createRoutine("COMPARE_ETERNITY_RING_ADD");

export const addDiamondsFromCompareToFav = createRoutine("COMPARE_TO_FAV_DIAMONDS_ADD");
export const addEngagementsFromCompareToFav = createRoutine("COMPARE_TO_FAV_ENGAGEMENT_RINGS_ADD");
export const addWeddingsFromCompareToFav = createRoutine("COMPARE_TO_FAV_WEDDING_RINGS_ADD");
export const addProductsFromCompareToFav = createRoutine("COMPARE_TO_FAV_PRODUCTS_ADD");
export const addPendantsFromCompareToFav = createRoutine("COMPARE_TO_FAV_PENDANTS_ADD");
export const addRingsFromCompareToFav = createRoutine("COMPARE_TO_FAV_RIUNGS_ADD");
export const addEarringsFromCompareToFav = createRoutine("COMPARE_TO_FAV_EARRINGS_ADD");
export const addBraceletsFromCompareToFav = createRoutine("COMPARE_TO_FAV_BRACELETS_ADD");
export const addEternityRingsFromCompareToFav = createRoutine("COMPARE_TO_FAV_ETERNITY_RINGS_ADD");

export const removeDiamondFromCompare = createRoutine("COMPARE_DIAMOND_REMOVE");
export const removeEngagementFromCompare = createRoutine("COMPARE_ENGAGEMENT_RING_REMOVE");
export const removeWeddingFromCompare = createRoutine("COMPARE_WEDDING_RING_REMOVE");
export const removeProductFromCompare = createRoutine("COMPARE_PRODUCT_REMOVE");
export const removePendantFromCompare = createRoutine("COMPARE_PENDANT_REMOVE");
export const removeRingFromCompare = createRoutine("COMPARE_RING_REMOVE");
export const removeEarringFromCompare = createRoutine("COMPARE_EARRING_REMOVE");
export const removeBraceletFromCompare = createRoutine("COMPARE_BRACELET_REMOVE");
export const removeEternityRingFromCompare = createRoutine("COMPARE_ETERNITY_RING_REMOVE");

export const removeAllFromCompare = createRoutine("COMPARE_ALL_REMOVE");
export const removeAllDiamondFromCompare = createRoutine("COMPARE_ALL_DIAMONDS_REMOVE");
export const removeAllEngagementFromCompare = createRoutine("COMPARE_ALL_ENGAGEMENTS_REMOVE");
export const removeAllWeddingFromCompare = createRoutine("COMPARE_ALL_WEDDINGS_REMOVE");
export const removeAllProductFromCompare = createRoutine("COMPARE_ALL_PRODUCTS_REMOVE");
export const removeAllPendantFromCompare = createRoutine("COMPARE_ALL_PENDANTS_REMOVE");
export const removeAllRingFromCompare = createRoutine("COMPARE_ALL_RING_REMOVE");
export const removeAllEarringFromCompare = createRoutine("COMPARE_ALL_EARRINGS_REMOVE");
export const removeAllBraceletFromCompare = createRoutine("COMPARE_ALL_BRACELETS_REMOVE");
export const removeAllEternityRingFromCompare = createRoutine("COMPARE_ALL_ETERNITY_RING_REMOVE");

export const fetchCompare = createRoutine("COMPARE_FETCH");
export const syncCompare = createRoutine("COMPARE_UPDATE");

function* pushCompareToFav(action, url, type) {
  try {
    const favorite = yield select(favoriteSelectors.tabData, type);
    const compare = yield select(compareSelectors.tabData, type);

    const differentKeys = yield difference(compare.keys, favorite.keys);

    if (!differentKeys.length) {
      notification("info", "Current items already in favourites");
      return;
    }

    const availableSize = 6 - favorite.keys.length;

    if (availableSize === 0) {
      notification(
          "error",
          "Can't add this items because of limit - maximum 6 items per category"
      );
      return;
    }

    const slicedDifferentKeys = differentKeys.slice(0, availableSize);

    yield call(() => url({ id: slicedDifferentKeys }));

    const data = compare.items.filter(item =>
        slicedDifferentKeys.includes(item.id)
    );

    if (slicedDifferentKeys.length < differentKeys.length) {
      notification(
          "info",
          "Can't add some of items because of limit - maximum 6 items per category"
      );
    } else {
      notification("success", "All items has been added");
    }

    yield put(action.success(data));
  } catch (err) {
    notification("error", "Something went wrong");
    yield put(action.failure());
  }
}

function* makeFetch(action, url, params) {
  yield put(action.request());
  try {
    const res = yield call(() => url(params ? { id: params.id } : undefined));

    yield put(action.success(res.data));
  } catch (err) {
    switch (err.response.status) {
      case 404:
        // noinspection JSUnresolvedFunction
        yield put(action.fulfill(params));
        notification("error", err.response.data.message);
        break;
      default:
        yield put(action.failure(params));

    }
  }
}

function* pushAddDiamondWorker({ payload }) {
  const api = yield getContext('api');
  yield call(() =>
      makeFetch(addDiamondToCompare, api.compare.addDiamond, payload)
  );
}

function* pushAddEngagementWorker({ payload }) {
  console.log('addEngagementToCompare');
  const api = yield getContext('api');
  console.log('api', api);
  yield call(() =>
      makeFetch(addEngagementToCompare, api.compare.addEngagementRing, payload)
  );
}

function* pushAddWeddingWorker({ payload }) {
  const api = yield getContext('api');
  yield call(() =>
      makeFetch(addWeddingToCompare, api.compare.addWeddingRing, payload)
  );
}
function* pushAddProductWorker({ payload }) {
  const api = yield getContext('api');
  yield call(() =>
      makeFetch(addProductToCompare, api.compare.addProduct, payload)
  );
}
function* pushAddPendantWorker({ payload }) {
  const api = yield getContext('api');
  console.log('api', api);
  yield call(() =>
      makeFetch(addPendantToCompare, api.compare.addProduct, payload)
  );
}
function* pushAddRingWorker({ payload }) {
  const api = yield getContext('api');
  console.log('api', api);
  yield call(() =>
      makeFetch(addRingToCompare, api.compare.addProduct, payload)
  );
}
function* pushAddEarringWorker({ payload }) {
  const api = yield getContext('api');
  yield call(() =>
      makeFetch(addEarringToCompare, api.compare.addProduct, payload)
  );
}
function* pushAddBraceletWorker({ payload }) {
  const api = yield getContext('api');
  yield call(() =>
      makeFetch(addBraceletToCompare, api.compare.addProduct, payload)
  );
}
function* pushAddEternityRingWorker({ payload }) {
  const api = yield getContext('api');
  yield call(() =>
      makeFetch(addEternityRingToCompare, api.compare.addProduct, payload)
  );
}

function* pushRemoveDiamondWorker({ payload }) {
  const api = yield getContext('api');
  yield call(() =>
      makeFetch(removeDiamondFromCompare, api.compare.removeDiamond, payload)
  );
}

function* pushRemoveEngagementWorker({ payload }) {
  const api = yield getContext('api');
  yield call(() =>
      makeFetch(
          removeEngagementFromCompare,
          api.compare.removeEngagementRing,
          payload
      )
  );
}

function* pushRemoveWeddingWorker({ payload }) {
  const api = yield getContext('api');
  yield call(() =>
      makeFetch(removeWeddingFromCompare, api.compare.removeWeddingRing, payload)
  );
}
function* pushRemoveProductWorker({ payload }) {
  const api = yield getContext('api');
  yield call(() =>
      makeFetch(removeProductFromCompare, api.compare.removeProduct, payload)
  );
}
function* pushRemovePendantWorker({ payload }) {
  const api = yield getContext('api');
  yield call(() =>
      makeFetch(removePendantFromCompare, api.compare.removeProduct, payload)
  );
}
function* pushRemoveRingWorker({ payload }) {
  const api = yield getContext('api');
  yield call(() =>
      makeFetch(removeRingFromCompare, api.compare.removeProduct, payload)
  );
}
function* pushRemoveEarringWorker({ payload }) {
  const api = yield getContext('api');
  yield call(() =>
      makeFetch(removeEarringFromCompare, api.compare.removeProduct, payload)
  );
}
function* pushRemoveBraceletWorker({ payload }) {
  const api = yield getContext('api');
  yield call(() =>
      makeFetch(removeBraceletFromCompare, api.compare.removeProduct, payload)
  );
}
function* pushRemoveEternityRingWorker({ payload }) {
  const api = yield getContext('api');
  yield call(() =>
      makeFetch(removeEternityRingFromCompare, api.compare.removeProduct, payload)
  );
}

function* pushRemoveAllDiamondWorker() {
  const api = yield getContext('api');
  yield call(() =>
      makeFetch(removeAllDiamondFromCompare, api.compare.removeAllDiamonds)
  );
}

function* pushRemoveAllEngagementWorker() {
  const api = yield getContext('api');
  yield call(() =>
      makeFetch(
          removeAllEngagementFromCompare,
          api.compare.removeAllEngagementRings
      )
  );
}

function* pushRemoveAllWeddingWorker() {
  const api = yield getContext('api');
  yield call(() =>
      makeFetch(removeAllWeddingFromCompare, api.compare.removeAllWeddingRings)
  );
}
function* pushRemoveAllProductWorker() {
  const api = yield getContext('api');
  yield call(() =>
      makeFetch(removeAllProductFromCompare, api.compare.removeAllProducts)
  );
}
function* pushRemoveAllPendantWorker() {
  const api = yield getContext('api');
  yield call(() =>
      makeFetch(removeAllPendantFromCompare, api.compare.removeAllProducts)
  );
}
function* pushRemoveAllRingWorker() {
  const api = yield getContext('api');
  yield call(() =>
      makeFetch(removeAllRingFromCompare, api.compare.removeAllProducts)
  );
}
function* pushRemoveAllEarringWorker() {
  const api = yield getContext('api');
  yield call(() =>
      makeFetch(removeAllEarringFromCompare, api.compare.removeAllProducts)
  );
}
function* pushRemoveAllBraceletWorker() {
  const api = yield getContext('api');
  yield call(() =>
      makeFetch(removeAllBraceletFromCompare, api.compare.removeAllProducts)
  );
}
function* pushRemoveAllEternityRingWorker() {
  const api = yield getContext('api');
  yield call(() =>
      makeFetch(removeAllEternityRingFromCompare, api.compare.removeAllProducts)
  );
}

function* pushAddAllDiamondsToFavWorker() {
  const api = yield getContext('api');
  yield call(() =>
      pushCompareToFav(
          addDiamondsFromCompareToFav,
          api.favorite.addDiamond,
          "diamond"
      )
  );
}

function* pushAddAllEngagementsToFavWorker() {
  const api = yield getContext('api');
  yield call(() =>
      pushCompareToFav(
          addEngagementsFromCompareToFav,
          api.favorite.addEngagementRing,
          "engagement"
      )
  );
}

function* pushAddAllWeddingsToFavWorker() {
  const api = yield getContext('api');
  yield call(() =>
      pushCompareToFav(
          addWeddingsFromCompareToFav,
          api.favorite.addWeddingRing,
          "wedding"
      )
  );
}
function* pushAddAllProductsToFavWorker() {
  const api = yield getContext('api');
  yield call(() =>
      pushCompareToFav(
          addProductsFromCompareToFav,
          api.favorite.addProduct,
          "product"
      )
  );
}
function* pushAddAllPendantsToFavWorker() {
  const api = yield getContext('api');
  yield call(() =>
      pushCompareToFav(
          addPendantsFromCompareToFav,
          api.favorite.addProduct,
          "pendant"
      )
  );
}
function* pushAddAllEarringsToFavWorker() {
  const api = yield getContext('api');
  yield call(() =>
      pushCompareToFav(
          addEarringsFromCompareToFav,
          api.favorite.addProduct,
          "earring"
      )
  );
}
function* pushAddAllBraceletsToFavWorker() {
  const api = yield getContext('api');
  yield call(() =>
      pushCompareToFav(
          addBraceletsFromCompareToFav,
          api.favorite.addProduct,
          "bracelet"
      )
  );
}
function* pushAddAllEternityRingsToFavWorker() {
  const api = yield getContext('api');
  yield call(() =>
      pushCompareToFav(
          addEternityRingsFromCompareToFav,
          api.favorite.addProduct,
          "eternity-ring"
      )
  );
}


export function* fetchCompareWorker() {
  yield put(fetchCompare.request());
  try {
    const api = yield getContext('api');
    const res = yield call(() => api.compare.getCompare());
    yield put(fetchCompare.success(res.data.data));
  } catch (e) {
    yield put(fetchCompare.failure());

  }
}

function* updateCompareWorker() {
  yield put(syncCompare.request());
  try {
    const api = yield getContext('api');
    const res = yield call(() => api.compare.getCompare());
    if (res.status === 200) {
      yield put(syncCompare.success(res.data.data));
    } else {
      throw new Error("Fetch Error");
    }
  } catch (e) {
    yield put(syncCompare.failure());

  }
}

export function* compareWatcher() {
  yield all([
    takeLatest(fetchCompare.TRIGGER, fetchCompareWorker),
    takeLatest(syncCompare.TRIGGER, updateCompareWorker),

    takeLatest(addDiamondToCompare.TRIGGER, pushAddDiamondWorker),
    takeLatest(addEngagementToCompare.TRIGGER, pushAddEngagementWorker),
    takeLatest(addWeddingToCompare.TRIGGER, pushAddWeddingWorker),
    takeLatest(addProductToCompare.TRIGGER, pushAddProductWorker),
    takeLatest(addPendantToCompare.TRIGGER, pushAddPendantWorker),
    takeLatest(addRingToCompare.TRIGGER, pushAddRingWorker),
    takeLatest(addEarringToCompare.TRIGGER, pushAddEarringWorker),
    takeLatest(addBraceletToCompare.TRIGGER, pushAddBraceletWorker),
    takeLatest(addEternityRingToCompare.TRIGGER, pushAddEternityRingWorker),

    takeLatest(removeDiamondFromCompare.TRIGGER, pushRemoveDiamondWorker),
    takeLatest(removeEngagementFromCompare.TRIGGER, pushRemoveEngagementWorker),
    takeLatest(removeWeddingFromCompare.TRIGGER, pushRemoveWeddingWorker),
    takeLatest(removeProductFromCompare.TRIGGER, pushRemoveProductWorker),
    takeLatest(removePendantFromCompare.TRIGGER, pushRemovePendantWorker),
    takeLatest(removeRingFromCompare.TRIGGER, pushRemoveRingWorker),
    takeLatest(removeEarringFromCompare.TRIGGER, pushRemoveEarringWorker),
    takeLatest(removeBraceletFromCompare.TRIGGER, pushRemoveBraceletWorker),
    takeLatest(removeEternityRingFromCompare.TRIGGER, pushRemoveEternityRingWorker),

    takeLatest(removeAllDiamondFromCompare.TRIGGER, pushRemoveAllDiamondWorker),
    takeLatest(removeAllEngagementFromCompare.TRIGGER, pushRemoveAllEngagementWorker),
    takeLatest(removeAllWeddingFromCompare.TRIGGER, pushRemoveAllWeddingWorker),
    takeLatest(removeAllProductFromCompare.TRIGGER, pushRemoveAllProductWorker),
    takeLatest(removeAllPendantFromCompare.TRIGGER, pushRemoveAllPendantWorker),
    takeLatest(removeAllRingFromCompare.TRIGGER, pushRemoveAllRingWorker),
    takeLatest(removeAllEarringFromCompare.TRIGGER, pushRemoveAllEarringWorker),
    takeLatest(removeAllBraceletFromCompare.TRIGGER, pushRemoveAllBraceletWorker),
    takeLatest(removeAllEternityRingFromCompare.TRIGGER, pushRemoveAllEternityRingWorker),

    takeLatest(addDiamondsFromCompareToFav.TRIGGER, pushAddAllDiamondsToFavWorker),
    takeLatest(addEngagementsFromCompareToFav.TRIGGER, pushAddAllEngagementsToFavWorker),
    takeLatest(addWeddingsFromCompareToFav.TRIGGER, pushAddAllWeddingsToFavWorker),
    takeLatest(addProductsFromCompareToFav.TRIGGER, pushAddAllProductsToFavWorker),
    takeLatest(addPendantsFromCompareToFav.TRIGGER, pushAddAllPendantsToFavWorker),
    takeLatest(addEarringsFromCompareToFav.TRIGGER, pushAddAllEarringsToFavWorker),
    takeLatest(addBraceletsFromCompareToFav.TRIGGER, pushAddAllBraceletsToFavWorker),
    takeLatest(addEternityRingsFromCompareToFav.TRIGGER, pushAddAllEternityRingsToFavWorker),
  ]);
}
