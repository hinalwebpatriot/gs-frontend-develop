import { combineReducers } from "redux";
import { handleActions } from "redux-actions";
import { makeStatusReducer } from "../../utils/reduxHelpers";

import * as actions from "../Main/MainActions";
import routing from "../../config/routing";
import { setMainPageWatchedStatus } from "../Main/MainActions";

const mainSliderStatus = makeStatusReducer(actions.fetchMainSlider);
const shapesBlockStatus = makeStatusReducer(actions.fetchShapesBlock);
const youHaveSeenSliderStatus = makeStatusReducer(actions.fetchYouHaveSeenSlider);
const occasionSliderStatus = makeStatusReducer(actions.fetchOccasionSlider);
const weddingRingsSliderStatus = makeStatusReducer(
  actions.fetchWeddingRingsSlider
);
const customJewelryStatus = makeStatusReducer(actions.fetchCustomJewelry);
const allProductCategoriesStatus = makeStatusReducer(
  actions.fetchAllProductCategories
);

const suggestedRingsStatus = makeStatusReducer(
  actions.fetchSuggestedRings
);

const alsoSuggestedRingsStatus = makeStatusReducer(
  actions.fetchAlsoSuggestedRings
);

const mainSliderData = handleActions(
  {
    [actions.fetchMainSlider.SUCCESS](state, { payload }) {
      return payload;
    },
    [actions.fetchMainSlider.FULFILL]() {
      return {};
    }
  },
  {}
);

const shapesBlockInitial = {
  selected: null,
  path: routing("Round").diamondsFeedWithShape,
  data: []
};

const shapesBlockData = handleActions(
  {
    [actions.fetchShapesBlock.SUCCESS](state, { payload }) {
      return {
        ...shapesBlockInitial,
        selected: payload[0].id,
        data: payload
      };
    },
    [actions.fetchShapesBlock.FULFILL]() {
      return shapesBlockInitial;
    },
    [actions.setShapeFromShapesBlock.TRIGGER](state, { payload }) {
      return {
        ...state,
        path: payload.path,
        selected: payload.selected
      };
    }
  },
  shapesBlockInitial
);

const occasionInitial = {
  id: "occasion-slider",
  title: "",
  data: []
};

const occasionSliderData = handleActions(
  {
    [actions.fetchOccasionSlider.SUCCESS](state, { payload }) {
      return {
        data: payload.products,
        id: payload.id,
        title: payload.title
      };
    },
    [actions.fetchOccasionSlider.FULFILL]() {
      return occasionInitial;
    }
  },
  occasionInitial
);

const youHaveSeenSliderData = handleActions(
  {
    [actions.fetchYouHaveSeenSlider.SUCCESS](state, { payload }) {
      return {
        data: payload,
        id: 'you-have-seen',
        title: 'You have seen'
      };
    },
    [actions.fetchYouHaveSeenSlider.FULFILL]() {
      return {
        ...occasionInitial,
        id: 'you-have-seen'
      }
    }
  },
  {
    ...occasionInitial,
    id: 'you-have-seen'
  }
);

const weddingRingsInitial = {
  selected: null,
  data: {}
};

const weddingRingsSliderData = handleActions(
  {
    [actions.fetchWeddingRingsSlider.SUCCESS](state, { payload }) {
      return {
        selected: payload.woman.length ? "woman" : "man",
        data: payload
      };
    },
    [actions.fetchWeddingRingsSlider.FULFILL]() {
      return weddingRingsInitial;
    },
    [actions.setWeddingRingsSlider.TRIGGER](state, { payload }) {
      return {
        ...state,
        selected: payload
      };
    }
  },
  weddingRingsInitial
);

const customJewelryData = handleActions(
  {
    [actions.fetchCustomJewelry.SUCCESS](state, { payload }) {
      return payload;
    },
    [actions.fetchCustomJewelry.FULFILL]() {
      return {};
    }
  },
  {}
);

const allProductCategoriesData = handleActions(
  {
    [actions.fetchAllProductCategories.SUCCESS](state, { payload }) {
      return payload;
    },
    [actions.fetchAllProductCategories.FULFILL]() {
      return {};
    }
  },
  {}
);

const alsoSuggestedRingsData = handleActions(
  {
    [actions.fetchAlsoSuggestedRings.SUCCESS](state, { payload }) {
      return payload;
    },
    [actions.fetchAlsoSuggestedRings.FULFILL]() {
      return {};
    }
  },
  {}
);

const suggestedRingsData = handleActions(
  {
    [actions.fetchSuggestedRings.SUCCESS](state, { payload }) {
      return payload;
    },
    [actions.fetchSuggestedRings.FULFILL]() {
      return {};
    }
  },
  {}
);

const suggestedRings = combineReducers({
  status: suggestedRingsStatus,
  data: suggestedRingsData,
})

const alsoSuggestedRings = combineReducers({
  status: alsoSuggestedRingsStatus,
  data: alsoSuggestedRingsData,
})

const allProductCategories = combineReducers({
  status: allProductCategoriesStatus,
  data: allProductCategoriesData,
})

const customJewelry = combineReducers({
  status: customJewelryStatus,
  data: customJewelryData
});

const weddingRingsSlider = combineReducers({
  status: weddingRingsSliderStatus,
  data: weddingRingsSliderData
});

const occasionSlider = combineReducers({
  status: occasionSliderStatus,
  data: occasionSliderData
});

const youHaveSeenSlider = combineReducers({
  status: youHaveSeenSliderStatus,
  data: youHaveSeenSliderData
});

const shapesBlock = combineReducers({
  status: shapesBlockStatus,
  data: shapesBlockData
});

const mainSlider = combineReducers({
  status: mainSliderStatus,
  data: mainSliderData
});

const isPageViewed = handleActions(
  {
    [setMainPageWatchedStatus.TRIGGER]() {
      return true;
    }
  },
  false
);

const main = combineReducers({
  mainSlider,
  shapesBlock,
  occasionSlider,
  youHaveSeenSlider,
  weddingRingsSlider,
  customJewelry,
  allProductCategories,
  alsoSuggestedRings,
  suggestedRings,
  isPageViewed
});

export default main;
