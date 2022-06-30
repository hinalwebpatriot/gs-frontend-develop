import React from "react";
import { findWeddingFilterByName } from "../../../src/utils/findFilterByName";
import {
  setWeddingStyle,
  setWeddingMetal,
  changeWeddingGenderTab,
  weddingFeedServerWorker
} from "../../../src/components/Feed/Wedding/WeddingFeedActions";
import routing from "../../../src/config/routing";
import getUrlParamsString from '../../utils/getUrlParamsString';
import hasUpperCaseLetter from "../../utils/hasUpperCaseLetter";

export default (req, res) => {
  console.log('weddingFeedController');
  const { path } = req.route;
  const { style, gender, filter } = req.params;
  let metaSlug;

  switch (path) {
    case routing().weddingFeedWithFilter:
      handleOneFilter({ filter, store: res.store, req });
      metaSlug = `wedding-rings-${filter}`;
      req.canonicalUrl = routing(filter, req.city).weddingFeedWithFilter;
      if (filter === 'diamonds') {
        req.canonicalUrl = routing(undefined, req.city).weddingFeed;
      }
      break;
    case routing().weddingFeedWithGenderFilter:
      handleTwoFilters({ gender, style, store: res.store, req });
      metaSlug = `wedding-rings-${gender}-${style}`;
      req.canonicalUrl = routing({ gender, style }, req.city).weddingFeedWithGenderFilter;
      break;
    default:
      metaSlug = "wedding-rings";
      req.canonicalUrl = routing(undefined, req.city).weddingFeed;
  }

  if (hasUpperCaseLetter(req.path)) {
    res.redirect(301, req.path.toLowerCase());
  }

  if (req.isFilterInvalid) {
    res.redirect(301, routing().weddingFeed + getUrlParamsString(req.query));
    return;
  }

  res.sendFirstChunk();

  const sagaPayload = {
    seo: {
      page: metaSlug
    },
    feed: {
      page: req.params.pageNumber || 1,
      perPage: 24
    },
    settings: {
      locale: req.locale
    }
  };

  res.tracker.mark('API', 'start');
  res.store.runSaga(weddingFeedServerWorker, sagaPayload).done.then(() => {
    res.render();
  });
};

function handleOneFilter({ filter, store, req }) {
  const { type, slug } = findWeddingFilterByName(filter);

  switch (type) {
    case "metal":
      store.dispatch(setWeddingMetal(slug));
      break;
    case "style":
      store.dispatch(setWeddingStyle(slug));
      break;
    case "gender":
      store.dispatch(changeWeddingGenderTab(slug));
      break;
    default:
      req.isFilterInvalid = true;
      break;
  }
}

function handleTwoFilters({ gender, style, store, req }) {
  const genderFilter = findWeddingFilterByName(gender);
  const styleFilter = findWeddingFilterByName(style);

  switch (genderFilter.type) {
    case "gender":
      store.dispatch(changeWeddingGenderTab(genderFilter.slug));
      break;
    default:
      req.isFilterInvalid = true;
      break;
  }

  switch (styleFilter.type) {
    case "style":
      store.dispatch(setWeddingStyle(styleFilter.slug));
      break;
    default:
      req.isFilterInvalid = true;
      break;
  }
}
