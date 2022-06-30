import { createRoutine } from "redux-saga-routines";
import { all, call, put, takeLatest, fork , getContext } from "redux-saga/effects";
import { fetchShowroomDataWorker } from "../../_common/ShowroomBlock/ShowroomBlockActions";

import { catalogProductReviewsServerWorker } from "../../Reviews/ReviewsActions";
import { initServerApp } from "../../rootSaga";
import { fetchMetaWorker,
  setMetaImage
} from "../../_common/SEO/SeoActions";
import { get } from "lodash";

export const fetchCatalogProduct = createRoutine("CATALOG_PRODUCT_FETCH");
export const fetchEngagementRingRecRings = createRoutine("ENGAGEMENT_RING_REC_RINGS_FETCH");
export const fetchEngagementRingRecDiamonds = createRoutine("ENGAGEMENT_RING_REC_DIAMONDS_FETCH");
export const fetchEngagementRingYourPicks = createRoutine("ENGAGEMENT_RING_YOUR_PICKS_FETCH");

function* fetchProductWorker({ payload }) {
  yield put(fetchCatalogProduct.request());
  try {
    const api = yield getContext('api');
    const res = yield call(() => api.catalog.getCatalog(payload));
    yield put(fetchCatalogProduct.success(res.data));
    yield put(setMetaImage(get(res, 'data.selected.preview_image.path.origin', '')));
  } catch (e) {
    yield put(fetchCatalogProduct.failure());
  }
}

function* fetchRecommendedRingsWorker() {
  yield put(fetchEngagementRingRecRings.request());
  try {
    const api = yield getContext('api');

    const res = yield call(() => api.engagementRing.getSuggestions());
    yield put(fetchEngagementRingRecRings.success(res.data.data));
  } catch (e) {
    yield put(fetchEngagementRingRecRings.failure());
  }
}

function* fetchRecommendedDiamondsWorker({ payload }) {
  yield put(fetchEngagementRingRecDiamonds.request());
  try {
    const api = yield getContext('api');
    const res = yield call(() => api.engagementRing.getRecommendedDiamonds({ ringId: payload }));
    yield put(fetchEngagementRingRecDiamonds.success(res.data.data));
  } catch (e) {
    yield put(fetchEngagementRingRecDiamonds.failure());
  }
}

function* fetchYourPicksWorker() {
  yield put(fetchEngagementRingYourPicks.request());
  try {
    const api = yield getContext('api');
    const res = yield call(() => api.engagementRing.getYouHaveSeen());
    yield put(fetchEngagementRingYourPicks.success(res.data.data));
  } catch (e) {
    yield put(fetchEngagementRingYourPicks.failure());
  }
}

export function* catalogProductServerWorker({ id, reviews, settings, seo }) {
  yield fork(initServerApp, settings);
  yield fork(fetchMetaWorker, { payload: seo.page });
  yield fork(fetchProductWorker, { payload: id });
  yield fork(fetchRecommendedRingsWorker);
  // yield fork(fetchRecommendedDiamondsWorker, { payload: id });
  yield fork(fetchYourPicksWorker);
  yield fork(fetchShowroomDataWorker);
  yield fork(catalogProductReviewsServerWorker, { reviews });
}

export function* catalogProductWatcher() {
  yield all([
    takeLatest(fetchCatalogProduct.TRIGGER, fetchProductWorker),
    takeLatest(fetchEngagementRingRecRings.TRIGGER, fetchRecommendedRingsWorker),
    takeLatest(fetchEngagementRingRecDiamonds.TRIGGER, fetchRecommendedDiamondsWorker),
    takeLatest(fetchEngagementRingYourPicks.TRIGGER, fetchYourPicksWorker)
  ]);
}
