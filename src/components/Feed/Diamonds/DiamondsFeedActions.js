import { createRoutine } from "redux-saga-routines";
import { all, call, put, takeLatest, select, fork , getContext } from "redux-saga/effects";
import { delay } from "redux-saga";
import { diamondsFeedInputDataSelector, diamondsFeedInputDataCaratSelector } from "../../_selectors/diamondsFeedSelectors";
import { isServer } from "../../../utils/isServer";
import createMetaSlug from "../../../utils/createMetaSlug";
import {
  fetchSeoTextBlockWorker,
  fetchMetaWorker,
  setMetaImage
} from "../../_common/SEO/SeoActions";
import { get } from "lodash";
import { diamondsFeedFiltersDataSelector } from "../../_selectors/diamondsFeedSelectors";

import axios from "axios";
import RingConstructor from "../../_common/RingConstructor/RingConstructor";
import { initServerApp } from "../../rootSaga";

export const saveDiamondsSort = createRoutine("DIAMONDS_SORT_SAVE");
export const saveDiamondsFilter = createRoutine("DIAMONDS_FILTER_SAVE");
export const setCaratFromUrl = createRoutine("DIAMONDS_CARAT_SET");
export const saveDiamondsShape = createRoutine("DIAMONDS_SHAPE_SAVE");
export const setDiamondsShape = createRoutine("DIAMONDS_SHAPE_SET");
export const expandDiamondsFilters = createRoutine("DIAMONDS_FILTER_EXPAND");
export const toggleDiamondsFilter = createRoutine("DIAMONDS_FILTER_TOGGLE");
export const disableDiamondsFilters = createRoutine("DIAMONDS_FILTERS_DISABLE");

export const enableDiamondsFilterTriple = createRoutine(
  "DIAMONDS_FILTER_TRIPLE_ENABLE"
);
export const disableDiamondsFilterTriple = createRoutine(
  "DIAMONDS_FILTER_TRIPLE_DISABLE"
);

export const toggleDiamondsVideoFilter = createRoutine('DIAMONDS_FILTER_VIDEO_TOGGLE');

export const fetchDiamondsFeed = createRoutine("DIAMONDS_FEED_FETCH");
export const fetchDiamondsFeedFilters = createRoutine(
  "DIAMONDS_FEED_FILTERS_CONFIG_FETCH"
);
export const fetchDiamondsFeedNextPage = createRoutine(
  "DIAMONDS_FEED_NEXT_FETCH"
);

export const clearDiamondsFilters = createRoutine(
  "DIAMONDS_FEED_FILTERS_CLEAR"
);

export const fetchDiamondsFirstRingSlider = createRoutine('DIAMONDS_FEED_FIRST_SLIDER_FETCH');
export const fetchDiamondsSecondRingSlider = createRoutine('DIAMONDS_FEED_SECOND_SLIDER_FETCH');

// export const fetchDiamondsBanners = createRoutine('DIAMONDS_BANNERS_FETCH');

// function* fetchDiamondsBannersWorker() {
//   yield put(fetchDiamondsBanners.request());
//   try {
//     const api = yield getContext('api');
//     const res = yield call(() => api.diamondsFeed.getDiamondsBanners());
//     yield put(fetchDiamondsBanners.success(res));
//   } catch (e) {
//     yield put(fetchDiamondsBanners.failure());
//   }
// }

function* fetchFirstRingSliderWorker() {
  yield put(fetchDiamondsFirstRingSlider.request());
  try {
    const api = yield getContext('api');
    const res = yield call(() => api.diamondsFeed.getFirstRingSlider());
    yield put(fetchDiamondsFirstRingSlider.success(res.data.data));
  } catch (e) {
    yield put(fetchDiamondsFirstRingSlider.failure());
  }
}

function* fetchSecondRingSliderWorker() {
  yield put(fetchDiamondsSecondRingSlider.request());
  try {
    const api = yield getContext('api');
    const res = yield call(() => api.diamondsFeed.getSecondRingSlider());
    yield put(fetchDiamondsSecondRingSlider.success(res.data.data));
  } catch (e) {
    yield put(fetchDiamondsSecondRingSlider.failure());
  }
}

function* fetchFiltersConfigWorker() {
  yield put(fetchDiamondsFeedFilters.request());
  try {
    const api = yield getContext('api');
    const res = yield call(() => api.diamondsFeed.getFilters());
    const carat = yield select(diamondsFeedInputDataCaratSelector);
    const defaultMin = get(res.data, 'carat.min', 0);
    const defaultMax = get(res.data, 'carat.max', 26.2);
    res.data.carat = {
      isDisabled: res.data.isDisabled,
      min: carat.min || defaultMin,
      max: carat.max || defaultMax,
      defaultMin,
      defaultMax,
    }

    yield put(fetchDiamondsFeedFilters.success(res.data));
  } catch (e) {
    yield put(fetchDiamondsFeedFilters.failure());
  }
}

function generateFilterBody({ shared, sort, shapes, carat, isVideo }) {
  let body = {};

  Object.keys(shared).forEach(key => {
    if (
      shared[key].min !== null &&
      shared[key].max !== null &&
      !shared[key].isDisabled
    ) {
      body = {
        ...body,
        [key]: {
          min: shared[key].min,
          max: shared[key].max
        }
      };
    }
  });

  if (shapes.length) {
    body["shape"] = shapes;
  }

  if (sort.field !== null) {
    body["sort"] = sort;
  }

  if (isVideo) {
    body['video'] = isVideo;
  }

  return body;
}

let feedCancelSource;

function* fetchFeedWorker({ payload = {} }) {
  yield put(fetchDiamondsFeed.request());

  if (!isServer) {
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
    const body = generateFilterBody(
      yield select(diamondsFeedInputDataSelector)
    );
    const settingFromStorage = RingConstructor.settingId;

    if (settingFromStorage) {

      res = yield call(() =>
        api.constructor.getDiamondsWithSetting(
          {
            data: body,
            page: payload.page,
            perPage: payload.perPage
          },
          settingFromStorage,
          config
        )
      );
    } else {
      res = yield call(() => {
        if(!!payload.offline){
        return api.diamondsFeed.getDiamonds(
            {
              data: body,
              page: payload.page,
              perPage: payload.perPage,
              offline: payload.offline
            },
            config
        )
        } else {
          return api.diamondsFeed.getDiamonds(
              {
                data: body,
                page: payload.page,
                perPage: payload.perPage,
                offline: payload.offline
              },
              config
          )
        }
      }

      );
    }
    yield put(fetchDiamondsFeed.success(res.data));
    yield put(setMetaImage(get(res, 'data.data[0].preview_image.path.origin', '')));
  } catch (e) {
    if (axios.isCancel(e)) {
    } else {
      yield put(fetchDiamondsFeed.failure());
    }
  }
}

function* fetchFeedNextPageWorker({ payload = {} }) {
  yield put(fetchDiamondsFeedNextPage.request());
  try {
    const api = yield getContext('api');
    let res;
    const body = generateFilterBody(
      yield select(diamondsFeedInputDataSelector)
    );
    const settingFromStorage = RingConstructor.settingId;

    if (settingFromStorage) {
      res = yield call(() =>
        api.constructor.getDiamondsWithSetting(
          {
            data: body,
            page: payload.page,
            perPage: payload.perPage
          },
          settingFromStorage
        )
      );
    } else {
      res = yield call(() =>{
        if(!!payload.offline){
         return api.diamondsFeed.getDiamonds({
            data: body,
            page: payload.page,
            perPage: payload.perPage,
            offline: payload.offline
          })
        } else {
          return api.diamondsFeed.getDiamonds({
            data: body,
            page: payload.page,
            perPage: payload.perPage,
            offline: payload.offline
          })
        }
      }
      );
    }

    yield put(fetchDiamondsFeedNextPage.success(res.data));
  } catch (e) {
    yield put(fetchDiamondsFeedNextPage.failure());

  }
}

function* clearFiltersWorker() {
  const config = yield select(diamondsFeedFiltersDataSelector);
  yield put(clearDiamondsFilters.success(config));
}

export function* diamondsFeedServerWorker({ settings, seo, feed }) {
  const metaSlug = createMetaSlug(seo.page, seo.filter);

  yield fork(initServerApp, settings);
  yield fork(fetchSeoTextBlockWorker, { payload: metaSlug });
  yield fork(fetchMetaWorker, { payload: metaSlug });
  yield fork(fetchFiltersConfigWorker);
  yield fork(fetchFeedWorker, { payload: feed });
  yield fork(fetchFirstRingSliderWorker);
  yield fork(fetchSecondRingSliderWorker);
}

export function* diamondsFeedWatcher() {
  yield all([
    takeLatest(fetchDiamondsFeed.TRIGGER, fetchFeedWorker),
    takeLatest(fetchDiamondsFeedNextPage.TRIGGER, fetchFeedNextPageWorker),
    takeLatest(fetchDiamondsFeedFilters.TRIGGER, fetchFiltersConfigWorker),
    takeLatest(clearDiamondsFilters.TRIGGER, clearFiltersWorker),
    takeLatest(fetchDiamondsFirstRingSlider.TRIGGER, fetchFirstRingSliderWorker),
    takeLatest(fetchDiamondsSecondRingSlider.TRIGGER, fetchSecondRingSliderWorker),
    // takeLatest(fetchDiamondsBanners.TRIGGER, fetchDiamondsBannersWorker)
  ]);
}
