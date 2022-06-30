import { createRoutine } from "redux-saga-routines";
import { all, call, put, takeLatest , getContext } from "redux-saga/effects";

import notification from "../../utils/notification";
import RingConstructor from "../_common/RingConstructor/RingConstructor";

export const fetchCompletedRings = createRoutine("COMPLETED_RINGS_FETCH");
export const deleteCompletedRing = createRoutine("COMPLETED_RINGS_DELETE");

function* fetchRingsWorker() {
  yield put(fetchCompletedRings.request());
  try {
    const api = yield getContext('api');
    const res = yield call(() => api.constructor.getRings());

    yield put(fetchCompletedRings.success(res.data.data));
  } catch (err) {
    yield put(fetchCompletedRings.failure());

  }
}

function* deleteRingWorker({ payload }) {
  yield put(deleteCompletedRing.request());
  try {
    const api = yield getContext('api');
    const res = yield call(() => api.constructor.deleteRing({ id: payload }));

    if (
      RingConstructor.isUpdating &&
      Number(RingConstructor.editOption) === Number(payload)
    ) {
      RingConstructor.completeUpdate();
    }

    notification("success", res.data.message);
    yield put(deleteCompletedRing.success(payload));
  } catch (err) {
    yield put(deleteCompletedRing.failure(payload));

  }
}

export function* completedRingsWatcher() {
  yield all([
    takeLatest(fetchCompletedRings.TRIGGER, fetchRingsWorker),
    takeLatest(deleteCompletedRing.TRIGGER, deleteRingWorker)
  ]);
}
