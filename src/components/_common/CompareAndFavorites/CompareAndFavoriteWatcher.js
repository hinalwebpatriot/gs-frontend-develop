import { createRoutine } from "redux-saga-routines";
import { all, put, takeLatest, fork } from "redux-saga/effects";
import {
  addDiamondToCompare,
  addEngagementToCompare,
  addPendantToCompare,
  addRingToCompare,
  addEarringToCompare,
  addBraceletToCompare,
  addEternityRingToCompare,
  addWeddingToCompare,
  removeDiamondFromCompare,
  removeEngagementFromCompare,
  removeWeddingFromCompare,
  removeEternityRingFromCompare,
  removeAllEarringFromCompare,
  removeAllPendantFromCompare,
  removeAllBraceletFromCompare,
  removeAllRingFromCompare,
  removeAllEternityRingFromCompare
} from "../../Compare/CompareActions";
import {
  addDiamondToFav,
  addEngagementToFav,
  addWeddingToFav,
  addProductToFav,
  removeDiamondFromFav,
  removeEngagementFromFav,
  removeWeddingFromFav,
  removeProductFromFav,
  removeEternityRingFromFav,
  addPendantToFav,
  addEarringToFav,
  addBraceletToFav,
  addEternityRingToFav,
  removeAllPendantFromFav,
  removeAllRingFromFav,
  removeAllEarringFromFav,
  removeAllBraceletFromFav,
  removeAllEternityRingFromFav,
  addRingToFav
} from "../../Favorite/FavoriteActions";

export const updateCompareAndFavoriteBar = createRoutine(
  "COMPARE_AND_FAVORITE_BAR_UPDATE"
);

export const saveFavToCompare = createRoutine("SAVE_FAV_TO_COMPARE"); // or reverse

// function* saveFavToCompareWorker({payload}) {
//   let state;
//   switch (payload.type) {
//     case ''
//   }
// }

// function* updateBar(actionType, payload) {
//   const { product_type, id, slug, sku, preview_image } = payload;
//   let obj = {};

//   yield put(updateCompareAndFavoriteBar(obj));
// }

function* updateFavBarWorker({ payload }) {
  yield put(updateCompareAndFavoriteBar("favorite"));
  // yield call(() => updateBar('favorite', payload));
}

function* updateCompareBarWorker({ payload }) {
  yield put(updateCompareAndFavoriteBar("compare"));
  // yield call(() => updateBar('compare', payload));
}

function* favWatcher() {
  yield all([
    // takeLatest(fetchFavorites.TRIGGER, updateFavBarWorker),
    // takeLatest(syncFavorites.TRIGGER, updateFavBarWorker),

    takeLatest(addDiamondToFav.TRIGGER, updateFavBarWorker),
    takeLatest(addEngagementToFav.TRIGGER, updateFavBarWorker),
    takeLatest(addWeddingToFav.TRIGGER, updateFavBarWorker),
    takeLatest(addProductToFav.TRIGGER, updateFavBarWorker),
    takeLatest(addWeddingToFav.TRIGGER, updateFavBarWorker),
    takeLatest(addPendantToFav.TRIGGER, updateFavBarWorker),
    takeLatest(addRingToFav.TRIGGER, updateFavBarWorker),
    takeLatest(addEarringToFav.TRIGGER, updateFavBarWorker),
    takeLatest(addBraceletToFav.TRIGGER, updateFavBarWorker),
    takeLatest(addEternityRingToFav.TRIGGER, updateFavBarWorker),
    takeLatest(removeProductFromFav.TRIGGER, updateFavBarWorker),

    takeLatest(removeDiamondFromFav.TRIGGER, updateFavBarWorker),
    takeLatest(removeEngagementFromFav.TRIGGER, updateFavBarWorker),
    takeLatest(removeWeddingFromFav.TRIGGER, updateFavBarWorker),
    takeLatest(removeProductFromFav.TRIGGER, updateFavBarWorker),
    takeLatest(removeEternityRingFromFav.TRIGGER, updateFavBarWorker),
    takeLatest(removeAllPendantFromFav.TRIGGER, updateFavBarWorker),
    takeLatest(removeAllRingFromFav.TRIGGER, updateFavBarWorker),
    takeLatest(removeAllEarringFromFav.TRIGGER, updateFavBarWorker),
    takeLatest(removeAllBraceletFromFav.TRIGGER, updateFavBarWorker),
    takeLatest(removeAllEternityRingFromFav.TRIGGER, updateFavBarWorker),
    takeLatest(removeProductFromFav.TRIGGER, updateFavBarWorker)    

    // takeLatest(removeAllDiamondFromFav.TRIGGER, updateFavBarWorker),
    // takeLatest(removeAllEngagementFromFav.TRIGGER, updateFavBarWorker),
    // takeLatest(removeAllWeddingFromFav.TRIGGER, updateFavBarWorker),
  ]);
}

function* compareWatcher() {
  yield all([
    // takeLatest(fetchCompare.TRIGGER, updateCompareBarWorker),
    // takeLatest(syncCompare.TRIGGER, updateCompareBarWorker),

    takeLatest(addDiamondToCompare.TRIGGER, updateCompareBarWorker),
    takeLatest(addEngagementToCompare.TRIGGER, updateCompareBarWorker),
    takeLatest(addWeddingToCompare.TRIGGER, updateCompareBarWorker),
    takeLatest(addPendantToCompare.TRIGGER, updateCompareBarWorker),
    takeLatest(addRingToCompare.TRIGGER, updateCompareBarWorker),
    takeLatest(addEarringToCompare.TRIGGER, updateCompareBarWorker),
    takeLatest(addBraceletToCompare.TRIGGER, updateCompareBarWorker),
    takeLatest(addEternityRingToCompare.TRIGGER, updateCompareBarWorker),
    takeLatest(removeDiamondFromCompare.TRIGGER, updateCompareBarWorker),
    takeLatest(removeEngagementFromCompare.TRIGGER, updateCompareBarWorker),
    takeLatest(removeWeddingFromCompare.TRIGGER, updateCompareBarWorker),
    takeLatest(removeEternityRingFromCompare.TRIGGER, updateCompareBarWorker),
    takeLatest(removeAllPendantFromCompare.TRIGGER, updateCompareBarWorker),
    takeLatest(removeAllRingFromCompare.TRIGGER, updateCompareBarWorker),
    takeLatest(removeAllEarringFromCompare.TRIGGER, updateCompareBarWorker),
    takeLatest(removeAllBraceletFromCompare.TRIGGER, updateCompareBarWorker),
    takeLatest(removeAllEternityRingFromCompare.TRIGGER, updateCompareBarWorker),
    //
    // takeLatest(removeAllDiamondFromCompare.TRIGGER, updateCompareBarWorker),
    // takeLatest(removeAllEngagementFromCompare.TRIGGER, updateCompareBarWorker),
    // takeLatest(removeAllWeddingFromCompare.TRIGGER, updateCompareBarWorker),
  ]);
}

export function* compareAndFavoriteWatcher() {
  yield all([fork(compareWatcher), fork(favWatcher)]);
}
