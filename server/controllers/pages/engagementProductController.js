import React from "react";
import selectors from "../../../src/components/_selectors/engagementProductSelectors";
import { engagementProductServerWorker } from "../../../src/components/Product/Engagement/EngagementPageActions";
import routing, { linkGenerator } from "../../../src/config/routing";
import getUrlParamsString from '../../utils/getUrlParamsString';

export default (req, res, next) => {
  console.log('engagementProductController');
  const { params, query } = req;

  const slug = params.slug.toLowerCase();
  const id = params.id;

  if (!slug || !id) {
    res.redirect(routing().notFound)
    return;
  }

  const sizeParams = query.size || "au";

  // const size = availableParams.some(item => item === sizeParams) ? sizeParams : availableParams[0];

  const sagaPayload = {
    seo: { page: linkGenerator.engagementRing({ slug, id }) }, // The same as weddingRing}
    settings: { locale: req.locale },
    reviews: { id, page: 1, perPage: 2 },
    id: id
  };

  res.productType = "engagement-rings";

  res.tracker.mark('API', 'start');
  res.store
    .runSaga(engagementProductServerWorker, sagaPayload)
    .done.then(() => {
      const ring = selectors.ringData(res.store.getState()).data.selected;

      if (!ring) {
            res.redirect(301, routing().engagementFeed);
            return;
      } else {
          const canonicalUrl = routing({
              slug: ring.h1.toLowerCase(),
              id: ring.id,
              size: sizeParams
          }).engagementProduct;

          const canonicalWithParams = canonicalUrl + getUrlParamsString(req.query);

          req.canonicalUrl = canonicalUrl;

          if (req.url !== canonicalWithParams) {
              res.redirect(301, canonicalWithParams);
              return;
          } else {
              res.sendFirstChunk();
              res.render();
          }
      }


    })
    .catch(err => {
        next();
    });
};
