import { combineReducers } from "redux";
import { handleActions } from "redux-actions";
import {
  makeStatusReducer,
  makeStatusWithResetReducer,
  toggleItemInArray
} from "../../utils/reduxHelpers";
// import { shapeFilter } from "../../utils/findFilterByName";

import * as actions from "../Feed/Diamonds/DiamondsFeedActions";
import RingConstructor from "../_common/RingConstructor/RingConstructor";

// const diamondsBanners = handleActions(
//   {
//     [actions.fetchDiamondsBanners.SUCCESS](state, { payload }) {
//       return payload;
//     },
//     [actions.fetchDiamondsBanners.FULFILL]() {
//       return [];
//     },
//   },
//   []
// );

const status = makeStatusReducer(actions.fetchDiamondsFeed);
const newItemsStatus = makeStatusReducer(actions.fetchDiamondsFeedNextPage);

const data = handleActions(
  {
    [actions.fetchDiamondsFeed.SUCCESS](state, { payload }) {
      return payload.data;
    },
    [actions.fetchDiamondsFeedNextPage.SUCCESS](state, { payload }) {
      return state.concat(payload.data);
    },
    [actions.fetchDiamondsFeed.FULFILL]() {
      return [];
    }
  },
  []
);

const pagination = handleActions(
  {
    [actions.fetchDiamondsFeed.SUCCESS](state, { payload }) {
      return {
        currentPage: payload.meta.current_page,
        lastPage: payload.meta.last_page,
        total: payload.meta.total
      };
    },
    [actions.fetchDiamondsFeedNextPage.SUCCESS](state, { payload }) {
      return {
        currentPage: payload.meta.current_page,
        lastPage: payload.meta.last_page,
        total: payload.meta.total
      };
    }
  },
  {
    currentPage: 1,
    lastPage: 1,
    total: 0
  }
);

// const filtersStatus = makeStatusReducer(actions.fetchDiamondsFeedFilters);
const filtersStatus = makeStatusWithResetReducer(
  actions.fetchDiamondsFeedFilters,
  actions.saveDiamondsFilter.FULFILL
);

const filtersConfig = handleActions(
  {
    [actions.fetchDiamondsFeedFilters.SUCCESS](state, { payload }) {
      return payload;
    }
  },
  {}
);

const sharedFilterInitialState = {
  cut: { min: null, max: null, isDisabled: false },
  carat: { min: null, max: null, isDisabled: false },
  color: { min: null, max: null, isDisabled: false },
  clarity: { min: null, max: null, isDisabled: false },
  price: { min: null, max: null, isDisabled: false },
  fluorescence: { min: null, max: null, isDisabled: true },
  polish: { min: null, max: null, isDisabled: true },
  symmetry: { min: null, max: null, isDisabled: true },
  table: { min: null, max: null, isDisabled: true },
  size_ratio: { min: null, max: null, isDisabled: true },
  depth: { min: null, max: null, isDisabled: true }
};

const checkForCaratFromSetting = (caratValues) => {
  if ((RingConstructor.min_stone_carat || RingConstructor.min_stone_carat === 0)
      && RingConstructor.max_stone_carat && caratValues) {
    caratValues.min = RingConstructor.min_stone_carat;
    caratValues.max = RingConstructor.max_stone_carat;
  };
}

const sharedFiltersInput = handleActions(
  {
    [actions.saveDiamondsFilter.TRIGGER](state, { payload }) {
      try {
        const obj = { ...state };
        let isReverse = false;

        if (payload.value[0] > payload.value[1]) {
          isReverse = true;
        }

        obj[payload.type] = {
          ...payload[payload.type],
          min: isReverse ? payload.value[1] : payload.value[0],
          max: isReverse ? payload.value[0] : payload.value[1]
        };

        return obj;
      } catch (e) {
        return state;
      }
    },
    [actions.disableDiamondsFilters.TRIGGER](state, { payload }) {
      const obj = { ...state };

      payload.forEach(key => {
        obj[key] = {
          ...obj[key],
          isDisabled: true
        };
      });

      return obj;
    },
    [actions.toggleDiamondsFilter](state, { payload }) {
      const obj = { ...state };
      obj[payload.type] = {
        ...obj[payload.type],
        isDisabled: payload.isDisabled
      };

      return obj;
    },
    [actions.clearDiamondsFilters.SUCCESS](state, { payload }) {
      let updateObj = { ...sharedFilterInitialState };

      Object.keys(payload).forEach(key => {
        updateObj[key] = {
          ...updateObj[key],
          min: Number(payload[key].min),
          max: Number(payload[key].max)
        };
      });

      return updateObj;
    },
    [actions.saveDiamondsFilter.FULFILL]() {
      return sharedFilterInitialState;
    },
    [actions.setCaratFromUrl.TRIGGER](state, { payload }) {
      const obj = { ...state };
      const num = +payload;
      if (!payload) return state;
      
      obj.carat = {
        isDisabled: Boolean(state.carat.isDisabled),
        min: num,
        max: Number.isInteger(num) ? (num + 0.99) : num,
        defaultMin: obj.carat.min,
        defaultMax: obj.carat.max,
      }
      console.log('reducer min/max', obj.carat);
      return obj;
    },
    [actions.fetchDiamondsFeedFilters.SUCCESS](state, { payload }) {
      const obj = { ...state };
      Object.keys(payload).forEach(key => {
        obj[key] = {
          ...obj[key],
          min: +payload[key].min,
          max: +payload[key].max
        };
      });
      checkForCaratFromSetting(obj['carat']);
      
      console.log('fetchDiamondsFeedFilters min/max', obj.carat);
      return obj;
    },
    [actions.enableDiamondsFilterTriple.TRIGGER](state) {
      const obj = { ...state };
      const config = {
        min: 1, //Excellent
        max: 1,
        isDisabled: false
      };

      obj.cut = { ...config };
      obj.polish = { ...config };
      obj.symmetry = { ...config };

      return obj;
    },
    [actions.disableDiamondsFilterTriple.TRIGGER](state) {
      let obj = { ...state };

      obj.cut = { ...sharedFilterInitialState.cut };
      obj.polish = { ...sharedFilterInitialState.polish };
      obj.symmetry = { ...sharedFilterInitialState.symmetry };

      return obj;
    }
  },
  sharedFilterInitialState
);

const shapesFilterInput = handleActions(
  {
    [actions.saveDiamondsShape.TRIGGER](state, { payload }) {
      return toggleItemInArray(state, payload);
    },
    [actions.setDiamondsShape.TRIGGER](state, { payload }) {
      // const shape = payload.toLowerCase();
      const shape = payload.toLowerCase();
      return [shape];

      // if (shapeFilter.includes(shape)) {
      //
      // } else {
      //   return state;
      // }
    },
    [actions.clearDiamondsFilters.SUCCESS]() {
      return [];
    },
    [actions.saveDiamondsFilter.FULFILL]() {
      return [];
    }
  },
  []
);

const sortInput = handleActions(
  {
    [actions.saveDiamondsSort.TRIGGER](state, { payload }) {
      return payload;
    }
  },
  { field: 'price', order: "asc" }
);

const isSharedFiltersExpanded = handleActions(
  {
    [actions.expandDiamondsFilters.TRIGGER](state) {
      return !state;
    },
    [actions.saveDiamondsFilter.FULFILL]() {
      return false;
    },
    [actions.clearDiamondsFilters.SUCCESS]() {
      return false;
    },
    [actions.enableDiamondsFilterTriple.TRIGGER]() {
      return true;
    }
  },
  false
);

const isVideoFilterActive = handleActions({
  [actions.toggleDiamondsVideoFilter.TRIGGER](state) {
    return !state
  },
  [actions.clearDiamondsFilters.SUCCESS]() {
    return false;
  },
}, false)

const isTripleFilterActive = handleActions(
  {
    [actions.enableDiamondsFilterTriple.TRIGGER]() {
      return true;
    },
    [actions.disableDiamondsFilterTriple.TRIGGER]() {
      return false;
    },
    [actions.saveDiamondsFilter.TRIGGER](state, { payload }) {
      switch (payload.type) {
        case "cut":
        case "polish":
        case "symmetry":
          if (payload.value[0] !== 1 || payload.value[1] !== 1) {
            return false;
          }
          break;
        default:
          return state;
      }
    },
    [actions.disableDiamondsFilters.TRIGGER](state, { payload }) {
      const arr = ["cut", "polish", "symmetry"];

      if (payload.some(filter => arr.includes(filter))) {
        return false;
      } else {
        return state;
      }
    },
    [actions.toggleDiamondsFilter](state, { payload }) {
      switch (payload.type) {
        case "cut":
        case "polish":
        case "symmetry":
          return false;
        default:
          return state;
      }
    },
    [actions.clearDiamondsFilters.SUCCESS]() {
      return false;
    },
    [actions.saveDiamondsFilter.FULFILL]() {
      return false;
    }
  },
  false
);

const firstRingSliderStatus = makeStatusReducer(actions.fetchDiamondsFirstRingSlider);
const firstRingSliderData = handleActions({
  [actions.fetchDiamondsFirstRingSlider.SUCCESS](state, { payload }) {
    return payload
  }
}, []);

const firstRingSlider = combineReducers({
  status: firstRingSliderStatus,
  data: firstRingSliderData
});

const secondRingSliderStatus = makeStatusReducer(actions.fetchDiamondsSecondRingSlider);
const secondRingSliderData = handleActions({
  [actions.fetchDiamondsSecondRingSlider.SUCCESS](state, { payload }) {
    return payload
  }
}, []);

const secondRingSlider = combineReducers({
  status: secondRingSliderStatus,
  data: secondRingSliderData
});

const blocks = combineReducers({
  firstRingSlider,
  secondRingSlider,
  // diamondsBanners
});


const filtersInput = combineReducers({
  shared: sharedFiltersInput,
  shapes: shapesFilterInput,
  sort: sortInput,
  isVideo: isVideoFilterActive,
});

const filters = combineReducers({
  isExpanded: isSharedFiltersExpanded,
  isTriple: isTripleFilterActive,
  status: filtersStatus,
  config: filtersConfig,
  input: filtersInput
});

const diamondsFeed = combineReducers({
  status,
  newItemsStatus,
  data,
  pagination,
  filters,
  blocks
});

export default diamondsFeed;
