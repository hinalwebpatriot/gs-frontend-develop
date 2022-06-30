import { combineReducers } from "redux";
import { handleActions } from "redux-actions";
import { makeStatusReducer, } from "../../../utils/reduxHelpers";

import * as actions from "./SaleActions";

const status = makeStatusReducer(actions.fetchSaleEngagementFeed);
const newItemsStatus = makeStatusReducer(actions.fetchSaleEngagementFeedNextPage);

const data = handleActions(
  {
    [actions.fetchSaleEngagementFeed.SUCCESS](state, { payload }) {
      return payload.data;
    },
    [actions.fetchSaleEngagementFeedNextPage.SUCCESS](state, { payload }) {
      return state.concat(payload.data);
    },
    [actions.fetchSaleEngagementFeed.FULFILL]() {
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
    [actions.fetchSaleEngagementFeed.SUCCESS](state, { payload }) {
      return {
        currentPage: payload.meta.current_page,
        lastPage: payload.meta.last_page,
        total: payload.meta.total
      };
    },
    [actions.fetchSaleEngagementFeedNextPage.SUCCESS](state, { payload }) {
      return {
        currentPage: payload.meta.current_page,
        lastPage: payload.meta.last_page,
        total: payload.meta.total
      };
    },
    [actions.fetchSaleEngagementFeed.FULFILL]() {
      return paginationInitial;
    }
  },
  paginationInitial
);



const saleFeed = combineReducers({
  status,
  newItemsStatus,
  data,
  pagination,
});

export default saleFeed;
