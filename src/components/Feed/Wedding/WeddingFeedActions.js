import { createRoutine } from "redux-saga-routines";
import { all, call, put, takeLatest, fork, select , getContext } from "redux-saga/effects";
import { delay } from "redux-saga";
import { isServer } from "../../../utils/isServer";
import {
  fetchSeoTextBlockWorker,
  fetchMetaWorker,
  setMetaImage
} from "../../_common/SEO/SeoActions";
import { get } from "lodash";
import selectors from "../../_selectors/weddingFeedSelectors";
import routing from "../../../config/routing";

import { initServerApp } from "../../rootSaga";
import { fetchShapesBlockWorker } from '../../Main/MainActions';

export const filterChange = createRoutine("WEDDING_FILTER_CHANGED");

export const saveWeddingSort = createRoutine("WEDDING_SORT_SAVE");
export const saveWeddingPrice = createRoutine("WEDDING_PRICE_SAVE");
export const saveWeddingMetal = createRoutine("WEDDING_METAL_SAVE");
export const saveWeddingStyle = createRoutine("WEDDING_STYLE_SAVE");
export const saveWeddingSize = createRoutine("WEDDING_SIZE_SAVE");
export const saveWeddingOffers = createRoutine("WEDDING_OFFERS_SAVE");

export const setWeddingStyle = createRoutine("WEDDING_STYLE_SET");
export const setWeddingMetal = createRoutine("WEDDING_METAL_SET");

export const changeWeddingSizeTab = createRoutine("WEDDING_SIZE_CHANGE");
export const changeWeddingGenderTab = createRoutine("WEDDING_GENDER_CHANGE");

export const toggleWeddingFilter = createRoutine("WEDDING_FILTER_TOGGLE");
export const clearWeddingFilter = createRoutine("WEDDING_FILTER_CLEAR");
export const resetWeddingFilters = createRoutine("WEDDING_FILTERS_RESET");

export const fetchWeddingFeed = createRoutine("WEDDING_FEED_FETCH");
export const fetchWeddingFeedFilters = createRoutine(
  "WEDDING_FEED_FILTERS_CONFIG_FETCH"
);
export const fetchWeddingFeedNextPage = createRoutine(
  "WEDDING_FEED_NEXT_FETCH"
);

export const clearWeddingFilters = createRoutine("WEDDING_FILTERS_CLEAR");

export const fetchWeddingShoppingEasy = createRoutine(
  "WEDDING_FEED_SHOPPING_EASY"
);

function* fetchShoppingEasyBlockWorker() {
  yield put(fetchWeddingShoppingEasy.request());
  try {
    const api = yield getContext('api');
    const res = yield call(() => api.weddingFeed.getEasyShopping());
    yield put(fetchWeddingShoppingEasy.success(res.data));
  } catch (e) {
    yield put(fetchWeddingShoppingEasy.failure());

  }
}

function* fetchFiltersConfigWorker() {
  yield put(fetchWeddingFeedFilters.request());
  try {
    const api = yield getContext('api');
    const res = yield call(() => api.weddingFeed.getFilters());
    yield put(fetchWeddingFeedFilters.success(res.data));
  } catch (e) {
    yield put(fetchWeddingFeedFilters.failure());

  }
}
//
function generateFilterBody({
  sort,
  price,
  size,
  gender,
  metal,
  style,
  offers
}) {
  let body = {};

  body["gender"] = gender;

  if (!price.isDisabled && (price.min !== null) && (price.max !== null)) {
    body["price"] = {
      min: price.min,
      max: price.max
    };
  }

  if (size.sizes.length) {
    body["ring_size"] = size.sizes;
  }

  if (metal.length) {
    body["metal"] = metal;
  }

  if (style.length) {
    body["style"] = style;
  }

  if (offers.length) {
    body["offers"] = offers;
  }

  if (sort.field !== null) {
    body["sort"] = sort;
  }

  return body;
}

function* fetchFeedWorker({ payload = {} }) {
  yield put(fetchWeddingFeed.request());

  if (!isServer) {
    window.scrollTo({
      top: 0,
      behavior: "instant"
    });

    yield call(delay, 600);
  }

  try {
    const body = generateFilterBody(yield select(selectors.filterInput));
    const api = yield getContext('api');
    const res = yield call(() =>
      api.weddingFeed.getRings({
        data: body,
        page: payload.page,
        perPage: payload.perPage
      })
    );
    yield put(fetchWeddingFeed.success(res.data));   
    yield put(setMetaImage(get(res, 'data.data[0].rings[0].preview_image.path.origin', '')));
  } catch (e) {
    yield put(fetchWeddingFeed.failure());

  }
}

function* fetchFeedNextPageWorker({ payload = {} }) {
  yield put(fetchWeddingFeedNextPage.request());
  try {
    const body = generateFilterBody(yield select(selectors.filterInput));
    const api = yield getContext('api');
    const res = yield call(() =>
      api.weddingFeed.getRings({
        data: body,
        page: payload.page,
        perPage: payload.perPage
      })
    );
    yield put(fetchWeddingFeedNextPage.success(res.data));
  } catch (e) {
    yield put(fetchWeddingFeedNextPage.failure());

  }
}

function* clearFiltersWorker() {
  const config = yield select(selectors.filterConfig);
  yield put(clearWeddingFilters.success(config));
}

export function* weddingFeedServerWorker({ seo, feed, settings }) {
  const metaSlug = seo.page.toLowerCase();

  yield fork(initServerApp, settings);
  yield fork(fetchSeoTextBlockWorker, { payload: metaSlug });
  yield fork(fetchMetaWorker, { payload: metaSlug });
  yield fork(fetchFiltersConfigWorker);
  yield fork(fetchFeedWorker, { payload: feed });
  yield fork(fetchShoppingEasyBlockWorker);
  yield fork(fetchShapesBlockWorker);
}

function* filterChangedWorker({ payload }) {
  payload.history.push(routing().weddingFeed)
}

export function* weddingFeedWatcher() {
  yield all([
    takeLatest(fetchWeddingFeed.TRIGGER, fetchFeedWorker),
    takeLatest(fetchWeddingFeedNextPage.TRIGGER, fetchFeedNextPageWorker),
    takeLatest(fetchWeddingFeedFilters.TRIGGER, fetchFiltersConfigWorker),
    takeLatest(clearWeddingFilters.TRIGGER, clearFiltersWorker),
    takeLatest(fetchWeddingShoppingEasy.TRIGGER, fetchShoppingEasyBlockWorker),
    takeLatest(filterChange.TRIGGER, filterChangedWorker),
  ]);
}
