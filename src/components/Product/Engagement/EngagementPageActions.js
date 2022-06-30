import { createRoutine } from "redux-saga-routines";
import { all, call, put, takeLatest, fork , getContext } from "redux-saga/effects";
import { fetchShowroomDataWorker } from "../../_common/ShowroomBlock/ShowroomBlockActions";

import { engagementProductReviewsServerWorker } from "../../Reviews/ReviewsActions";
import { initServerApp } from "../../rootSaga";
import { fetchMetaWorker,
   setMetaImage
} from "../../_common/SEO/SeoActions";
import { get } from "lodash";

export const fetchEngagementRing = createRoutine("ENGAGEMENT_RING_FETCH");
export const fetchEngagementRingRecRings = createRoutine("ENGAGEMENT_RING_REC_RINGS_FETCH");
export const fetchEngagementRingRecDiamonds = createRoutine("ENGAGEMENT_RING_REC_DIAMONDS_FETCH");
export const fetchEngagementRingYourPicks = createRoutine("ENGAGEMENT_RING_YOUR_PICKS_FETCH");

function* fetchRingWorker({ payload }) {
  yield put(fetchEngagementRing.request());
  try {
    const api = yield getContext('api');
    const res = yield call(() => api.engagementRing.getRing(payload));
    yield put(fetchEngagementRing.success(res.data)); 
    yield put(setMetaImage(get(res, 'data.selected.preview_image.path.origin', '')));
  } catch (e) {
    yield put(fetchEngagementRing.failure());
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
    const res = yield call(() => api.engagementRing.getRecommendedDiamonds({ ringId: payload }))
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

export function* engagementProductServerWorker({ id, reviews, settings, seo }) {
  yield fork(initServerApp, settings);
  yield fork(fetchMetaWorker, { payload: seo.page });
  yield fork(fetchRingWorker, { payload: id });
  yield fork(fetchRecommendedRingsWorker);
  // yield fork(fetchRecommendedDiamondsWorker, { payload: id });
  yield fork(fetchYourPicksWorker);
  yield fork(fetchShowroomDataWorker);
  yield fork(engagementProductReviewsServerWorker, { reviews });
}

export function* engagementProductWatcher() {
  yield all([
    takeLatest(fetchEngagementRing.TRIGGER, fetchRingWorker),
    takeLatest(fetchEngagementRingRecRings.TRIGGER, fetchRecommendedRingsWorker),
    takeLatest(fetchEngagementRingRecDiamonds.TRIGGER, fetchRecommendedDiamondsWorker),
    takeLatest(fetchEngagementRingYourPicks.TRIGGER, fetchYourPicksWorker)
  ]);
}
