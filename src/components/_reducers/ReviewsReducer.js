import { combineReducers } from "redux";
import { handleActions } from "redux-actions";

import * as actions from "../Reviews/ReviewsActions";

const reviewsInitial = {
  isFetched: false,
  isNextFetching: false,
  isError: false,
  data: [],
  pagination: {
    currentPage: 0,
    lastPage: 0
  }
};

function reviewsReducerMaker(action) {
  return handleActions(
    {
      [action.TRIGGER](state, { payload }) {
        if (payload.isNextPage) {
          return { ...state, isNextFetching: true };
        } else {
          return reviewsInitial;
        }
      },
      [action.SUCCESS](state, { payload }) {
        let newState = { ...reviewsInitial, isFetched: true };

        if (payload.isNextPage) {
          newState.data = [...state.data, ...payload.data];
        } else {
          newState.data = [...payload.data];
        }

        newState.pagination = {
          currentPage: payload.meta.current_page,
          lastPage: payload.meta.last_page
        };

        return newState;
      },
      [action.FAILURE](state) {
        return { ...state, isError: true };
      },
      [action.FULFILL]() {
        return reviewsInitial;
      }
    },
    reviewsInitial
  );
}

const engagementReviewsReducer = reviewsReducerMaker(
  actions.fetchEngagementReviews
);
const engagementCategoryReviewsReducer = reviewsReducerMaker(
  actions.fetchEngagementCategoryReviews
);
const engagementProductReviewsReducer = reviewsReducerMaker(
  actions.fetchEngagementProductReviews
);

const weddingReviewsReducer = reviewsReducerMaker(actions.fetchWeddingReviews);
const weddingCategoryReviewsReducer = reviewsReducerMaker(
    actions.fetchWeddingCategoryReviews
);
const weddingProductReviewsReducer = reviewsReducerMaker(
    actions.fetchWeddingProductReviews
);

const catalogReviewsReducer = reviewsReducerMaker(actions.fetchCatalogReviews);
const catalogCategoryReviewsReducer = reviewsReducerMaker(
    actions.fetchCatalogCategoryReviews
);
const catalogProductReviewsReducer = reviewsReducerMaker(
    actions.fetchCatalogProductReviews
);

const reviews = combineReducers({
  engagement: engagementReviewsReducer,
  "engagement-category": engagementCategoryReviewsReducer,
  "engagement-product": engagementProductReviewsReducer,

  wedding: weddingReviewsReducer,
  "wedding-category": weddingCategoryReviewsReducer,
  "wedding-product": weddingProductReviewsReducer,

  catalog: catalogReviewsReducer,
  "catalog-category": catalogCategoryReviewsReducer,
  "catalog-product": catalogProductReviewsReducer
});

export default reviews;
