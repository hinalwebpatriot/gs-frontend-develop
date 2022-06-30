import { createRoutine } from "redux-saga-routines";
import { all, call, put, takeLatest, fork, select , getContext } from "redux-saga/effects";
import { delay } from "redux-saga";
import axios from "axios";
import RingConstructor from "../../_common/RingConstructor/RingConstructor";
import { isServer } from "../../../utils/isServer";
import createMetaSlug from "../../../utils/createMetaSlug";
import {
  fetchSeoTextBlockWorker,
  fetchMetaWorker,
  setMetaImage
} from "../../_common/SEO/SeoActions";
import selectors from "../../_selectors/engagementFeedSelectors";
import { initServerApp } from "../../rootSaga";
import { fetchShapesBlockWorker } from '../../Main/MainActions';
import { get } from "lodash";
import routing from "../../../config/routing";

export const filterChange = createRoutine("ENGAGEMENT_FILTER_CHANGED");

export const saveEngagementSort = createRoutine("ENGAGEMENT_SORT_SAVE");
export const saveEngagementPrice = createRoutine("ENGAGEMENT_PRICE_SAVE");
export const saveEngagementShape = createRoutine("ENGAGEMENT_SHAPE_SAVE");
export const saveEngagementMetal = createRoutine("ENGAGEMENT_METAL_SAVE");
export const saveEngagementStyle = createRoutine("ENGAGEMENT_STYLE_SAVE");
export const saveEngagementSize = createRoutine("ENGAGEMENT_SIZE_SAVE");
export const saveEngagementOffers = createRoutine("ENGAGEMENT_OFFERS_SAVE");
export const saveEngagementCollection = createRoutine(
  "ENGAGEMENT_COLLECTION_SAVE"
);

export const setEngagementMetal = createRoutine("ENGAGEMENT_METAL_SET");
export const setEngagementShape = createRoutine("ENGAGEMENT_SHAPE_SET");
export const setEngagementStyle = createRoutine("ENGAGEMENT_STYLE_SET");
export const setEngagementOffers = createRoutine("ENGAGEMENT_OFFERS_SET");
export const setEngagementGender = createRoutine("ENGAGEMENT_GENDER_SET");
export const setEngagementPrice = createRoutine("ENGAGEMENT_PRICE_SET");

export const changeEngagementSizeTab = createRoutine("ENGAGEMENT_SIZE_CHANGE");
export const changeEngagementGenderTab = createRoutine("EGAGEMENT_GENDER_CHANGE");
//
// export const setEngagementShape = createRoutine('ENGAGEMENT_SHAPE_SET');
// export const expandEngagementFilters = createRoutine('ENGAGEMENT_FILTER_EXPAND');
export const toggleEngagementFilter = createRoutine("ENGAGEMENT_FILTER_TOGGLE");
export const clearEngagementFilter = createRoutine("ENGAGEMENT_FILTER_CLEAR");
export const resetEngagementFilters = createRoutine("ENGAGEMENT_FILTERS_RESET");
// export const disableEngagementFilters = createRoutine('ENGAGEMENT_FILTERS_DISABLE');
//
// export const enableDiamondsFilterTriple = createRoutine('DIAMONDS_FILTER_TRIPLE_ENABLE');
// export const disableDiamondsFilterTriple = createRoutine('DIAMONDS_FILTER_TRIPLE_DISABLE');
//
export const fetchEngagementFeed = createRoutine("ENGAGEMENT_FEED_FETCH");
export const fetchEngagementFeedFilters = createRoutine(
  "ENGAGEMENT_FEED_FILTERS_CONFIG_FETCH"
);
export const fetchEngagementFeedNextPage = createRoutine(
  "ENGAGEMENT_FEED_NEXT_FETCH"
);

export const fetchEngagementShoppingEasy = createRoutine(
  "ENGAGEMENT_FEED_SHOPPING_EASY"
);

export const clearEngagementFilters = createRoutine("ENGAGEMENT_FILTERS_CLEAR");

function* fetchShoppingEasyBlockWorker() {
  yield put(fetchEngagementShoppingEasy.request());
  try {
    const api = yield getContext('api');
    const res = yield call(() => api.engagementFeed.getEasyShopping());
    yield put(fetchEngagementShoppingEasy.success(res.data));
  } catch (e) {
    yield put(fetchEngagementShoppingEasy.failure());
  }
}

function* fetchFiltersConfigWorker() {
  yield put(fetchEngagementFeedFilters.request());
  try {
    const api = yield getContext('api');
    const res = yield call(() => api.engagementFeed.getFilters());
    yield put(fetchEngagementFeedFilters.success(res.data));
  } catch (e) {
    yield put(fetchEngagementFeedFilters.failure());

  }
}

function generateFilterBody({
  sort,
  price,
  collection,
  offers,
  size,
  shape,
  gender,
  metal,
  style,
}) {
  let body = {};

  if (!price.isDisabled && (price.min !== null) && (price.max !== null)) {
    body["price"] = {
      min: price.min,
      max: price.max
    };
  }

  if (size.sizes.length) {
    body["ring_size"] = size.sizes;
  }

  if (shape.length) {
    body["shape"] = shape;
  }

  if (gender.length && gender === "mens") {
    body["gender"] = "male";
  }

  if (gender.length && gender === "womens") {
    body["gender"] = "female";
  }

  if (metal.length) {
    body["metal"] = metal;
  }

  if (style.length) {
    body["style"] = style;
  }

  if (collection.length) {
    body["collection"] = collection;
  }

  if (offers.length) {
    body["offers"] = offers;
  }

  if (sort.field !== null) {
    body["sort"] = sort;
  }

  return body;
}

let feedCancelSource;

function* fetchFeedWorker({ payload = {} }) {
  yield put(fetchEngagementFeed.request());

  if (!isServer) {
    window.scrollTo({
      top: 0,
      behavior: "instant"
    });

    yield call(delay, 600);
  }

  if (typeof feedCancelSource !== typeof undefined) {
    yield call(() => feedCancelSource.cancel("Test"));
  }

  feedCancelSource = axios.CancelToken.source();
  const config = { cancelToken: feedCancelSource.token };

  try {
    const api = yield getContext('api');
    let res;
    const test = yield select(selectors.filterInput);
    const body = generateFilterBody(yield select(selectors.filterInput));
    // const body = generateFilterBody(payload.input);
    const diamondFromStorage = RingConstructor.diamondId;

    if (diamondFromStorage) {
      res = yield call(() =>
        api.constructor.getRingsWithDiamond(
          {
            data: body,
            page: payload.page,
            perPage: payload.perPage
          },
          diamondFromStorage,
          config
        )
      );
    } else {
      res = yield call(() =>
        api.engagementFeed.getRings(
          {
            data: body,
            page: payload.page,
            perPage: payload.perPage
          },
          config
        )
      );
    }
    yield put(fetchEngagementFeed.success(res.data));
    yield put(setMetaImage(get(res, 'data.data[0].rings[0].preview_image.path.origin', '')));
  } catch (e) {
    yield put(fetchEngagementFeed.failure());

  }
}
//
function* fetchFeedNextPageWorker({ payload = {} }) {
  yield put(fetchEngagementFeedNextPage.request());
  try {
    const api = yield getContext('api');
    let res;
    const body = generateFilterBody(yield select(selectors.filterInput));
    const diamondFromStorage = RingConstructor.diamondId;

    if (diamondFromStorage) {
      res = yield call(() =>
        api.constructor.getRingsWithDiamond(
          {
            data: body,
            page: payload.page,
            perPage: payload.perPage
          },
          diamondFromStorage
        )
      );
    } else {
      res = yield call(() =>
        api.engagementFeed.getRings({
          data: body,
          page: payload.page,
          perPage: payload.perPage
        })
      );
    }

    yield put(fetchEngagementFeedNextPage.success(res.data));
  } catch (e) {
    yield put(fetchEngagementFeedNextPage.failure());

  }
}

function* clearFiltersWorker() {
  const config = yield select(selectors.filterConfig);
  yield put(clearEngagementFilters.success(config));
}

export function* engagementFeedServerWorker({ settings, seo, feed }) {
  const metaSlug = createMetaSlug(seo.page, seo.filter);

  yield fork(initServerApp, settings);
  yield fork(fetchSeoTextBlockWorker, { payload: metaSlug });
  yield fork(fetchMetaWorker, { payload: metaSlug });
  yield fork(fetchFiltersConfigWorker);
  yield fork(fetchFeedWorker, { payload: feed });
  yield fork(fetchShoppingEasyBlockWorker);
  yield fork(fetchShapesBlockWorker);
}

function* filterChangedWorker({ payload }) {
  payload.history.push(routing().engagementFeed)
}

export function* engagementFeedWatcher() {
  yield all([
    takeLatest(fetchEngagementFeed.TRIGGER, fetchFeedWorker),
    takeLatest(fetchEngagementFeedNextPage.TRIGGER, fetchFeedNextPageWorker),
    takeLatest(fetchEngagementFeedFilters.TRIGGER, fetchFiltersConfigWorker),
    takeLatest(clearEngagementFilters.TRIGGER, clearFiltersWorker),
    takeLatest(fetchEngagementShoppingEasy.TRIGGER, fetchShoppingEasyBlockWorker),
    takeLatest(filterChange.TRIGGER, filterChangedWorker),
  ]);
}
