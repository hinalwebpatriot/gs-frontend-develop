import React from "react";
import routing from "../../../src/config/routing";
import { weddingReviewsServerWorker } from "../../../src/components/Reviews/ReviewsActions";
import selectors from "../../../src/components/_selectors/reviewsSelectors";
import get from "lodash/get";
import getUrlParamsString from '../../utils/getUrlParamsString';

export default (req, res) => {
  console.log('weddingProductReviewsController');
  if (!req.params.id) {
    res.redirect(routing().notFound);
    return;
  }

  const sagaPayload = {
    reviews: { id: req.params.id, page: 1, perPage: 5 },
    settings: { locale: req.locale }
  };

  res.tracker.mark('API', 'start');
  res.store.runSaga(weddingReviewsServerWorker, sagaPayload).done.then(() => {
    const data = selectors.getReviewsList(res.store.getState(), "wedding");
    if (data.isError) {
      res.redirect(routing().notFound);
      return;
    }

    const slug = get(data, "data[0].product.h1", '').toLowerCase();
    const id = get(data, "data[0].product.id");

    const canonicalUrl = routing({ slug, id }).weddingProductReview;
    const canonicalWithParams = canonicalUrl + getUrlParamsString(req.query);
    req.canonicalUrl = canonicalUrl;

    if (req.url !== canonicalWithParams) {
      res.redirect(301, canonicalWithParams);
    } else {
      res.sendFirstChunk();
      res.render();
    }
  });
};
