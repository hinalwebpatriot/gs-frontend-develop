import { all, fork } from "redux-saga/effects";
import { saleFeedWatcher } from './Sale/SaleActions';

export default function* dynamicPageSaga() {
  yield all([
    fork(saleFeedWatcher),
  ]);
}
