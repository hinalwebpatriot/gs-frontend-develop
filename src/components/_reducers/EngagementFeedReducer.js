import { combineReducers } from 'redux'
import { handleActions } from 'redux-actions'
import { makeStatusReducer, makeStatusWithResetReducer, toggleItemInArray } from '../../utils/reduxHelpers'

import * as actions from '../Feed/Engagement/EngagementFeedActions'

const status = makeStatusReducer(actions.fetchEngagementFeed)

const newItemsStatus = makeStatusReducer(actions.fetchEngagementFeedNextPage)

const data = handleActions(
  {
    [actions.fetchEngagementFeed.SUCCESS](state, { payload }) {
      return payload.data
    },
    [actions.fetchEngagementFeedNextPage.SUCCESS](state, { payload }) {
      return state.concat(payload.data)
    },
    [actions.fetchEngagementFeed.FULFILL]() {
      return []
    }
  },
  []
)

const paginationInitial = {
  currentPage: 1,
  lastPage: 1,
  total: 0
}

const pagination = handleActions(
  {
    [actions.fetchEngagementFeed.SUCCESS](state, { payload }) {
      return {
        currentPage: payload.meta.current_page,
        lastPage: payload.meta.last_page,
        total: payload.meta.total
      }
    },
    [actions.fetchEngagementFeedNextPage.SUCCESS](state, { payload }) {
      return {
        currentPage: payload.meta.current_page,
        lastPage: payload.meta.last_page,
        total: payload.meta.total
      }
    },
    [actions.fetchEngagementFeed.FULFILL]() {
      return paginationInitial
    }
  },
  paginationInitial
)

// const filtersStatus = makeStatusReducer(actions.fetchEngagementFeedFilters);
const filtersStatus = makeStatusWithResetReducer(
  actions.fetchEngagementFeedFilters,
  actions.resetEngagementFilters.TRIGGER
)

const filtersConfig = handleActions(
  {
    [actions.fetchEngagementFeedFilters.SUCCESS](state, { payload }) {
      return payload
    }
  },
  {}
)

const filterInitialState = {
  gender: "",
  metal: [],
  price: { min: null, max: null, isDisabled: false },
  shape: [],
  style: [],
  size: {
    currentTab: 'au',
    sizes: []
  },
  collection: [],
  offers: [],
  sort: { field: 'new', order: 'asc' }
}

const priceFilterInput = handleActions(
  {
    [actions.saveEngagementPrice.TRIGGER](state, { payload }) {
      let isReverse = false

      if (payload.value[0] > payload.value[1]) {
        isReverse = true
      }

      const obj = {
        ...state,
        min: isReverse ? payload.value[1] : payload.value[0],
        max: isReverse ? payload.value[0] : payload.value[1]
      }

      return obj
    },
    [actions.setEngagementPrice.TRIGGER](state, { payload }) {
      const obj = {
        ...state,
        min: payload.value[0],
        max: payload.value[1],
      }
      return obj;
    },
    [actions.fetchEngagementFeedFilters.SUCCESS](state, { payload }) {
      const obj = {
        ...state,
        min: +payload['price'].min,
        max: state.max || +payload['price'].max
      }

      return obj
    },
    [actions.toggleEngagementFilter.TRIGGER](state) {
      return {
        ...state,
        isDisabled: !state.isDisabled
      }
    },
    [actions.clearEngagementFilters.SUCCESS](state, { payload }) {
      let updateObj = {
        ...filterInitialState.price,
        min: Number(payload['price'].min),
        max: Number(payload['price'].max)
      }

      return updateObj
    },
    [actions.resetEngagementFilters.TRIGGER]() {
      return filterInitialState.price
    }
  },
  filterInitialState.price
)

const metalFilterInput = handleActions(
  {
    [actions.setEngagementMetal.TRIGGER](state, { payload }) {
      return [payload]
    },
    [actions.saveEngagementMetal.TRIGGER](state, { payload }) {
      return toggleItemInArray(state, payload)
    },
    [actions.saveEngagementMetal.FULFILL](state, { payload }) {
      return payload
    },
    [actions.resetEngagementFilters.TRIGGER]() {
      return filterInitialState.metal
    },
    [actions.clearEngagementFilters.SUCCESS]() {
      return filterInitialState.metal
    }
  },
  filterInitialState.metal
);

const genderMap = {
  female: 'womens',
  male: 'mens',
  empty: ''
}

const genderFilterInput = handleActions(
  {
    [actions.changeEngagementGenderTab.TRIGGER](state, { payload }) {
      return genderMap[payload];
    },
    [actions.setEngagementGender.TRIGGER](state, { payload }) {
      return payload;
    },
    [actions.clearEngagementFilter.TRIGGER](state, { payload }) {
      return filterInitialState.gender
    },
    [actions.resetEngagementFilters.TRIGGER]() {
      return filterInitialState.gender
    },
    [actions.clearEngagementFilters.SUCCESS]() {
      return filterInitialState.gender
    }
  },
  filterInitialState.gender
)

const shapesFilterInput = handleActions(
  {
    [actions.saveEngagementShape.TRIGGER](state, { payload }) {
      return toggleItemInArray(state, payload)
    },
    [actions.setEngagementShape.TRIGGER](state, { payload }) {
      return [payload]
    },
    [actions.clearEngagementFilter.TRIGGER](state, { payload }) {
      if (payload.type === 'shape') {
        return filterInitialState.shape
      } else {
        return state
      }
    },
    [actions.resetEngagementFilters.TRIGGER]() {
      return filterInitialState.shape
    },
    [actions.clearEngagementFilters.SUCCESS]() {
      return filterInitialState.shape
    }
  },
  filterInitialState.shape
)

const sizesFilterInput = handleActions(
  {
    [actions.saveEngagementSize.TRIGGER](state, { payload }) {
      return {
        ...state,
        sizes: toggleItemInArray(state.sizes, payload)
      }
    },
    [actions.changeEngagementSizeTab.TRIGGER](state, { payload }) {
      return {
        currentTab: payload,
        sizes: []
      }
    },
    [actions.clearEngagementFilter.TRIGGER](state, { payload }) {
      if (payload.type === 'size') {
        return filterInitialState.size
      } else {
        return state
      }
    },
    [actions.resetEngagementFilters.TRIGGER]() {
      return filterInitialState.size
    },
    [actions.clearEngagementFilters.SUCCESS]() {
      return filterInitialState.size
    }
  },
  filterInitialState.size
)

const collectionFilterInput = handleActions(
  {
    [actions.saveEngagementCollection.TRIGGER](state, { payload }) {
      return toggleItemInArray(state, payload)
    },
    [actions.clearEngagementFilter.TRIGGER](state, { payload }) {
      if (payload.type === 'collection') {
        return filterInitialState.collection
      } else {
        return state
      }
    },
    [actions.resetEngagementFilters.TRIGGER]() {
      return filterInitialState.collection
    },
    [actions.clearEngagementFilters.SUCCESS]() {
      return filterInitialState.collection
    }
  },
  filterInitialState.collection
)

const offersFilterInput = handleActions(
  {
    [actions.saveEngagementOffers.TRIGGER](state, { payload }) {
      return toggleItemInArray(state, payload)
    },
    [actions.setEngagementOffers.TRIGGER](state, { payload }) {
      return [payload]
    },
    [actions.clearEngagementFilter.TRIGGER](state, { payload }) {
      if (payload.type === 'offers') {
        return filterInitialState.offers
      } else {
        return state
      }
    },
    [actions.resetEngagementFilters.TRIGGER]() {
      return filterInitialState.offers
    },
    [actions.clearEngagementFilters.SUCCESS]() {
      return filterInitialState.offers
    }
  },
  filterInitialState.offers
)

const styleFilterInput = handleActions(
  {
    [actions.saveEngagementStyle.TRIGGER](state, { payload }) {
      return toggleItemInArray(state, payload)
    },
    [actions.setEngagementStyle.TRIGGER](state, { payload }) {
      return [payload]
    },
    [actions.clearEngagementFilter.TRIGGER](state, { payload }) {
      if (payload.type === 'style') {
        return filterInitialState.style
      } else {
        return state
      }
    },
    [actions.resetEngagementFilters.TRIGGER]() {
      return filterInitialState.style
    },
    [actions.clearEngagementFilters.SUCCESS]() {
      return filterInitialState.style
    }
  },
  filterInitialState.style
)

const sortInput = handleActions(
  {
    [actions.saveEngagementSort.TRIGGER](state, { payload }) {
      return payload
    },
    [actions.resetEngagementFilters.TRIGGER]() {
      return filterInitialState.sort
    }
  },
  filterInitialState.sort
)

const shoppingEasyStatus = makeStatusReducer(actions.fetchEngagementShoppingEasy)

const shoppingEasyData = handleActions(
  {
    [actions.fetchEngagementShoppingEasy.SUCCESS](state, { payload }) {
      return payload
    }
  },
  {}
)

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
  shape: shapesFilterInput,
  metal: metalFilterInput,
  style: styleFilterInput,
  collection: collectionFilterInput,
  offers: offersFilterInput,
  sort: sortInput,
  size: sizesFilterInput
})

const filters = combineReducers({
  // isExpanded: isSharedFiltersExpanded,
  status: filtersStatus,
  config: filtersConfig,
  input: filtersInput
})

const engagementFeed = combineReducers({
  status,
  newItemsStatus,
  data,
  pagination,
  filters,
  blocks
})

export default engagementFeed
