import { createRoutine } from "redux-saga-routines";
import { call, put, takeLatest, getContext} from "redux-saga/effects";

export const fetchMainMenu = createRoutine("MAIN_MENU_FETCH");

export function* fetchMainMenuWorker(){
  yield put(fetchMainMenu.request());
  try {
    const api = yield getContext('api');
    const res = yield call(() => api.config.getMainMenu());
    yield put(fetchMainMenu.success(res.data.data));
  } catch (err) {
    yield put(fetchMainMenu.failure());
  }
}

export default function* mainMenuWatcher() {
  yield takeLatest(fetchMainMenu.TRIGGER, fetchMainMenuWorker);
}
