import { combineReducers } from "redux";
import { handleActions } from "redux-actions";
import {
  makeStatusReducer,
  makeStatusWithResetReducer
} from "../../utils/reduxHelpers";

import * as actions from "../Search/SearchActions";
import { saveSearchQuery } from "../Search/SearchActions";

const quickStatusReducer = makeStatusReducer(actions.fetchQuickSearch);
const countStatusReducer = makeStatusReducer(actions.fetchSearchCount);

const queryReducer = handleActions(
  {
    [actions.saveSearchQuery.TRIGGER](state, { payload }) {
      return payload.query;
    },
    [actions.saveSearchQuery.FULFILL]() {
      return "";
    }
  },
  ""
);

const quickQueryReducer = handleActions(
  {
    [actions.fetchQuickSearch.TRIGGER](state, { payload }) {
      return payload;
    },
    [actions.fetchQuickSearch.FULFILL]() {
      return "";
    }
  },
  ""
);

const quickSearchBlogReducer = handleActions(
  {
    [actions.fetchQuickSearch.SUCCESS](state, { payload }) {
      return payload.blog;
    },
    // [actions.fetchQuickSearch.TRIGGER]() {
    //   return [];
    // },
    [actions.fetchQuickSearch.FULFILL]() {
      return [];
    }
  },
  []
);

const quickSearchProductsReducer = handleActions(
  {
    [actions.fetchQuickSearch.SUCCESS](state, { payload }) {
      return payload.products;
    },
    // [actions.fetchQuickSearch.TRIGGER]() {
    //   return [];
    // },
    [actions.fetchQuickSearch.FULFILL]() {
      return [];
    }
  },
  []
);

function countTabReducerCreator(field) {
  return handleActions(
    {
      [actions.fetchSearchCount.SUCCESS](state, { payload }) {
        return payload[field];
      },
      [actions.fetchSearchCount.FULFILL]() {
        return 0;
      }
    },
    0
  );
}

const countDiamondReducer = countTabReducerCreator("diamond");
const countEngagementReducer = countTabReducerCreator("engagement");
const countWeddingReducer = countTabReducerCreator("wedding");
const countBlogReducer = countTabReducerCreator("blog");
const countPendantReducer = countTabReducerCreator("pendant");
const countEarringsReducer = countTabReducerCreator("earrings");
const countBraceletsReducer = countTabReducerCreator("bracelets");

const paginationInitial = {
  currentPage: 1,
  lastPage: 1,
  total: 0
};

function searchDetailsReducerCreator(action, nextPageAction) {
  const statusReducer = makeStatusWithResetReducer(
    action,
    saveSearchQuery.TRIGGER
  );
  const newItemsStatusReducer = makeStatusWithResetReducer(
    nextPageAction,
    saveSearchQuery.TRIGGER
  );
  const dataReducer = handleActions(
    {
      [action.SUCCESS](state, { payload }) {
        return payload.data;
      },
      [action.FAILURE]() {
        return [];
      },
      [nextPageAction.SUCCESS](state, { payload }) {
        return state.concat(payload.data);
      },

      [actions.saveSearchQuery.TRIGGER]() {
        return [];
      }
    },
    []
  );

  const paginationReducer = handleActions(
    {
      [action.SUCCESS](state, { payload }) {
        return {
          currentPage: payload.pagination.current_page,
          lastPage: payload.pagination.last_page,
          total: payload.pagination.total
        };
      },
      [nextPageAction.SUCCESS](state, { payload }) {
        return {
          currentPage: payload.pagination.current_page,
          lastPage: payload.pagination.last_page,
          total: payload.pagination.total
        };
      },
      [actions.saveSearchQuery.TRIGGER]() {
        return paginationInitial;
      }
    },
    paginationInitial
  );

  return combineReducers({
    status: statusReducer,
    newItemsStatus: newItemsStatusReducer,
    data: dataReducer,
    pagination: paginationReducer
  });
}

const details = combineReducers({
  diamond: searchDetailsReducerCreator(
    actions.fetchDiamondSearch,
    actions.fetchDiamondNextPageSearch
  ),
  engagement: searchDetailsReducerCreator(
    actions.fetchEngagementSearch,
    actions.fetchEngagementNextPageSearch
  ),
  wedding: searchDetailsReducerCreator(
    actions.fetchWeddingSearch,
    actions.fetchWeddingNextPageSearch
  ),
  blog: searchDetailsReducerCreator(
    actions.fetchBlogSearch,
    actions.fetchBlogNextPageSearch
  ),
    pendant: searchDetailsReducerCreator(
        actions.fetchPendantSearch,
        actions.fetchPendantNextPageSearch
    ),
    earrings: searchDetailsReducerCreator(
        actions.fetchEarringsSearch,
        actions.fetchEarringsNextPageSearch
    ),
    bracelets: searchDetailsReducerCreator(
        actions.fetchBraceletsSearch,
        actions.fetchBraceletsNextPageSearch
    )
});

const count = combineReducers({
  status: countStatusReducer,
  diamond: countDiamondReducer,
  engagement: countEngagementReducer,
  wedding: countWeddingReducer,
  blog: countBlogReducer,
  pendant: countPendantReducer,
  earrings: countEarringsReducer,
  bracelets: countBraceletsReducer,
});

const quick = combineReducers({
  status: quickStatusReducer,
  blog: quickSearchBlogReducer,
  products: quickSearchProductsReducer
});

const search = combineReducers({
  query: queryReducer,
  quickQuery: quickQueryReducer,
  count,
  quick,
  details
});

export default search;
