import { combineReducers } from "redux";
import { handleActions } from "redux-actions";
import {
  makeStatusReducer,
  makeStatusWithResetReducer,
  toggleItemInArray
} from "../../utils/reduxHelpers";

import * as actions from "../Feed/Catalog/CatalogFeedActions";

const status = makeStatusReducer(actions.fetchCatalogFeed);

const newItemsStatus = makeStatusReducer(actions.fetchCatalogFeedNextPage);

const catalogCategory = handleActions(
  {
    [actions.setCatalogCategory.TRIGGER](state, { payload }) {
      return 'products'
    }
  },
  'products'
);

const lastCatalogCategory = handleActions(
  {
    [actions.setLastCatalogCategory.TRIGGER](state, { payload }) {
      return payload
    }
  },
  ''
);

const data = handleActions(
  {
    [actions.fetchCatalogFeed.SUCCESS](state, { payload }) {
      return payload.data;
    },
    [actions.fetchCatalogFeedNextPage.SUCCESS](state, { payload }) {
      return state.concat(payload.data);
    },
    [actions.fetchCatalogFeed.FULFILL]() {
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
    [actions.fetchCatalogFeed.SUCCESS](state, { payload }) {
      return {
        currentPage: payload.meta.current_page,
        lastPage: payload.meta.last_page,
        total: payload.meta.total
      };
    },
    [actions.fetchCatalogFeedNextPage.SUCCESS](state, { payload }) {
      return {
        currentPage: payload.meta.current_page,
        lastPage: payload.meta.last_page,
        total: payload.meta.total
      };
    },
    [actions.fetchCatalogFeed.FULFILL]() {
      return paginationInitial;
    }
  },
  paginationInitial
);

// const filtersStatus = makeStatusReducer(actions.fetchCatalogFeedFilters);
const filtersStatus = makeStatusWithResetReducer(
  actions.fetchCatalogFeedFilters,
  actions.resetCatalogFilters.TRIGGER
);

const filtersConfig = handleActions(
  {
    [actions.fetchCatalogFeedFilters.SUCCESS](state, { payload }) {
      return payload;
    }
  },
  {}
);

const filterInitialState = {
  gender: 'female',
  metal: [],
  price: { min: null, max: null, isDisabled: false },
  shape: [],
  style: [],
  size: {
    currentTab: "au",
    sizes: []
  },
  brands: [],
  offers: [],
  sort: { field: 'price', order: "asc" }
};

const genderFilterInput = handleActions(
  {
    [actions.changeCatalogGenderTab.TRIGGER](state, { payload }) {
      return payload;
    },
    [actions.resetCatalogFilters.TRIGGER]() {
      return filterInitialState.gender;
    },
    [actions.clearCatalogFilters.SUCCESS]() {
      return filterInitialState.gender;
    }
  },
  filterInitialState.gender
);

const priceFilterInput = handleActions(
  {
    [actions.saveCatalogPrice.TRIGGER](state, { payload }) {
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
    [actions.fetchCatalogFeedFilters.SUCCESS](state, { payload }) {
      const obj = {
        ...state,
        min: +payload["price"].min,
        max: +payload["price"].max
      };

      return obj;
    },
    [actions.toggleCatalogFilter.TRIGGER](state) {
      return {
        ...state,
        isDisabled: !state.isDisabled
      };
    },
    [actions.clearCatalogFilters.SUCCESS](state, { payload }) {
      let updateObj = {
        ...filterInitialState.price,
        min: Number(payload["price"].min),
        max: Number(payload["price"].max)
      };

      return updateObj;
    },
    [actions.resetCatalogFilters.TRIGGER]() {
      return filterInitialState.price;
    }
  },
  filterInitialState.price
);

const metalFilterInput = handleActions(
  {
    [actions.setCatalogMetal.TRIGGER](state, { payload }) {
      return [payload];
    },
    [actions.saveCatalogMetal.TRIGGER](state, { payload }) {
      return toggleItemInArray(state, payload);
    },
    [actions.saveCatalogMetal.FULFILL](state, { payload }) {
      return payload;
    },
    [actions.resetCatalogFilters.TRIGGER]() {
      return filterInitialState.metal;
    },
    [actions.clearCatalogFilters.SUCCESS]() {
      return filterInitialState.metal;
    }
  },
  filterInitialState.metal
);

const shapesFilterInput = handleActions(
  {
    [actions.saveCatalogShape.TRIGGER](state, { payload }) {
      return toggleItemInArray(state, payload);
    },
    [actions.setCatalogShape.TRIGGER](state, { payload }) {
      return [payload];
    },
    [actions.clearCatalogFilter.TRIGGER](state, { payload }) {
      if (payload.type === "shape") {
        return filterInitialState.shape;
      } else {
        return state;
      }
    },
    [actions.resetCatalogFilters.TRIGGER]() {
      return filterInitialState.shape;
    },
    [actions.clearCatalogFilters.SUCCESS]() {
      return filterInitialState.shape;
    }
  },
  filterInitialState.shape
);

const sizesFilterInput = handleActions(
  {
    [actions.saveCatalogSize.TRIGGER](state, { payload }) {
      return {
        ...state,
        sizes: toggleItemInArray(state.sizes, payload)
      };
    },
    [actions.changeCatalogSizeTab.TRIGGER](state, { payload }) {
      return {
        currentTab: payload,
        sizes: []
      };
    },
    [actions.clearCatalogFilter.TRIGGER](state, { payload }) {
      if (payload.type === "size") {
        return filterInitialState.size;
      } else {
        return state;
      }
    },
    [actions.resetCatalogFilters.TRIGGER]() {
      return filterInitialState.size;
    },
    [actions.clearCatalogFilters.SUCCESS]() {
      return filterInitialState.size;
    }
  },
  filterInitialState.size
);

const brandsFilterInput = handleActions(
  {
    [actions.saveCatalogBrands.TRIGGER](state, { payload }) {
      return toggleItemInArray(state, payload);
    },
    [actions.clearCatalogFilter.TRIGGER](state, { payload }) {
      if (payload.type === "brands") {
        return filterInitialState.brands;
      } else {
        return state;
      }
    },
    [actions.resetCatalogFilters.TRIGGER]() {
      return filterInitialState.brands;
    },
    [actions.clearCatalogFilters.SUCCESS]() {
      return filterInitialState.brands;
    }
  },
  filterInitialState.brands
);

const offersFilterInput = handleActions(
  {
    [actions.saveCatalogOffers.TRIGGER](state, { payload }) {
      return toggleItemInArray(state, payload);
    },
    [actions.clearCatalogFilter.TRIGGER](state, { payload }) {
      if (payload.type === "offers") {
        return filterInitialState.offers;
      } else {
        return state;
      }
    },
    [actions.resetCatalogFilters.TRIGGER]() {
      return filterInitialState.offers;
    },
    [actions.clearCatalogFilters.SUCCESS]() {
      return filterInitialState.offers;
    }
  },
  filterInitialState.offers
);

const styleFilterInput = handleActions(
  {
    [actions.saveCatalogStyle.TRIGGER](state, { payload }) {
      return toggleItemInArray(state, payload);
    },
    [actions.setCatalogStyle.TRIGGER](state, { payload }) {
      return [payload];
    },
    [actions.clearCatalogFilter.TRIGGER](state, { payload }) {
      if (payload.type === "style") {
        return filterInitialState.style;
      } else {
        return state;
      }
    },
    [actions.resetCatalogFilters.TRIGGER]() {
      return filterInitialState.style;
    },
    [actions.clearCatalogFilters.SUCCESS]() {
      return filterInitialState.style;
    }
  },
  filterInitialState.style
);

const sortInput = handleActions(
  {
    [actions.saveCatalogSort.TRIGGER](state, { payload }) {
      return payload;
    },
    [actions.resetCatalogFilters.TRIGGER]() {
      return filterInitialState.sort;
    }
  },
  filterInitialState.sort
);

const shoppingEasyStatus = makeStatusReducer(actions.fetchCatalogShoppingEasy);

const shoppingEasyData = handleActions({
  [actions.fetchCatalogShoppingEasy.SUCCESS](state, { payload }) {
    return payload;
  }
}, {});

const shoppingEasy = combineReducers({
  status: shoppingEasyStatus,
  data: shoppingEasyData
});

const blocks = combineReducers({
  shoppingEasy
});

const filtersInput = combineReducers({
  price: priceFilterInput,
  shape: shapesFilterInput,
  metal: metalFilterInput,
  style: styleFilterInput,
  brands: brandsFilterInput,
  offers: offersFilterInput,
  sort: sortInput,
  size: sizesFilterInput,
  gender: genderFilterInput
});

const filters = combineReducers({
  // isExpanded: isSharedFiltersExpanded,
  status: filtersStatus,
  config: filtersConfig,
  input: filtersInput
});

const catalogFeed = combineReducers({
  status,
  newItemsStatus,
  data,
  pagination,
  filters,
  blocks,
  catalogCategory,
  lastCatalogCategory
});

export default catalogFeed;
