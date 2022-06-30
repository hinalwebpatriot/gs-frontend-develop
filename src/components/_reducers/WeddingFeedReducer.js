import { combineReducers } from "redux";
import { handleActions } from "redux-actions";
import {
  makeStatusReducer,
  makeStatusWithResetReducer,
  toggleItemInArray
} from "../../utils/reduxHelpers";

import * as actions from "../Feed/Wedding/WeddingFeedActions";

const status = makeStatusReducer(actions.fetchWeddingFeed);
const newItemsStatus = makeStatusReducer(actions.fetchWeddingFeedNextPage);

const data = handleActions(
  {
    [actions.fetchWeddingFeed.SUCCESS](state, { payload }) {
      return payload.data;
    },
    [actions.fetchWeddingFeedNextPage.SUCCESS](state, { payload }) {
      return state.concat(payload.data);
    },
    [actions.fetchWeddingFeed.FULFILL]() {
      return [];
    }
  },
  []
);

const paginationInitial = {
  currentPage: 1,
  lastPage: 1,
  total: 0
};

const pagination = handleActions(
  {
    [actions.fetchWeddingFeed.SUCCESS](state, { payload }) {
      return {
        currentPage: payload.meta.current_page,
        lastPage: payload.meta.last_page,
        total: payload.meta.total
      };
    },
    [actions.fetchWeddingFeedNextPage.SUCCESS](state, { payload }) {
      return {
        currentPage: payload.meta.current_page,
        lastPage: payload.meta.last_page,
        total: payload.meta.total
      };
    },
    [actions.fetchWeddingFeed.FULFILL]() {
      return paginationInitial;
    }
  },
  paginationInitial
);

// const filtersStatus = makeStatusReducer(actions.fetchWeddingFeedFilters);
const filtersStatus = makeStatusWithResetReducer(
  actions.fetchWeddingFeedFilters,
  actions.resetWeddingFilters.TRIGGER
);

const filtersConfig = handleActions(
  {
    [actions.fetchWeddingFeedFilters.SUCCESS](state, { payload }) {
      return payload;
    }
  },
  {}
);

const filterInitialState = {
  gender: "female",
  metal: [],
  price: { min: null, max: null, isDisabled: false },
  // shape: [],
  style: [],
  size: {
    currentTab: "au",
    sizes: []
  },
  // collection: [],
  offers: [],
  sort: { field: 'price', order: "asc" }
};

const genderFilterInput = handleActions(
  {
    // Sorry for this, ultra fast kostil
    [actions.setWeddingStyle.TRIGGER](state, { payload }) {
      if (payload === "modern") {
        return 'male'
      } else {
        return 'female'
      }
    },
    [actions.changeWeddingGenderTab.TRIGGER](state, { payload }) {
      return payload;
    },
    [actions.resetWeddingFilters.TRIGGER]() {
      return filterInitialState.gender;
    },
    [actions.clearWeddingFilters.SUCCESS]() {
      return filterInitialState.gender;
    }
  },
  filterInitialState.gender
);

const priceFilterInput = handleActions(
  {
    [actions.saveWeddingPrice.TRIGGER](state, { payload }) {
      let isReverse = false;

      if (payload.value[0] > payload.value[1]) {
        isReverse = true;
      }

      const obj = {
        ...state,
        min: isReverse ? payload.value[1] : payload.value[0],
        max: isReverse ? payload.value[0] : payload.value[1]
      };

      return obj;
    },
    [actions.fetchWeddingFeedFilters.SUCCESS](state, { payload }) {
      const obj = {
        ...state,
        min: +payload["price"].min,
        max: +payload["price"].max
      };

      return obj;
    },
    [actions.toggleWeddingFilter.TRIGGER](state) {
      return {
        ...state,
        isDisabled: !state.isDisabled
      };
    },
    [actions.clearWeddingFilters.SUCCESS](state, { payload }) {
      let updateObj = {
        ...filterInitialState.price,
        min: Number(payload["price"].min),
        max: Number(payload["price"].max)
      };

      return updateObj;
    },
    [actions.resetWeddingFilters.TRIGGER]() {
      return filterInitialState.price;
    }
  },
  filterInitialState.price
);

const metalFilterInput = handleActions(
  {
    [actions.saveWeddingMetal.TRIGGER](state, { payload }) {
      return toggleItemInArray(state, payload);
    },
    [actions.setWeddingMetal.TRIGGER](state, { payload }) {
      return [payload]
    },
    [actions.saveWeddingMetal.FULFILL](state, { payload }) {
      return payload;
    },
    [actions.resetWeddingFilters.TRIGGER]() {
      return filterInitialState.metal;
    },
    [actions.clearWeddingFilters.SUCCESS]() {
      return filterInitialState.metal;
    }
  },
  filterInitialState.metal
);

const sizesFilterInput = handleActions(
  {
    [actions.saveWeddingSize.TRIGGER](state, { payload }) {
      return {
        ...state,
        sizes: toggleItemInArray(state.sizes, payload)
      };
    },
    [actions.changeWeddingSizeTab.TRIGGER](state, { payload }) {
      return {
        currentTab: payload,
        sizes: []
      };
    },
    [actions.clearWeddingFilter.TRIGGER](state, { payload }) {
      if (payload.type === "size") {
        return filterInitialState.size;
      } else {
        return state;
      }
    },
    [actions.resetWeddingFilters.TRIGGER]() {
      return filterInitialState.size;
    },
    [actions.clearWeddingFilters.SUCCESS]() {
      return filterInitialState.size;
    }
  },
  filterInitialState.size
);

const styleFilterInput = handleActions(
  {
    [actions.setWeddingStyle.TRIGGER](state, { payload }) {
      return [payload];
    },
    [actions.saveWeddingStyle.TRIGGER](state, { payload }) {
      return toggleItemInArray(state, payload);
    },
    [actions.clearWeddingFilter.TRIGGER](state, { payload }) {
      if (payload.type === "style") {
        return filterInitialState.style;
      } else {
        return state;
      }
    },
    [actions.changeWeddingGenderTab.TRIGGER]() {
      return filterInitialState.style;
    },
    [actions.resetWeddingFilters.TRIGGER]() {
      return filterInitialState.style;
    },
    [actions.clearWeddingFilters.SUCCESS]() {
      return filterInitialState.style;
    }
  },
  filterInitialState.style
);

const offersFilterInput = handleActions(
  {
    [actions.saveWeddingOffers.TRIGGER](state, { payload }) {
      return toggleItemInArray(state, payload);
    },
    [actions.clearWeddingFilter.TRIGGER](state, { payload }) {
      if (payload.type === "offers") {
        return filterInitialState.offers;
      } else {
        return state;
      }
    },
    [actions.resetWeddingFilters.TRIGGER]() {
      return filterInitialState.offers;
    },
    [actions.clearWeddingFilters.SUCCESS]() {
      return filterInitialState.offers;
    }
  },
  filterInitialState.offers
);

const sortInput = handleActions(
  {
    [actions.saveWeddingSort.TRIGGER](state, { payload }) {
      return payload;
    },
    [actions.resetWeddingFilters.TRIGGER]() {
      return filterInitialState.sort;
    }
  },
  filterInitialState.sort
);

const shoppingEasyStatus = makeStatusReducer(actions.fetchWeddingShoppingEasy);

const shoppingEasyData = handleActions({
  [actions.fetchWeddingShoppingEasy.SUCCESS](state, { payload }) {
    return payload;
  }
}, {})

const shoppingEasy = combineReducers({
  status: shoppingEasyStatus,
  data: shoppingEasyData
})

const blocks = combineReducers({
  shoppingEasy
})


const filtersInput = combineReducers({
  gender: genderFilterInput,
  price: priceFilterInput,
  metal: metalFilterInput,
  style: styleFilterInput,
  sort: sortInput,
  size: sizesFilterInput,
  offers: offersFilterInput
});

const filters = combineReducers({
  status: filtersStatus,
  config: filtersConfig,
  input: filtersInput
});

const weddingFeed = combineReducers({
  status,
  newItemsStatus,
  data,
  pagination,
  filters,
  blocks
});

export default weddingFeed;
