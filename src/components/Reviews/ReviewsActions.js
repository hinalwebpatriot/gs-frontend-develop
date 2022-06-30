import { createRoutine } from "redux-saga-routines";
import { all, call, put, takeLatest, fork, getContext } from "redux-saga/effects";
import { initServerApp } from "../rootSaga";
import { fetchMetaWorker } from "../_common/SEO/SeoActions";
import { get } from "lodash";

export const fetchEngagementReviews = createRoutine("ENGAGEMENT_REVIEWS_FETCH");
export const fetchEngagementCategoryReviews = createRoutine(
  "ENGAGEMENT_CATEGORY_REVIEWS_FETCH"
);
export const fetchEngagementProductReviews = createRoutine(
  "ENGAGEMENT_PRODUCT_REVIEWS_FETCH"
);

export const fetchWeddingReviews = createRoutine("WEDDING_REVIEWS_FETCH");
export const fetchWeddingCategoryReviews = createRoutine(
  "WEDDING_CATEGORY_REVIEWS_FETCH"
);
export const fetchWeddingProductReviews = createRoutine(
  "WEDDING_PRODUCT_REVIEWS_FETCH"
);

export const fetchCatalogReviews = createRoutine("CATALOG_REVIEWS_FETCH");
export const fetchCatalogCategoryReviews = createRoutine(
    "CATALOG_CATEGORY_REVIEWS_FETCH"
);
export const fetchCatalogProductReviews = createRoutine(
    "CATALOG_PRODUCT_REVIEWS_FETCH"
);

function* fetchCreator(action, payload) {
  yield put(action.request({ payload }));
  try {
    let fetchUrl;
    let flag;
    const api = yield getContext('api');

    switch (action) {
      case fetchEngagementReviews:
        fetchUrl = api.reviews.getEngagementRing;
        flag = true;
        break;
      case fetchEngagementProductReviews:
        fetchUrl = api.reviews.getEngagementRing;
        break;
      case fetchEngagementCategoryReviews:
        fetchUrl = api.reviews.getEngagementCategory;
        break;
      case fetchWeddingReviews:
        fetchUrl = api.reviews.getWeddingRing;
        flag = true;
        break;
      case fetchWeddingProductReviews:
        fetchUrl = api.reviews.getWeddingRing;
        break;
      case fetchWeddingCategoryReviews:
        fetchUrl = api.reviews.getWeddingCategory;
        break;

      case fetchCatalogReviews:
        fetchUrl = api.reviews.getCatalogJewellery;
        flag = true;
        break;
      case fetchCatalogProductReviews:
        fetchUrl = api.reviews.getCatalogJewellery;
        break;
      case fetchCatalogCategoryReviews:
        fetchUrl = api.reviews.getCatalogCategory;
        break;
    }

    const res = yield call(() => fetchUrl(payload));

    if (flag && !res.data.data.length) {
      yield put(action.failure());
    } else {
      yield put(action.success({ ...res.data, isNextPage: payload.isNextPage }));
    }
  } catch (err) {
    yield put(action.failure());
  }
}

export function* fetchEngagementReviewsWorker({ payload }) {
  yield fork(fetchCreator, fetchEngagementReviews, payload);
}

function* fetchEngagementCategoryReviewsWorker({ payload }) {
  yield fork(fetchCreator, fetchEngagementCategoryReviews, payload);
}

function* fetchEngagementProductReviewsWorker({ payload }) {
  yield fork(fetchCreator, fetchEngagementProductReviews, payload);
}

export function* fetchWeddingReviewsWorker({ payload }) {
  yield fork(fetchCreator, fetchWeddingReviews, payload);
  // yield call(() => fetchCreator(fetchWeddingReviews, payload));
}

function* fetchWeddingCategoryReviewsWorker({ payload }) {
  yield fork(fetchCreator, fetchWeddingCategoryReviews, payload);
}

function* fetchWeddingProductReviewsWorker({ payload }) {
  yield fork(fetchCreator, fetchWeddingProductReviews, payload);
}




export function* fetchCatalogReviewsWorker({ payload }) {
  yield fork(fetchCreator, fetchCatalogReviews, payload);
}

function* fetchCatalogCategoryReviewsWorker({ payload }) {
  yield fork(fetchCreator, fetchCatalogCategoryReviews, payload);
}

function* fetchCatalogProductReviewsWorker({ payload }) {
  yield fork(fetchCreator, fetchCatalogProductReviews, payload);
}

export function* reviewsServerWorker({ reviews, settings }) {
  yield fork(initServerApp, settings);
  yield fork(fetchMetaWorker, { payload: 'reviews' });
  yield fork(fetchEngagementCategoryReviewsWorker, { payload: reviews });
}

export function* engagementReviewsServerWorker({ reviews, settings }) {
  yield fork(initServerApp, settings);
  yield fork(fetchEngagementReviewsWorker, { payload: reviews });
}

export function* engagementProductReviewsServerWorker({ reviews }) {
  yield fork(fetchEngagementProductReviewsWorker, { payload: reviews });
}

export function* weddingReviewsServerWorker({ reviews, settings }) {
  yield fork(initServerApp, settings);
  yield fork(fetchWeddingReviewsWorker, { payload: reviews });
}

export function* weddingProductReviewsServerWorker({ reviews }) {
  yield fork(fetchWeddingProductReviewsWorker, { payload: reviews });
}


export function* catalogReviewsServerWorker({ reviews, settings }) {
  yield fork(initServerApp, settings);
  yield fork(fetchCatalogReviewsWorker, { payload: reviews });
}

export function* catalogProductReviewsServerWorker({ reviews }) {
  yield fork(fetchCatalogProductReviewsWorker, { payload: reviews });
}


export function* reviewsWatcher() {
  yield all([
    takeLatest(fetchEngagementReviews.TRIGGER, fetchEngagementReviewsWorker),
    takeLatest(
      fetchEngagementCategoryReviews.TRIGGER,
      fetchEngagementCategoryReviewsWorker
    ),
    takeLatest(
      fetchEngagementProductReviews.TRIGGER,
      fetchEngagementProductReviewsWorker
    ),

    takeLatest(fetchWeddingReviews.TRIGGER, fetchWeddingReviewsWorker),
    takeLatest(
      fetchWeddingCategoryReviews.TRIGGER,
      fetchWeddingCategoryReviewsWorker
    ),
    takeLatest(
      fetchWeddingProductReviews.TRIGGER,
      fetchWeddingProductReviewsWorker
    ),

    takeLatest(fetchCatalogReviews.TRIGGER, fetchCatalogReviewsWorker),
    takeLatest(
        fetchCatalogCategoryReviews.TRIGGER,
        fetchCatalogCategoryReviewsWorker
    ),
    takeLatest(
        fetchCatalogProductReviews.TRIGGER,
        fetchCatalogProductReviewsWorker
    )
  ]);
}
