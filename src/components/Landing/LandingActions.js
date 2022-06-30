import { createRoutine } from "redux-saga-routines";
import {call, put, takeEvery, getContext, fork, all} from 'redux-saga/effects';
import {initServerApp} from "../rootSaga";
import { isServer } from "../../utils/isServer";

export const fetchFirstLandingData = createRoutine('FETCH_LANDING_DATA');

export function* fetchFirstLandingDataWorker(params) {
  yield put(fetchFirstLandingData.request());

  try {
    let param = isServer ? params : params.payload;
    // console.log('p', param);
    const api = yield getContext('api');
    const res = yield call(() => api.landing.fetchData(param));
    yield put(fetchFirstLandingData.success(res));
  }
  catch (e) {
    // yield console.log('error mes', e);
    yield put(fetchFirstLandingData.failure());
  }
}

export function* landingServerWorker({ settings, page }) {
  yield fork(initServerApp, settings);
  yield fork(fetchFirstLandingDataWorker, page);
};

export default function* landingWatcher() {
  yield all([
    takeEvery(fetchFirstLandingData.TRIGGER, fetchFirstLandingDataWorker)
  ])
};
