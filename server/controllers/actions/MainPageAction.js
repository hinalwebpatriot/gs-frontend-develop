import { createRoutine } from "redux-saga-routines";
import { all, call, put, takeLatest, fork, select , getContext } from "redux-saga/effects";
//import { deviceSelector } from "../_selectors/deviceSelector";
import localeStore from "../../../src/config/LocalesStore";

const mainQuery = require('./../../queries/MainQuery');

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

export const setMainPageWatchedStatus = createRoutine("MAIN_PAGE_IS_WATCHED_SET");
export const setAcceptCookie = createRoutine("COOKIE_MODAL_ACCEPT");

export const fetchMetaTags = createRoutine("SEO_META_TAGS_FETCH");
export const fetchSettings = createRoutine("SETTINGS_FETCH");
export const fetchSettingsOptions = createRoutine("SETTINGS_OPTIONS_FETCH");
export const fetchCompare = createRoutine("COMPARE_FETCH");
export const fetchFavorites = createRoutine("FAVORITE_FETCH");
export const fetchCart = createRoutine("CART_FETCH");
export const fetchServicesCart = createRoutine("CART_SERVICES_FETCH");
export const fetchMainMenu = createRoutine("MAIN_MENU_FETCH");
export const fetchShowroomData = createRoutine("SHOW_ROOM_FETCH");
export const fetchContactData = createRoutine("CONTACT_US_DATA_FETCH");
export const fetchVideoHints = createRoutine("FILTER_VIDEO_HINTS_FETCH");

function* retrieveMetaData(page) {
    const slug = page.toLowerCase();

    try {
        const res = yield mainQuery.metaData(page);
        yield put(fetchMetaTags.success({ slug, data: res }));
    } catch (e) {
        if (e.response && e.response.status === 404) {
            yield put(fetchMetaTags.success({ slug: slug, data: {}}));
        } else {
            yield put(fetchMetaTags.failure());
        }
    }
}

function* retrieveMainSliderData() {
    try {
        const res = yield mainQuery.desktop();
        yield put(fetchMainSlider.success(res));
    } catch (err) {
        yield put(fetchMainSlider.failure());
    }
}

function* retrieveShapesBlockData() {
    try {
        const res = yield mainQuery.shapesBanners();
        yield put(fetchShapesBlock.success(res));
    } catch (err) {
        yield put(fetchShapesBlock.failure());
    }
}

function* retrieveOccasionSliderData() {
    try {
        const res = yield mainQuery.occasionSliderData();
        yield put(fetchOccasionSlider.success(res));
    } catch (err) {
        yield put(fetchOccasionSlider.failure());
    }
}

function* retrieveWeddingRingsSliderData() {
    try {
        const res = yield mainQuery.weddingRingsSliderData();
        yield put(fetchWeddingRingsSlider.success(res));
    } catch (err) {
        yield put(fetchWeddingRingsSlider.failure());
    }
}

function* retrieveCustomJewelryData() {
    try {
        const res = yield mainQuery.customJewelry();
        yield put(fetchCustomJewelry.success(res));
    } catch (err) {
        yield put(fetchCustomJewelry.failure());
    }
}

function* retrieveAllProductCategoriesData() {
    try {
        const res = yield mainQuery.productCategories();
        yield put(fetchAllProductCategories.success(res));
    } catch (err) {
        yield put(fetchAllProductCategories.failure());
    }
}

function* retrieveSettingsData({ payload }) {
    try {
        const options = yield mainQuery.locationData();

        const localeCode = payload
          ? payload.locale
          : localeStore.isUrlContainsLocale().localeFromUrl;

        let config = {
            locale:
                options.lang.find(item => item.code === localeCode) ||
                options.lang.find(item => item.code === "en")
        };

        if (options.selected) {
            config.location = options.selected.location;
            config.currency = options.selected.currency;
        } else {
            config.location = options.location.find(item => item.code === "AU");
            config.currency = options.currency.find(item => item.code === "AUD");
        }

        localeStore.updateState(config);

        yield put(fetchSettingsOptions.success(options));
        yield put(fetchSettings.success(config));
    } catch (e) {
        const fallbackConfig = {
            locale: localeStore.commitDefaultLocale(undefined)
        };

        yield put(fetchSettings.failure(fallbackConfig));
    }
}

function* retrieveCompareData() {
    try {
      const res = require('./../../data/compare-all.json');
      yield put(fetchCompare.success(res.data));
    } catch (e) {
      yield put(fetchCompare.failure());

    }
}

function* retrieveFavoritesData() {
    try {
      const res = require('./../../data/compare-all.json');
      yield put(fetchFavorites.success(res.data));
    } catch (e) {
      yield put(fetchFavorites.failure());

    }
}

function* retrieveCartData() {
    try {
      const res = require('./../../data/cart.json');
      yield put(fetchCart.success(res.data));
    } catch (e) {
      yield put(fetchCart.failure());
    }
}

function* retrieveMainMenuData() {
    try {
        const res = yield mainQuery.menuDropdown();
        yield put(fetchMainMenu.success(res));
    } catch (err) {
        yield put(fetchMainMenu.failure());
    }
}

function* retrieveShowroomData() {
    try {
        const res = yield mainQuery.showRooms();
        if (res.length === 0) {
            throw "no data fetchShowroomDataInfo";
        }

        yield put(fetchShowroomData.success(res));
    } catch (e) {
        yield put(fetchShowroomData.failure());
    }
}

function* retrieveContactData() {
    try {
        const res = yield mainQuery.contactsPage();
        yield put(fetchContactData.success(res));
    } catch (e) {
      yield put(fetchContactData.failure());
    }
}

function* retrieveVideoHint() {
    try {
        const res = yield mainQuery.filterVideos();
      yield put(fetchVideoHints.success(res));
    } catch (e) {
        yield put(fetchVideoHints.failure());
    }
}

export function* altMainServerWorker({ settings, page }) {
    yield fork(retrieveSettingsData, { payload: settings });

    yield fork(retrieveCompareData);//data json
    yield fork(retrieveFavoritesData);//data json
    yield fork(retrieveCartData);//data json

    yield fork(retrieveMainMenuData);
    yield fork(retrieveShowroomData);
    yield fork(retrieveContactData);
    yield fork(retrieveVideoHint);

    yield fork(retrieveMetaData, page);
    yield fork(retrieveMainSliderData);
    yield fork(retrieveShapesBlockData);//need media
    yield fork(retrieveOccasionSliderData);
    yield fork(retrieveWeddingRingsSliderData);
    yield fork(retrieveCustomJewelryData);
    yield fork(retrieveAllProductCategoriesData);
}