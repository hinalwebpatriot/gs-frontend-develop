import { createRoutine } from "redux-saga-routines";
import { all, call, put, takeLatest, fork , getContext } from "redux-saga/effects";
import { weddingProductReviewsServerWorker } from "../../Reviews/ReviewsActions";
import { initServerApp } from "../../rootSaga";
import { fetchMetaWorker } from "../../_common/SEO/SeoActions";

export const fetchWeddingRing = createRoutine("WEDDING_RING_FETCH");
export const fetchWeddingRingMoreMetals = createRoutine(
  "WEDDING_RING_MORE_METALS_FETCH"
);
export const fetchWeddingRingSimilar = createRoutine(
  "WEDDING_RING_SIMILAR_COLLECTIONS_FETCH"
);

function* fetchRingWorker({ payload }) {
  yield put(fetchWeddingRing.request());
  try {
    const api = yield getContext('api');
    const res = yield call(() => api.weddingRing.getRing(payload)); //id
    yield put(fetchWeddingRing.success(res.data));
  } catch (e) {
    yield put(fetchWeddingRing.failure());
  }
}

function* fetchSimilarCollectionsWorker({ payload }) {
  yield put(fetchWeddingRingSimilar.request());
  try {
    const api = yield getContext('api');
    const res = yield call(() =>
      api.weddingRing.getSimilarCollections(payload)
    ); //id
    yield put(fetchWeddingRingSimilar.success(res.data.data));
  } catch (e) {
    yield put(fetchWeddingRingSimilar.failure());
    //
  }
}

function* fetchMoreMetalsWorker({ payload }) {
  yield put(fetchWeddingRingMoreMetals.request());
  try {
    const api = yield getContext('api');
    const res = yield call(() => api.weddingRing.getMoreMetals(payload)); //id
    yield put(fetchWeddingRingMoreMetals.success(res.data.data));
  } catch (e) {
    yield put(fetchWeddingRingMoreMetals.failure());
    //
  }
}

export function* weddingProductServerWorker({ id, reviews, settings, seo }) {
  yield fork(initServerApp, settings);
  yield fork(fetchMetaWorker, { payload: seo.page });
  yield fork(fetchRingWorker, { payload: id });
  yield fork(fetchMoreMetalsWorker, { payload: id });
  yield fork(fetchSimilarCollectionsWorker, { payload: id });
  yield fork(weddingProductReviewsServerWorker, { reviews });
}

export function* weddingProductWatcher() {
  yield all([
    takeLatest(fetchWeddingRing.TRIGGER, fetchRingWorker),
    takeLatest(fetchWeddingRingMoreMetals.TRIGGER, fetchMoreMetalsWorker),
    takeLatest(fetchWeddingRingSimilar.TRIGGER, fetchSimilarCollectionsWorker)
  ]);
}
