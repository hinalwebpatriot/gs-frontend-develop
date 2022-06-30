import { createRoutine } from "redux-saga-routines";
import { call, put, takeLatest, fork , getContext } from "redux-saga/effects";
import setAuthorizationToken from "../../../utils/setAuthorizationToken";
import { fetchCompare, fetchCompareWorker } from "../../Compare/CompareActions";
import {
  fetchFavorites,
  fetchFavoritesWorker
} from "../../Favorite/FavoriteActions";
import { fetchCart, fetchCartWorker } from "../../Checkout/Cart/CartActions";

export const pushLogin = createRoutine("LOGIN_PUSH");
export const pushLoginByToken = createRoutine("LOGIN_BY_TOKEN_PUSH");
export const pushLogout = createRoutine("LOGOUT");
export const pushResendEmail = createRoutine("RESEND_EMAIL");

// export const pushResetPassword = createRoutine("RESET_PASSWORD_PUSH");
export const pushConfirmEmail = createRoutine("CONFIRM_EMAIL_PUSH");

const tokenName = "gsDiamondsToken";

function* loginWorker({ payload }) {
  yield put(pushLogin.request());
  try {
    const api = yield getContext('api');
    const res = yield call(() => api.auth.login(payload.input));
    if (res.status === 200) {
      const { accessToken } = res.data;
      yield put(pushLogin.success());
      localStorage.setItem(tokenName, accessToken);
      setAuthorizationToken(accessToken);
      yield put(fetchCompare());
      yield put(fetchFavorites());
      payload.handleModal();
    }
  } catch (e) {
    console.log('login error:', e.response.data);
    yield put(pushLogin.failure({
      other: e.response.data.message,
      resend_label: e.response.data.resend_label,
      step: e.response.data.step
    }));
  }
}

// function* resendEmail({ payload }) {
//   try {
//     const api = yield getContext('api');
//     const res = yield call(() => api.auth.resendEmail(payload));
//   } catch (e) {
//     console.log('resend email fail', e)
//   }
// }

// function* confirmEmailWorker({ payload }) {
//   yield put(pushConfirmEmail.request());
//   try {
//     const api = yield getContext('api');
//     const res = yield call(() => api.auth.confirmEmail(payload.data));
//     if (res.status === 200) {
//       notification("success", "Your email have been confirm");
//       yield put(pushConfirmEmail.success());

//     }
//   } catch (e) {
//     yield put(pushConfirmEmail.failure());
//     notification("error", "Something went wrong");
//   }
// }

export function* fetchUserChoiceWorker() {
  yield fork(fetchCompareWorker);
  yield fork(fetchFavoritesWorker);
  yield fork(fetchCartWorker);
}

function* loginByTokenWorker() {
  const token = localStorage.getItem(tokenName);
  if (!token) {
    return;
  }
  setAuthorizationToken(token);
  yield put(pushLoginByToken.request());
  try {
//    const api = yield getContext('api');
    //const res = yield call(() => api.auth.getUserData());
    yield put(pushLoginByToken.success());
    yield put(fetchFavorites());
    yield put(fetchCompare());
    yield put(fetchCart());
  } catch (e) {
    yield put(pushLoginByToken.failure());
    setAuthorizationToken();
  }
}

function* logoutWorker({ payload }) {
  try {
    const api = yield getContext('api');
    yield call(() => api.auth.logout());
  } catch (e) {
  } finally {
    setAuthorizationToken();
    localStorage.removeItem(tokenName);
    yield put(pushLogout.success());
    yield put(fetchCompare());
    yield put(fetchFavorites());
    payload.handleModal();
    document.location.reload();
  }
}

export function* loginByTokenOnServerWorker(token) {
  if (!token) {
    yield fork(fetchCompareWorker);
    yield fork(fetchFavoritesWorker);
    yield fork(fetchCartWorker);
    return;
  }
  yield put(pushLoginByToken.request());
  try {
    const api = yield getContext('api');
    yield call(() => api.auth.getUserData());
    yield put(pushLoginByToken.success());
  } catch (e) {
    yield put(pushLoginByToken.failure());
  } finally {
    yield fork(fetchCompareWorker);
    yield fork(fetchFavoritesWorker);
    yield fork(fetchCartWorker);
  }
}

export function* loginWatcher() {
  yield takeLatest(pushLogin.TRIGGER, loginWorker);
  yield takeLatest(pushLoginByToken.TRIGGER, loginByTokenWorker);
  yield takeLatest(pushLogout.TRIGGER, logoutWorker);
  // yield takeLatest(pushResendEmail, resendEmail);
}
