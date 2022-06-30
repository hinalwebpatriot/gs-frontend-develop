import { createRoutine } from "redux-saga-routines";
import { call, put, takeLatest, all, select, getContext } from "redux-saga/effects";
import { settingsUnsavedSelector } from "../../_selectors/settingSelector";
import localeStore from "../../../config/LocalesStore";
import { isServer } from "../../../utils/isServer";
// import setAuthorizationToken from '../../../utils/setAuthorizationToken';

export const fetchSettings = createRoutine("SETTINGS_FETCH");
export const fetchSettingsOptions = createRoutine("SETTINGS_OPTIONS_FETCH");
export const submitSettings = createRoutine("SETTINGS_SUBMIT");
export const setSettings = createRoutine("SETTINGS_SET");
// export const setLocaleSettings = createRoutine('SETTINGS_LOCALE_SET')

export function* getSettingsWorker({ payload }) {
  yield put(fetchSettings.request());
  try {
    const api = yield getContext('api');
    const res = yield call(() => api.config.getSettings());

    const options = res.data;

    const localeCode = payload
      ? payload.locale
      : localeStore.isUrlContainsLocale().localeFromUrl;

    let config = {
      locale:
        options.lang.find(item => item.code === localeCode) ||
        options.lang.find(item => item.code === "en")
    };

    if (options.selected) {
      config.location = options.selected.location;
      config.currency = options.selected.currency;
    } else {
      config.location = options.location.find(item => item.code === "AU");
      config.currency = options.currency.find(item => item.code === "AUD");
    }

    localeStore.updateState(config);
    yield put(fetchSettingsOptions.success(options));
    yield put(fetchSettings.success(config));
  } catch (e) {

    // console.error(e.response.statusCode);
    const fallbackConfig = {
      locale: localeStore.commitDefaultLocale(
        isServer ? payload.locale : undefined
      )
    };
    yield put(fetchSettings.failure(fallbackConfig));
  }
}

function* submitSettingsWorker() {
  yield put(submitSettings.request());
  const { location, currency, lang } = yield select(settingsUnsavedSelector);
  try {
    const api = yield getContext('api');
    const res = yield call(() =>
      api.config.submitSettings({ location, currency })
    );
    localeStore.locale = lang;
    localeStore.pushPathWithLocale(true);

    yield put(submitSettings.success(res.data));
    console.log("submitSettings.success: ", res.data)
  } catch (err) {
    console.log("submitSettingsWorker: ", err)
    yield put(submitSettings.failure());
  }
}

export function* countryDropdownWatcher() {
  yield all([
    takeLatest(fetchSettings.TRIGGER, getSettingsWorker),
    takeLatest(submitSettings.TRIGGER, submitSettingsWorker)
  ]);
}
