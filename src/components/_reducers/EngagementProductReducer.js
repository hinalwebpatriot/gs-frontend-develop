import { combineReducers } from "redux";
import { handleActions } from "redux-actions";
import { makeStatusWithResetReducer } from "../../utils/reduxHelpers";

import * as actions from "../Product/Engagement/EngagementPageActions";

const recommendedRingsStatus = makeStatusWithResetReducer(
  actions.fetchEngagementRingRecRings,
  actions.fetchEngagementRing.FULFILL
);

const recommendedDiamondsStatus = makeStatusWithResetReducer(
  actions.fetchEngagementRingRecDiamonds,
  actions.fetchEngagementRing.FULFILL
);

const youHaveSeenStatus = makeStatusWithResetReducer(
  actions.fetchEngagementRingYourPicks,
  actions.fetchEngagementRing.FULFILL
);

const ringInitial = {
  data: {},
  isFetched: false,
  isError: false
};

const ringDataReducer = handleActions(
  {
    [actions.fetchEngagementRing.SUCCESS](state, { payload }) {
      return {
        data: payload,
        isFetched: true,
        isError: false
      };
    },
    [actions.fetchEngagementRing.FAILURE]() {
      return {
        data: {},
        isFetched: false,
        isError: true
      };
    },
    [actions.fetchEngagementRing.TRIGGER]() {
      return ringInitial;
    },
    [actions.fetchEngagementRing.FULFILL]() {
      return ringInitial;
    }
  },
  ringInitial
);


const sliderDiamondsInitial = {
  title: 'Recommended diamonds for this ring',
  subtitle: '',
  products: []
}

const recommendedDiamondsData = handleActions(
  {
    [actions.fetchEngagementRingRecDiamonds.SUCCESS](state, { payload }) {
      return {
        ...state,
        products: payload
      };
    },
    [actions.fetchEngagementRing.FULFILL]() {
      return sliderDiamondsInitial;
    }
  },
  sliderDiamondsInitial
);

const sliderRingsInitial = {
  title: 'Recommended engagement rings',
  subtitle: '',
  products: []
};

const recommendedRingsData = handleActions(
  {
    [actions.fetchEngagementRingRecRings.SUCCESS](state, { payload }) {
      return {
        title: payload.title,
        subtitle: payload.text,
        products: payload.products["engagement-rings"]
      };
    },
    [actions.fetchEngagementRing.FULFILL]() {
      return sliderRingsInitial;
    }
  },
  sliderRingsInitial
);

const sliderYouHaveSeenInitial = {
  title: 'You have seen',
  subtitle: '',
  products: []
};

const youHaveSeenRings = handleActions(
  {
    [actions.fetchEngagementRingYourPicks.SUCCESS](state, { payload }) {
      return {
        ...state,
        products: payload
      };
    },
    [actions.fetchEngagementRing.FULFILL]() {
      return sliderYouHaveSeenInitial;
    }
  },
  sliderYouHaveSeenInitial
);

const youHaveSeen = combineReducers({
  status: youHaveSeenStatus,
  data: youHaveSeenRings
});

const diamonds = combineReducers({
  status: recommendedDiamondsStatus,
  data: recommendedDiamondsData
});

const engagement = combineReducers({
  status: recommendedRingsStatus,
  data: recommendedRingsData
});

const suggestions = combineReducers({
  diamonds: diamonds,
  engagement: engagement
});

const engagementProduct = combineReducers({
  current: ringDataReducer,
  suggestions,
  youHaveSeen
});

export default engagementProduct;
