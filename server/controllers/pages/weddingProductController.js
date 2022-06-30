import React from 'react';
import { weddingProductServerWorker } from '../../../src/components/Product/Wedding/WeddingPageActions';
import routing, { linkGenerator } from '../../../src/config/routing';
import selectors from '../../../src/components/_selectors/weddingProductSelectors';
import getUrlParamsString from '../../utils/getUrlParamsString';

export default (req, res, next) => {
  console.log('weddingProductController');
  const { params, query } = req;

  const slug = params.slug.toLowerCase();
  const id = params.id;

  if (!slug || !id) {
    res.redirect(routing().notFound);
    return;
  }

  const sizeParams = query.size || 'au';

  const sagaPayload = {
    seo: { page: linkGenerator.weddingRing({ slug, id }) }, // The same as engagementRing}
    settings: { locale: req.locale },
    reviews: { id, page: 1, perPage: 2 },
    id: id
  };

  res.productType = 'wedding-rings';

  res.tracker.mark('API', 'start');
  res.store
    .runSaga(weddingProductServerWorker, sagaPayload)
    .done.then(() => {
    const ring = selectors.ringData(res.store.getState()).data.selected;

    if (!ring) {
      res.redirect(301, routing().weddingFeed);
      next();
    } else {
      const canonicalUrl = routing({
        slug: ring.h1.toLowerCase(),
        id: ring.id,
        size: sizeParams
      }).weddingProduct;

      const canonicalWithParams = canonicalUrl + getUrlParamsString(req.query);

      req.canonicalUrl = canonicalUrl;

      console.log('wpp', canonicalUrl, canonicalWithParams, req.url);

      if (req.url !== canonicalWithParams) {
        res.redirect(301, canonicalWithParams);
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
