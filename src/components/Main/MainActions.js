import { createRoutine } from "redux-saga-routines";
import { all, call, put, takeLatest, fork, select , getContext } from "redux-saga/effects";
import { deviceSelector } from "../_selectors/deviceSelector";
import { initServerApp } from "../rootSaga";
import { fetchMetaWorker, setMetaImage } from "../_common/SEO/SeoActions";
import { get } from "lodash";

export const fetchMainSlider = createRoutine("MAIN_SLIDER_FETCH");
export const fetchShapesBlock = createRoutine("MAIN_SHAPES_BLOCK_FETCH");

export const setShapeFromShapesBlock = createRoutine("MAIN_SHAPES_BLOCK_SET");

export const fetchYouHaveSeenSlider = createRoutine("MAIN_YOU_HAVE_SEEN_SLIDER_FETCH");

export const fetchOccasionSlider = createRoutine("MAIN_OCCASION_SLIDER_FETCH");
export const fetchWeddingRingsSlider = createRoutine(
  "MAIN_WEDDING_RINGS_SLIDER_FETCH"
);
export const setWeddingRingsSlider = createRoutine(
  "MAIN_WEDDING_RINGS_SLIDER_SET"
);

export const fetchCustomJewelry = createRoutine("MAIN_CUSTOM_JEWELRY_FETCH");
export const fetchAllProductCategories = createRoutine(
  "MAIN_ALL_PRODUCT_CATEGORIES_FETCH"
);
export const fetchSuggestedRings = createRoutine(
  "MAIN_ALL_SUGGESTED_FETCH"
);
export const fetchAlsoSuggestedRings = createRoutine(
  "MAIN_ALL_ALSO_SUGGESTED_FETCH"
);

export const setMainPageWatchedStatus = createRoutine(
  "MAIN_PAGE_IS_WATCHED_SET"
);
export const setAcceptCookie = createRoutine("COOKIE_MODAL_ACCEPT");

function* fetchMainSliderWorker() {
  // yield put(fetchMainSlider.request());
  try {
    const isMobile = yield select(deviceSelector);
    // const isMobile = false;
    const api = yield getContext('api');
    const res = yield call(() =>
      isMobile ? api.main.sliderMobile() : api.main.slider()
    );
    yield put(fetchMainSlider.success(res.data));
    yield put(setMetaImage(get(res, 'data.slides[0].image', '')));
  } catch (err) {
    yield put(fetchMainSlider.failure());
  }
}

export function* fetchShapesBlockWorker() {
  yield put(fetchShapesBlock.request());
  try {
    const api = yield getContext('api');
    const res = yield call(() => api.main.shapesBanner());
    yield put(fetchShapesBlock.success(res.data.data));
  } catch (err) {
    yield put(fetchShapesBlock.failure());
  }
}

function* fetchOccasionSliderWorker() {
  yield put(fetchOccasionSlider.request());
  try {
    const api = yield getContext('api');
    const res = yield call(() => api.main.occasionSlider());
    yield put(fetchOccasionSlider.success(res.data.data));
  } catch (err) {
    yield put(fetchOccasionSlider.failure());
  }
}

function* fetchYouHaveSeenSliderWorker() {
  yield put(fetchYouHaveSeenSlider.request());
  try {
    const api = yield getContext('api');
    const res = yield call(() => api.main.youHaveSeen()); //You have seen engagement;
    yield put(fetchYouHaveSeenSlider.success(res.data.data));
  } catch (err) {
    yield put(fetchYouHaveSeenSlider.failure());
  }
}

function* fetchWeddingRingsSliderWorker() {
  yield put(fetchWeddingRingsSlider.request());
  try {
    const api = yield getContext('api');
    const res = yield call(() => api.main.weddingAndAnniversary());
    yield put(fetchWeddingRingsSlider.success(res.data));
  } catch (err) {
    yield put(fetchWeddingRingsSlider.failure());
  }
}

function* fetchCustomJewelryWorker() {
  yield put(fetchCustomJewelry.request());
  try {
    const api = yield getContext('api');
    const res = yield call(() => api.main.customJewelry());
    yield put(fetchCustomJewelry.success(res.data.data));
  } catch (err) {
    yield put(fetchCustomJewelry.failure());
  }
}

function* fetchAllProductCategoriesWorker() {
  yield put(fetchAllProductCategories.request());
  try {
    const api = yield getContext('api');
    const res = yield call(() => api.main.comingSoonCategories());
    yield put(fetchAllProductCategories.success(res.data.data));
  } catch (err) {
    yield put(fetchAllProductCategories.failure());
  }
}

function* fetchAlsoSuggestedRingsWorker() {
  yield put(fetchAlsoSuggestedRings.request());
  try {
    const api = yield getContext('api');
    const res = yield call(() => api.main.alsoSuggestedRings());
    yield put(fetchAlsoSuggestedRings.success(res.data.data));
  } catch (err) {
    yield put(fetchAlsoSuggestedRings.failure());
  }
}

function* fetchSuggestedRingsWorker() {
  yield put(fetchSuggestedRings.request());
  try {
    const api = yield getContext('api');
    const res = yield call(() => api.main.suggestedRings());
    yield put(fetchSuggestedRings.success(res.data.data));
  } catch (err) {
    yield put(fetchSuggestedRings.failure());
  }
}

export function* mainServerWorker({ settings, page }) {
  yield fork(initServerApp, settings);
  yield fork(fetchMetaWorker, { payload: page });
  yield fork(fetchMainSliderWorker);
  yield fork(fetchShapesBlockWorker);
  yield fork(fetchWeddingRingsSliderWorker);
  yield fork(fetchCustomJewelryWorker);
  yield fork(fetchAllProductCategoriesWorker);
  yield fork(fetchAlsoSuggestedRingsWorker);
  yield fork(fetchSuggestedRingsWorker);
}

export function* mainWatcher() {
  yield all([
    takeLatest(fetchMainSlider.TRIGGER, fetchMainSliderWorker),
    takeLatest(fetchShapesBlock.TRIGGER, fetchShapesBlockWorker),
    takeLatest(fetchYouHaveSeenSlider.TRIGGER, fetchYouHaveSeenSliderWorker),
    takeLatest(fetchWeddingRingsSlider.TRIGGER, fetchWeddingRingsSliderWorker),
    takeLatest(fetchCustomJewelry.TRIGGER, fetchCustomJewelryWorker),
    takeLatest(
      fetchAllProductCategories.TRIGGER,
      fetchAllProductCategoriesWorker
    ),
    takeLatest(
      fetchAlsoSuggestedRings.TRIGGER,
      fetchAlsoSuggestedRingsWorker
    ),
    takeLatest(
      fetchSuggestedRings.TRIGGER,
      fetchSuggestedRingsWorker
    )
  ]);
}
