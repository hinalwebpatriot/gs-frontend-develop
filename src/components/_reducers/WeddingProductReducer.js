import { combineReducers } from "redux";
import { handleActions } from "redux-actions";
import { makeStatusWithResetReducer } from "../../utils/reduxHelpers";

import * as actions from "../Product/Wedding/WeddingPageActions";

const moreMetalsStatus = makeStatusWithResetReducer(
  actions.fetchWeddingRingMoreMetals,
  actions.fetchWeddingRing.FULFILL
);
const similarCollectionsStatus = makeStatusWithResetReducer(
  actions.fetchWeddingRingSimilar,
  actions.fetchWeddingRing.FULFILL
);

const ringInitial = {
  data: {},
  isFetched: false,
  isError: false
};

const ringDataReducer = handleActions(
  {
    [actions.fetchWeddingRing.SUCCESS](state, { payload }) {
      return {
        data: payload,
        isFetched: true,
        isError: false
      };
    },
    [actions.fetchWeddingRing.FAILURE]() {
      return {
        data: {},
        isFetched: false,
        isError: true
      };
    },
    [actions.fetchWeddingRing.TRIGGER]() {
      return ringInitial;
    },
    [actions.fetchWeddingRing.FULFILL]() {
      return ringInitial;
    }
  },
  ringInitial
);

const moreMetalsDataReducer = handleActions(
  {
    [actions.fetchWeddingRingMoreMetals.SUCCESS](state, { payload }) {
      return payload;
    },
    [actions.fetchWeddingRing.FULFILL]() {
      return [];
    }
  },
  []
);

const similarCollectionsDataReducer = handleActions(
  {
    [actions.fetchWeddingRingSimilar.SUCCESS](state, { payload }) {
      return payload;
    },
    [actions.fetchWeddingRing.FULFILL]() {
      return [];
    }
  },
  []
);

const moreMetals = combineReducers({
  status: moreMetalsStatus,
  data: moreMetalsDataReducer
});

const similarCollections = combineReducers({
  status: similarCollectionsStatus,
  data: similarCollectionsDataReducer
});

const weddingProduct = combineReducers({
  current: ringDataReducer,
  moreMetals,
  similarCollections
});

export default weddingProduct;
