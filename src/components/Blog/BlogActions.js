import { createRoutine } from "redux-saga-routines";
import { all, call, put, takeLatest, fork, getContext } from "redux-saga/effects";
import { initServerApp } from "../rootSaga";
import { fetchMetaWorker, 
  setMetaImage
} from "../_common/SEO/SeoActions";
import { get } from "lodash";

export const fetchArticle = createRoutine("BLOG_ARTICLE_FETCH");
export const fetchArticles = createRoutine("BLOG_ARTICLES_FETCH");
export const fetchCategories = createRoutine("BLOG_CATEGORIES_FETCH");
export const fetchCategoryArticles = createRoutine(
  "BLOG_CATEGORY_ARTICLES_FETCH"
);
export const fetchRelatedArticles = createRoutine(
  "BLOG_RELATED_ARTICLES_FETCH"
);
export const fetchTopArticles = createRoutine("BLOG_TOP_ARTICLES_FETCH");

function* fetchArticleWorker({ payload }) {
  yield put(fetchArticle.request());
  try {
    const api = yield getContext('api');
    const res = yield call(() => api.blog.getArticle({ slug: payload }));
    yield put(fetchArticle.success(res.data.data));
    yield put(setMetaImage(get(res, 'data.data.image', '')));
  } catch (e) {
    yield put(fetchArticle.failure());
  }
}

function* fetchArticlesWorker({ payload }) {
  yield put(fetchArticles.request());
  try {
    const api = yield getContext('api');
    const res = yield call(() => api.blog.getArticles(payload));
    yield put(fetchArticles.success(res.data));
    yield put(setMetaImage(get(res, 'data.data[0].image', undefined)));
  } catch (e) {
    yield put(fetchArticles.failure());
  }
}

function* fetchCategoriesWorker() {
  yield put(fetchCategories.request());
  try {
    const api = yield getContext('api');
    const res = yield call(() => api.blog.getCategories());
    yield put(fetchCategories.success(res.data.data));
  } catch (e) {
    yield put(fetchCategories.failure());
  }
}

function* fetchCategoryArticlesWorker({ payload }) {
  yield put(fetchCategoryArticles.request());
  try {
    const api = yield getContext('api');
    const res = yield call(() => api.blog.getArticlesByCategory(payload));
    yield put(fetchCategoryArticles.success(res.data));
    yield put(setMetaImage(get(res, 'data.data[0].image', undefined)));
  } catch (e) {
    yield put(fetchCategoryArticles.failure());
  }
}

function* fetchRelatedArticlesWorker({ payload }) {
  yield put(fetchRelatedArticles.request());
  try {
    const api = yield getContext('api');
    const res = yield call(() =>
      api.blog.getRelatedArticles({ slug: payload })
    );
    yield put(fetchRelatedArticles.success(res.data.data));
  } catch (e) {
    yield put(fetchRelatedArticles.failure());
  }
}

function* fetchTopArticlesWorker() {
  yield put(fetchTopArticles.request());
  try {
    const api = yield getContext('api');
    const res = yield call(() => api.blog.getTopArticles());
    yield put(fetchTopArticles.success(res.data));
  } catch (e) {
    yield put(fetchTopArticles.failure());
  }
}

export function* blogServerWorker({ settings, articles, slug }) {
  yield fork(initServerApp, settings);
  yield fork(fetchMetaWorker, { payload: slug });
  yield fork(fetchTopArticlesWorker);
  yield fork(fetchCategoriesWorker);
  yield fork(fetchArticlesWorker, { payload: articles });
}

export function* blogTagServerWorker({ settings, category }) {
  yield fork(initServerApp, settings);
  yield fork(fetchCategoriesWorker);
  yield fork(fetchCategoryArticlesWorker, { payload: category });
}

export function* blogArticleServerWorker({ settings, article }) {
  yield fork(initServerApp, settings);
  yield fork(fetchMetaWorker, { payload: article });
  yield fork(fetchCategoriesWorker);
  yield fork(fetchArticleWorker, { payload: article });
  yield fork(fetchRelatedArticlesWorker, { payload: article });
}

export function* blogWatcher() {
  yield all([
    takeLatest(fetchArticle.TRIGGER, fetchArticleWorker),
    takeLatest(fetchArticles.TRIGGER, fetchArticlesWorker),
    takeLatest(fetchCategories.TRIGGER, fetchCategoriesWorker),
    takeLatest(fetchCategoryArticles.TRIGGER, fetchCategoryArticlesWorker),
    takeLatest(fetchRelatedArticles.TRIGGER, fetchRelatedArticlesWorker),
    takeLatest(fetchTopArticles.TRIGGER, fetchTopArticlesWorker)
  ]);
}
