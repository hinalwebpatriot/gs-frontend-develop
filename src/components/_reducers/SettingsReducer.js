import { combineReducers } from "redux";
import { handleActions } from "redux-actions";
import * as actions from "../_common/CountryDropdown/CountryDropdownActions";

const settingsStatus = handleActions(
  {
    [actions.fetchSettings.TRIGGER]() {
      return "request";
    },
    [actions.fetchSettings.SUCCESS]() {
      return "success";
    },
    [actions.fetchSettings.FAILURE]() {
      return "failure";
    }
  },
  "none"
);

const dataInitialState = {
  location: [
    { code: "AU", name: "Australia", vat_percent: 10.5, can_ship: true }
  ],
  currency: [{ code: "AUD", name: "AUD" }],
  lang: [{ code: "en", name: "English" }]
};

const settingsData = handleActions(
  {
    [actions.fetchSettingsOptions.SUCCESS](state, { payload }) {
      return payload;
    }
  },
  dataInitialState
);

const selectedInitialState = {
  location: {
    code: "AU",
    name: "Australia",
    vat_percent: 10.5,
    can_ship: true
  },
  currency: { code: "AUD", name: "AUD" },
  lang: { code: "en", name: "English" }
};

const selectedLocation = handleActions(
  {
    [actions.fetchSettings.SUCCESS](state, { payload }) {
      return payload.location;
    },
    [actions.submitSettings.SUCCESS](state, { payload }) {
      return payload.location;
    }
  },
  selectedInitialState.location
);

const selectedCurrency = handleActions(
  {
    [actions.fetchSettings.SUCCESS](state, { payload }) {
      return payload.currency;
    },
    [actions.submitSettings.SUCCESS](state, { payload }) {
      return payload.currency;
    }
  },
  selectedInitialState.currency
);

const selectedLang = handleActions(
  {
    [actions.fetchSettings.SUCCESS](state, { payload }) {
      return payload.locale;
    },
    [actions.fetchSettings.FAILURE](state, { payload }) {
      // This is fallback
      return payload.locale;
    },
    [actions.submitSettings.SUCCESS](state, { payload }) {
      return payload.locale;
    }
  },
  selectedInitialState.lang
);

const unsavedLocation = handleActions(
  {
    [actions.fetchSettings.SUCCESS](state, { payload }) {
      return payload.location;
    },
    [actions.setSettings.TRIGGER](state, { payload }) {
      if (payload.type === "location") {
        return payload.data;
      } else {
        return state;
      }
    }
  },
  selectedInitialState.location
);

const unsavedCurrency = handleActions(
  {
    [actions.fetchSettings.SUCCESS](state, { payload }) {
      return payload.currency;
    },
    [actions.setSettings.TRIGGER](state, { payload }) {
      if (payload.type === "currency") {
        return payload.data;
      } else {
        return state;
      }
    }
  },
  selectedInitialState.currency
);

const unsavedLang = handleActions(
  {
    [actions.fetchSettings.SUCCESS](state, { payload }) {
      return payload.locale;
    },
    [actions.setSettings.TRIGGER](state, { payload }) {
      if (payload.type === "lang") {
        return payload.data;
      } else {
        return state;
      }
    }
  },
  selectedInitialState.lang
);

const selectedData = combineReducers({
  location: selectedLocation,
  currency: selectedCurrency,
  lang: selectedLang
});

const unsavedData = combineReducers({
  location: unsavedLocation,
  currency: unsavedCurrency,
  lang: unsavedLang
});

const settings = combineReducers({
  status: settingsStatus,
  options: settingsData,
  selected: selectedData,
  unsaved: unsavedData
});

export default settings;
