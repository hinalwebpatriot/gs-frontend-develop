import { createRoutine } from "redux-saga-routines";
import { all, call, put, takeLatest , getContext, select } from "redux-saga/effects";

import { citySelector } from "../../_selectors/citySelectors";

export const fetchMetaTags = createRoutine("SEO_META_TAGS_FETCH");
export const fetchSeoTextBlock = createRoutine("SEO_TEXT_BLOCK_FETCH");
export const changeTitle = createRoutine("SEO_NEW_TITLE");
export const setMetaImage = createRoutine("SEO_SET_META_IMAGE");

export function* fetchMetaWorker({ payload }) {
  try {
    const api = yield getContext('api');
    const city = yield select(citySelector);
    const slug = city === 'sydney' ? payload.toLowerCase() : `${city}-${payload.toLowerCase()}`;

    let res;
    if (res !== 'engagement-rings' && res !== 'wedding-rings' && res !== 'diamonds') {
      if (['pendant', 'cluster-rings', 'earrings', 'bracelets', 'eternity-rings'].includes(slug)) {
        res = yield call(() => api.shared.getMetaTagsProduct(`jewellery-${slug}`));
      } else {
        res = yield call(() => api.shared.getMetaTagsProduct(slug === 'jewellery-rings' ? 'jewellery-cluster-rings' : slug));
      }
    } else {
      res = yield call(() => api.shared.getMetaTags(slug));
    }
    yield put(fetchMetaTags.success({ slug: payload.toLowerCase(), data: res.data }));
  } catch (e) {
    if (e.response && e.response.status === 404) {
      yield put(fetchMetaTags.success({ slug: payload.toLowerCase(), data: {}}));
    } else {
      yield put(fetchMetaTags.failure());
    }
  }
}

export function* fetchSeoTextBlockWorker({ payload }) {
  try {
    const api = yield getContext('api');
    const city = yield select(citySelector);
    const slug = payload.toLowerCase();
    const reqSlug = city === 'sydney' ? payload.toLowerCase() : `${city}-${payload.toLowerCase()}`;

    const res = yield call(() => api.shared.getSeoTextBlock(reqSlug));
    if (res && res.data && res.data.status === 204) {
      yield put(fetchSeoTextBlock.success({ slug: payload.toLowerCase(), data: {}}));
    } else {
      yield put(fetchSeoTextBlock.success({ slug, data: res.data.data }));
    }
  } catch (e) {
    if (e.response && e.response.status === 404) {
      yield put(fetchSeoTextBlock.success({ slug: payload.toLowerCase(), data: {}}));
    } else {
      yield put(fetchSeoTextBlock.failure());
    }
  }
}

export function* seoWatcher() {
  yield all([
    takeLatest(fetchMetaTags.TRIGGER, fetchMetaWorker),
    takeLatest(fetchSeoTextBlock.TRIGGER, fetchSeoTextBlockWorker)
  ]);
}
