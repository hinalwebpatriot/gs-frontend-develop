import { combineReducers } from "redux";
import { handleActions } from "redux-actions";

import * as actions from "../Blog/BlogActions";

const articleInitial = {
  isFetched: false,
  isError: false,
  data: {}
};

const articleReducer = handleActions(
  {
    [actions.fetchArticle.SUCCESS](state, { payload }) {
      return {
        isFetched: true,
        isError: false,
        data: payload
      };
    },
    [actions.fetchArticle.FAILURE]() {
      return {
        isFetched: false,
        isError: true,
        data: {}
      };
    },
    [actions.fetchArticle.FULFILL]() {
      return articleInitial;
    },
    [actions.fetchArticle.TRIGGER]() {
      return articleInitial;
    }
  },
  articleInitial
);

const tagsReducer = handleActions(
  {
    [actions.fetchCategories.SUCCESS](state, { payload }) {
      return payload;
    }
  },
  []
);

const articlesByTagInitial = {
  isFetched: false,
  isError: false,
  data: [],
  pagination: {
    currentPage: 0,
    lastPage: 0
  }
};

const articlesByTagReducer = handleActions(
  {
    [actions.fetchCategoryArticles.SUCCESS](state, { payload }) {
      return {
        isFetched: true,
        isError: false,
        data: payload.data,
        pagination: {
          currentPage: payload.meta.current_page,
          lastPage: payload.meta.last_page
        }
      };
    },
    [actions.fetchCategoryArticles.FAILURE]() {
      return {
        ...articlesByTagInitial,
        isError: true
      };
    },
    [actions.fetchCategoryArticles.FULFILL]() {
      return articlesByTagInitial;
    },
    [actions.fetchCategoryArticles.TRIGGER]() {
      return articlesByTagInitial;
    }
  },
  articlesByTagInitial
);

const articlesInitial = {
  isFetched: false,
  isError: false,
  data: [],
  pagination: {
    currentPage: 0,
    lastPage: 0
  }
};

const articlesReducer = handleActions(
  {
    [actions.fetchArticles.SUCCESS](state, { payload }) {
      return {
        isFetched: true,
        isError: false,
        data: payload.data,
        pagination: {
          currentPage: payload.meta.current_page,
          lastPage: payload.meta.last_page
        }
      };
    },
    [actions.fetchArticles.FAILURE]() {
      return {
        ...articlesInitial,
        isError: true
      };
    },
    [actions.fetchArticles.FULFILL]() {
      return articlesInitial;
    },
    [actions.fetchArticles.TRIGGER]() {
      return articlesInitial;
    }
  },
  articlesInitial
);

const articlesRelatedInitial = {
  isFetched: false,
  isError: false,
  data: []
};

const articlesRelatedReducer = handleActions(
  {
    [actions.fetchRelatedArticles.SUCCESS](state, { payload }) {
      return {
        isFetched: true,
        isError: false,
        data: payload
      };
    },
    [actions.fetchRelatedArticles.FAILURE]() {
      return {
        ...articlesRelatedInitial,
        isError: true
      };
    },
    [actions.fetchRelatedArticles.TRIGGER]() {
      return articlesRelatedInitial;
    },
    [actions.fetchRelatedArticles.FULFILL]() {
      return articlesRelatedInitial;
    }
  },
  articlesRelatedInitial
);

const articlesTopInitial = {
  main: {},
  list: [],
  isFetched: false,
  isError: false
};

const articlesTopReducer = handleActions(
  {
    [actions.fetchTopArticles.SUCCESS](state, { payload }) {
      return {
        main: payload.main,
        list: payload.list,
        isFetched: true,
        isError: false
      };
    },
    [actions.fetchTopArticles.FAILURE]() {
      return {
        ...articlesTopInitial,
        isError: true
      };
    },
    [actions.fetchTopArticles.TRIGGER]() {
      return articlesTopInitial;
    },
    [actions.fetchTopArticles.FULFILL]() {
      return articlesTopInitial;
    }
  },
  articlesTopInitial
);

const blog = combineReducers({
  tags: tagsReducer,
  article: articleReducer,
  articlesList: articlesReducer,
  articlesByTagList: articlesByTagReducer,
  related: articlesRelatedReducer,
  top: articlesTopReducer
});

export default blog;
