import { createRoutine } from "redux-saga-routines";
import { call, put, takeLatest, all, fork , getContext } from "redux-saga/effects";
import { fetchMetaWorker } from '../../_common/SEO/SeoActions';
import { initServerApp } from '../../rootSaga';
import {fetchStaticPage, fetchStaticPageWorker} from "../../Static/StaticPageActions";

export const fetchSaleEngagementFeed = createRoutine(`SALE_ENGAGEMENT_FEED_FETCH`);
export const fetchSaleEngagementFeedNextPage = createRoutine(`SALE_ENGAGEMENT_FEED_NEXT_FETCH`);

function* fetchSaleFeedWorker({ payload }) {
  const { page = 1, perPage = 8 } = payload;

  yield put(fetchSaleEngagementFeed.request());
  try {
    const api = yield getContext('api');
    const res = yield call(() => api.engagementFeed.getRings({ data: { offers: ['discount-10'] }, page, perPage }))
    yield put(fetchSaleEngagementFeed.success(res.data));
  } catch (e) {
    yield put(fetchSaleEngagementFeed.failure());
  }
}

function* fetchSaleFeedNextPageWorker({ payload }) {
  const { page = 1, perPage = 8 } = payload;

  yield put(fetchSaleEngagementFeedNextPage.request());
  try {
    const api = yield getContext('api');
    const res = yield call(() => api.engagementFeed.getRings({ data: { offers: ['discount-10'] }, page, perPage }))
    yield put(fetchSaleEngagementFeedNextPage.success(res.data));
  } catch (e) {
    yield put(fetchSaleEngagementFeedNextPage.failure());
  }
}

export function* saleFeedWatcher() {
  yield all([
    takeLatest(fetchSaleEngagementFeed.TRIGGER, fetchSaleFeedWorker),
    takeLatest(fetchSaleEngagementFeedNextPage.TRIGGER, fetchSaleFeedNextPageWorker),
    takeLatest(fetchStaticPage.TRIGGER, fetchStaticPageWorker),
  ])
}

export function* saleFeedServerWorker({ slug, settings, feed }) {
  yield fork(fetchSaleFeedWorker, { payload: feed });
  yield fork(fetchMetaWorker, { payload: slug });
  yield fork(initServerApp, settings);
}
