import { createRoutine } from "redux-saga-routines";
import { delay } from "redux-saga";
import { all, call, put, takeLatest } from "redux-saga/effects";

export const deviceChange = createRoutine("DEVICE_CHANGE");

function* deviceChangeWatcher({ payload }) {
  yield call(delay, 300);
  yield put(deviceChange.success(payload));
}

export function* deviceWatcher() {
  yield all([takeLatest(deviceChange.TRIGGER, deviceChangeWatcher)]);
}
