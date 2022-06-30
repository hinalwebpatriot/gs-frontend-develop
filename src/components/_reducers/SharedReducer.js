import { combineReducers } from "redux";
import { handleActions } from "redux-actions";

import * as showroom from "../_common/ShowroomBlock/ShowroomBlockActions";
import { fetchVideoHints } from "../_common/VideoHint/VideoHintsActions";
import { fetchMainMenu } from '../Wrapper/HeaderMenu/HeaderMenuActions';
import { deviceChange } from "../_common/HOC/ResizeWatcherActions";
import { makeStatusReducer } from "../../utils/reduxHelpers";
import { setAcceptCookie } from "../Main/MainActions";
import { fetchCity } from "../_common/City/CityActions";

const city = handleActions(
  {
    [fetchCity.SUCCESS](state, { payload }) {
      return payload;
    }
  },
  ''
);


const device = handleActions(
  {
    [deviceChange.SUCCESS](state, { payload }) {
      return payload;
    }
  },
  { isMobile: false, currentWidth: null }
);

const showroomBlockStatus = makeStatusReducer(showroom.fetchShowroomData);
const contactBlockStatus = makeStatusReducer(showroom.fetchContactData);
const videoHintsStatus = makeStatusReducer(fetchVideoHints);
const mainMenuStatus = makeStatusReducer(fetchMainMenu);

const showroomBlockData = handleActions(
  {
    [showroom.fetchShowroomData.SUCCESS](state, { payload }) {
      return payload;
    }
  },
  []
);

const showroomTabReducer = handleActions(
  {
    [showroom.fetchShowroomData.SUCCESS](state, { payload }) {
      return payload[0] ? payload[0].country_code : "";
    },
    [showroom.setShowroomTab.TRIGGER](state, { payload }) {
      return payload;
    }
  },
  ""
);

const showroomBlock = combineReducers({
  status: showroomBlockStatus,
  data: showroomBlockData,
  currentTab: showroomTabReducer
});

const contactBlockReducer = handleActions(
  {
    [showroom.fetchContactData.SUCCESS](state, { payload }) {
      return payload;
    }
  },
  {}
);

const plainContactsReducer = handleActions(
  {
    [showroom.fetchContactData.SUCCESS](state, { payload }) {
      const obj = {};

      payload["supportContacts"].forEach(item => {
        obj[item.service] = item.contacts[0];
      });

      return obj;
    }
  },
  []
);

const contactBlock = combineReducers({
  status: contactBlockStatus,
  data: contactBlockReducer,
  plainContacts: plainContactsReducer
});

const videoHintsReducer = handleActions(
  {
    [fetchVideoHints.SUCCESS](state, { payload }) {
      return payload;
    }
  },
  {}
);

const videoHints = combineReducers({
  status: videoHintsStatus,
  data: videoHintsReducer
});

const isCookieAccepted = handleActions(
  {
    [setAcceptCookie.TRIGGER]() {
      return true;
    }
  },
  false
);

const mainMenuReducer = handleActions({
  [fetchMainMenu.TRIGGER]() {
    return {};
  },
  [fetchMainMenu.SUCCESS](state, { payload }) {
    return payload;
  },
  [fetchMainMenu.FAILURE]() {
    return {};
  },
}, {})


const menu = combineReducers({
  status: mainMenuStatus,
  data: mainMenuReducer
})

const shared = combineReducers({
  city,
  device,
  menu,
  showroomBlock,
  contactBlock,
  videoHints,
  isCookieAccepted
});

export default shared;
