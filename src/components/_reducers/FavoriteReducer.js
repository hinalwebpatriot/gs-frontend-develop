import { combineReducers } from "redux";
import { handleActions } from "redux-actions";
import { makeStatusReducer } from "../../utils/reduxHelpers";

import * as actions from "../Favorite/FavoriteActions";

import {
  addDiamondsFromCompareToFav,
  addEngagementsFromCompareToFav,
  addWeddingsFromCompareToFav,
  addProductsFromCompareToFav,
  addPendantsFromCompareToFav,
  addEarringsFromCompareToFav,
  addBraceletsFromCompareToFav,
  addRingsFromCompareToFav,
  addEternityRingsFromCompareToFav
} from "../Compare/CompareActions";

const status = makeStatusReducer(actions.fetchFavorites);
const syncStatus = makeStatusReducer(actions.syncFavorites);

const dataInitial = {
  count: 0,
  keys: [],
  items: []
};

function favoriteReducerMaker({
                                addAction,
                                removeAction,
                                removeCategoryAction,
                                addAllToCompare,
                                type
                              }) {
  return handleActions(
      {
        [actions.fetchFavorites.SUCCESS](state, { payload }) {
          let items, keys, count;
          if (type === 'diamonds' ||
              type === 'engagement-rings' ||
              type === 'wedding-rings') {
            items = payload[type].items;
            count = payload[type].count;
            keys = items.map(item => item.id);
          } else {
            items = payload['products'].items.filter(item => item.category.slug === type);
            keys = payload['products'].items.filter(item => item.category.slug === type);
            count = items.length || dataInitial.count;
          }


          return {
            count,
            keys,
            items
          };
        },
        [actions.syncFavorites.SUCCESS](state, { payload }) {
          const { items, count } = payload[type];

          const keys = items.map(item => item.id);

          return {
            count,
            keys,
            items
          };
        },
        [addAllToCompare.SUCCESS](state, { payload }) {
          const { items } = state;

          const newItems = [...payload, ...items];
          const newCount = newItems.length;
          const newKeys = newItems.map(item => item.id);

          return {
            count: newCount,
            items: newItems,
            keys: newKeys
          };
        },
        [addAction.TRIGGER](state, { payload }) {
          const { count, items } = state;
          if (count >= 6) {
            return state;
          }

          const newItems = [payload, ...items];
          const newCount = newItems.length;
          const newKeys = newItems.map(item => item.id);

          return {
            count: newCount,
            items: newItems,
            keys: newKeys
          };
        },
        [addAction.FAILURE](state, { payload }) {
          const { items } = state;
          const newItems = items.filter(item => item.id !== payload.id);
          const newCount = newItems.length;
          const newKeys = newItems.map(item => item.id);

          return {
            count: newCount,
            items: newItems,
            keys: newKeys
          };
        },
        [addAction.FULFILL](state, { payload }) {
          const { items } = state;
          const newItems = items.filter(item => item.id !== payload.id);
          const newCount = newItems.length;
          const newKeys = newItems.map(item => item.id);
          return {
            count: newCount,
            items: newItems,
            keys: newKeys
          };
        },
        [removeAction.TRIGGER](state, { payload }) {
          const { items } = state;

          const newItems = items.filter(item => item.id !== payload.id);
          const newCount = newItems.length;
          const newKeys = newItems.map(item => item.id);

          return {
            count: newCount,
            items: newItems,
            keys: newKeys
          };
        },
        // [removeAction.FAILURE](state, { payload }) {
        //   const { count, items } = state;
        //   const newItems = { ...items, [payload.id]: payload };
        //
        //   return {
        //     count: newCount,
        //     items: newItems,
        //   };
        // },
        [removeCategoryAction.TRIGGER]() {
          return dataInitial;
        },
        [actions.removeAllFromFav.TRIGGER]() {
          return dataInitial;
        }
      },
      dataInitial
  );
}

const diamondFavoriteReducer = favoriteReducerMaker({
  addAction: actions.addDiamondToFav,
  addAllToCompare: addDiamondsFromCompareToFav,
  removeAction: actions.removeDiamondFromFav,
  removeCategoryAction: actions.removeAllDiamondFromFav,
  type: "diamonds"
});

const engagementRingFavoriteReducer = favoriteReducerMaker({
  addAction: actions.addEngagementToFav,
  addAllToCompare: addEngagementsFromCompareToFav,
  removeAction: actions.removeEngagementFromFav,
  removeCategoryAction: actions.removeAllEngagementFromFav,
  type: "engagement-rings"
});

const weddingRingFavoriteReducer = favoriteReducerMaker({
  addAction: actions.addWeddingToFav,
  addAllToCompare: addWeddingsFromCompareToFav,
  removeAction: actions.removeWeddingFromFav,
  removeCategoryAction: actions.removeAllWeddingFromFav,
  type: "wedding-rings"
});

const productFavoriteReducer = favoriteReducerMaker({
  addAction: actions.addProductToFav,
  addAllToCompare: addProductsFromCompareToFav,
  removeAction: actions.removeProductFromFav,
  removeCategoryAction: actions.removeAllProductFromFav,
  type: "products"
});
const pendantFavoriteReducer = favoriteReducerMaker({
  addAction: actions.addPendantToFav,
  addAllToCompare: addPendantsFromCompareToFav,
  removeAction: actions.removePendantFromFav,
  removeCategoryAction: actions.removeAllPendantFromFav,
  type: "pendant"
});
const ringFavoriteReducer = favoriteReducerMaker({
  addAction: actions.addRingToFav,
  addAllToCompare: addRingsFromCompareToFav,
  removeAction: actions.removeRingFromFav,
  removeCategoryAction: actions.removeAllRingFromFav,
  type: "ring"
});
const earringFavoriteReducer = favoriteReducerMaker({
  addAction: actions.addEarringToFav,
  addAllToCompare: addEarringsFromCompareToFav,
  removeAction: actions.removeEarringFromFav,
  removeCategoryAction: actions.removeAllEarringFromFav,
  type: "earrings"
});
const braceletFavoriteReducer = favoriteReducerMaker({
  addAction: actions.addBraceletToFav,
  addAllToCompare: addBraceletsFromCompareToFav,
  removeAction: actions.removeBraceletFromFav,
  removeCategoryAction: actions.removeAllBraceletFromFav,
  type: "bracelets"
});
const eternityRingFavoriteReducer = favoriteReducerMaker({
  addAction: actions.addEternityRingToFav,
  addAllToCompare: addEternityRingsFromCompareToFav,
  removeAction: actions.removeEternityRingFromFav,
  removeCategoryAction: actions.removeAllEternityRingFromFav,
  type: "eternity-rings"
});

const data = combineReducers({
  diamond: diamondFavoriteReducer,
  engagement: engagementRingFavoriteReducer,
  wedding: weddingRingFavoriteReducer,
  product: productFavoriteReducer,
  pendant: pendantFavoriteReducer,
  ring: ringFavoriteReducer,
  earring: earringFavoriteReducer,
  bracelet: braceletFavoriteReducer,
  'eternity-ring': eternityRingFavoriteReducer,
});

const favorite = combineReducers({
  status,
  syncStatus,
  data
});

export default favorite;
