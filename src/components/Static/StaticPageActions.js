import { createRoutine } from "redux-saga-routines";
import { all, call, put, takeLatest, fork , getContext } from "redux-saga/effects";
import { initServerApp } from "../rootSaga";
import { fetchMetaWorker } from "../_common/SEO/SeoActions";

export const fetchStaticPage = createRoutine("STATIC_PAGE_FETCH");
export const fetchQuestionsAndAnswers = createRoutine("FAQ_STATIC_PAGE_FETCH");
// export const fetchGoogleSiteVerification = createRoutine("GO_SI_VE_STATIC_PAGE_FETCH");

export function* fetchStaticPageWorker({ payload }) {
  yield put(fetchStaticPage.request({ slug: payload }));
  try {
    const api = yield getContext('api');
    const res = yield call(() => api.static.getPage(payload));
    yield put(fetchStaticPage.success({ slug: payload, data: res.data }));
  } catch (err) {
    yield put(fetchStaticPage.failure({ slug: payload }));
    // console.error(err.response)
  }
}

function* fetchQuestionsWorker({ payload }) {
  yield put(fetchStaticPage.request({ slug: payload }));
  try {
    const api = yield getContext('api');
    const res = yield call(() => api.static.faq());
    yield put(fetchStaticPage.success({ slug: payload, data: res.data.data }));
  } catch (err) {
    yield put(fetchStaticPage.failure({ slug: payload }));
  }
}

// function* fetchGoogleSiteVerificationWorker({ payload }) {
//   yield put(fetchGoogleSiteVerification.request({ slug: payload }));
//   try {
//     const api = yield getContext('api');
//     const res = yield call(() => api.static.faq());
//     yield put(fetchGoogleSiteVerification.success({ slug: payload, data: res.data.data }));
//   } catch (err) {
//     yield put(fetchGoogleSiteVerification.failure({ slug: payload }));
//   }
// }

export function* staticPageServerWorker({ slug, settings }) {
  switch (slug) {
    // case 'contact-us':
    //   // yield fork(fetchContactDataWorker); // already fetched by initServerApp
    //   break;
    case "faq":
      yield fork(fetchQuestionsWorker, { payload: slug });
      break;
    // case "google-site-verification":
    //   yield fork(fetchGoogleSiteVerificationWorker, { payload: slug });
    //   break;
    default:
      yield fork(fetchStaticPageWorker, { payload: slug });
  }
  yield fork(fetchMetaWorker, { payload: slug });
  yield fork(initServerApp, settings);
}

export function* staticPageWatcher() {
  yield all([
    takeLatest(fetchStaticPage.TRIGGER, fetchStaticPageWorker),
    takeLatest(fetchQuestionsAndAnswers.TRIGGER, fetchQuestionsWorker),
    // takeLatest(fetchGoogleSiteVerification.TRIGGER, fetchGoogleSiteVerificationWorker)

  ]);
}
