import { createRoutine } from "redux-saga-routines";
import { call, put, takeLatest , getContext } from "redux-saga/effects";

export const fetchShowroomData = createRoutine("SHOW_ROOM_FETCH");
export const setShowroomTab = createRoutine("SHOW_ROOM_TAB_SET"); //for dedicated page
export const fetchContactData = createRoutine("CONTACT_US_DATA_FETCH");

export function* fetchShowroomDataWorker() {
  yield put(fetchShowroomData.request());
  try {
    const api = yield getContext('api');
    const res = yield call(() => api.main.showroom());
    
    if (res.data.length === 0) {
      yield put(fetchShowroomData.failure());
    }
    yield put(fetchShowroomData.success(res.data));
  } catch (e) {
    yield put(fetchShowroomData.failure());
  }
}

export function* fetchContactDataWorker() {
  yield put(fetchContactData.request());
  try {
    const api = yield getContext('api');
    const res = yield call(() => api.static.getContactUsInfo());
    yield put(fetchContactData.success(res.data.data));
  } catch (e) {
    yield put(fetchContactData.failure());
  }
}

export function* showroomWatcher() {
  yield takeLatest(fetchShowroomData.TRIGGER, fetchShowroomDataWorker);
  yield takeLatest(fetchContactData.TRIGGER, fetchContactDataWorker);
}
