import { combineReducers } from "redux";
import { handleActions } from "redux-actions";
import { makeStatusReducer } from "../../utils/reduxHelpers";

import * as actions from "../Compare/CompareActions";

import {
  addDiamondsFromFavToCompare,
  addEngagementsFromFavToCompare,
  addWeddingsFromFavToCompare,
  addProductsFromFavToCompare,
  addPendantsFromFavToCompare,
  addRingFromFavToCompare,
  addEarringsFromFavToCompare,
  addBraceletsFromFavToCompare,
  addEternityRingsFromFavToCompare


} from "../Favorite/FavoriteActions";

const status = makeStatusReducer(actions.fetchCompare);
const syncStatus = makeStatusReducer(actions.syncCompare);

const dataInitial = {
  count: 0,
  items: [],
  keys: []
};

function compareReducerMaker({
  addAction,
  removeAction,
  removeCategoryAction,
  addAllToCompare,
  type
}) {
  return handleActions(
    {
      [actions.fetchCompare.SUCCESS](state, { payload }) {
        let items, keys, count;
 
        if (type === 'diamonds' ||
            type === 'engagement-rings' ||
            type === 'wedding-rings'
            )
           {
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
      [actions.syncCompare.SUCCESS](state, { payload }) {
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
        // console.log('addAction.TROGGER');
        // // debugger;
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
      [actions.removeAllFromCompare.TRIGGER]() {
        return dataInitial;
      }
    },
    dataInitial
  );
}

const diamondCompareReducer = compareReducerMaker({
  addAction: actions.addDiamondToCompare,
  addAllToCompare: addDiamondsFromFavToCompare,
  removeAction: actions.removeDiamondFromCompare,
  removeCategoryAction: actions.removeAllDiamondFromCompare,
  type: "diamonds"
});

const engagementRingCompareReducer = compareReducerMaker({
  addAction: actions.addEngagementToCompare,
  addAllToCompare: addEngagementsFromFavToCompare,
  removeAction: actions.removeEngagementFromCompare,
  removeCategoryAction: actions.removeAllEngagementFromCompare,
  type: "engagement-rings"
});

const weddingRingCompareReducer = compareReducerMaker({
  addAction: actions.addWeddingToCompare,
  addAllToCompare: addWeddingsFromFavToCompare,
  removeAction: actions.removeWeddingFromCompare,
  removeCategoryAction: actions.removeAllWeddingFromCompare,
  type: "wedding-rings"
});

const productCompareReducer = compareReducerMaker({
  addAction: actions.addProductToCompare,
  addAllToCompare: addProductsFromFavToCompare,
  removeAction: actions.removeProductFromCompare,
  removeCategoryAction: actions.removeAllProductFromCompare,
  type: "products"
});
const pendantCompareReducer = compareReducerMaker({
  addAction: actions.addPendantToCompare,
  addAllToCompare: addPendantsFromFavToCompare,
  removeAction: actions.removePendantFromCompare,
  removeCategoryAction: actions.removeAllPendantFromCompare,
  type: "pendant"
});
const ringCompareReducer = compareReducerMaker({
  addAction: actions.addRingToCompare,
  addAllToCompare: addRingFromFavToCompare,
  removeAction: actions.removeRingFromCompare,
  removeCategoryAction: actions.removeAllRingFromCompare,
  type: "ring"
});
const earringCompareReducer = compareReducerMaker({
  addAction: actions.addEarringToCompare,
  addAllToCompare: addEarringsFromFavToCompare,
  removeAction: actions.removeEarringFromCompare,
  removeCategoryAction: actions.removeAllEarringFromCompare,
  type: "earrings"
});
const braceletCompareReducer = compareReducerMaker({
  addAction: actions.addBraceletToCompare,
  addAllToCompare: addBraceletsFromFavToCompare,
  removeAction: actions.removeBraceletFromCompare,
  removeCategoryAction: actions.removeAllBraceletFromCompare,
  type: "bracelets"
});
const eternityRingCompareReducer = compareReducerMaker({
  addAction: actions.addEternityRingToCompare,
  addAllToCompare: addEternityRingsFromFavToCompare,
  removeAction: actions.removeEternityRingFromCompare,
  removeCategoryAction: actions.removeAllEternityRingFromCompare,
  type: "eternity-rings"
});

const data = combineReducers({
  diamond: diamondCompareReducer,
  engagement: engagementRingCompareReducer,
  wedding: weddingRingCompareReducer,
  product: productCompareReducer,
  pendant: pendantCompareReducer,
  ring: ringCompareReducer,
  earring: earringCompareReducer,
  bracelet: braceletCompareReducer,
  'eternity-ring': eternityRingCompareReducer
});

const compare = combineReducers({
  status,
  syncStatus,
  data
});

export default compare;
