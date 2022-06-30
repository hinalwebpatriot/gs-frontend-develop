import { createRoutine } from "redux-saga-routines";
import { call, put, takeLatest , getContext } from "redux-saga/effects";

export const fetchVideoHints = createRoutine("FILTER_VIDEO_HINTS_FETCH");

export function* videoHintWorker() {
  yield put(fetchVideoHints.request());
  try {
    const api = yield getContext('api');
    const res = yield call(() => api.shared.videoHints());
    yield put(fetchVideoHints.success(res.data.data));
  } catch (e) {
    yield put(fetchVideoHints.failure());
  }
}

export function* videoHintsWatcher() {
  yield takeLatest(fetchVideoHints.TRIGGER, videoHintWorker);
}
