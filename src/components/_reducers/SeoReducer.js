import { handleActions } from "redux-actions";

import { fetchMetaTags, fetchSeoTextBlock, changeTitle, setMetaImage } from "../_common/SEO/SeoActions";
import { combineReducers } from "redux";

const metaTags = handleActions(
  {
    [fetchMetaTags.SUCCESS](state, { payload }) {
      return {
        ...state,
        [payload.slug]: payload.data
      };
    },
    [fetchMetaTags.FULFILL]() {
      return {};
    }
  },
  {}
);

const seoTextBlocks = handleActions(
  {
    [fetchSeoTextBlock.SUCCESS](state, { payload }) {
      return {
        ...state,
        [payload.slug]: payload.data
      };
    },
    [fetchSeoTextBlock.FULFILL]() {
      return {};
    }
  },
  {}
);

const seoNewTitle = handleActions(
  {
    [changeTitle.TRIGGER](state, { payload }) {
      return payload;
    }
  },
  {}
)

const seoMetaImage = handleActions(
  {
    [setMetaImage.TRIGGER](state, { payload }) {
      return payload;
    }
  },
  ''
)

const seo = combineReducers({
  meta: metaTags,
  textBlock: seoTextBlocks,
  title: seoNewTitle,
  metaImage: seoMetaImage
});

export default seo;
