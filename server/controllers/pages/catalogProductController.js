import React from "react";
import selectors from "../../../src/components/_selectors/catalogProductSelectors";
import { catalogProductServerWorker } from "../../../src/components/Product/Catalog/CatalogPageActions";
import routing, { linkGenerator } from "../../../src/config/routing";
import getUrlParamsString from '../../utils/getUrlParamsString';
import hasUpperCaseLetter from "../../utils/hasUpperCaseLetter";

export default (req, res, next) => {
  console.log('catalogProductController');
  const { params, query } = req;

  const slug = params.slug.toLowerCase();
  const id = params.id;

  if (!slug || !id) {
    res.redirect(routing().notFound);
    return;
  }

  const sizeParams = query.size || "au";

  // const size = availableParams.some(item => item === sizeParams) ? sizeParams : availableParams[0];

  const sagaPayload = {
    seo: { page: linkGenerator.catalog({ slug, id }) }, // The same as weddingRing}
    settings: { locale: req.locale },
    reviews: { id, page: 1, perPage: 2 },
    id: id
  };

  res.productType = "catalog";

  res.tracker.mark('API', 'start');
  res.store
    .runSaga(catalogProductServerWorker, sagaPayload)
    .done.then(() => {
      const product = selectors.catalogData(res.store.getState()).data.selected;

      if (!product) {
          res.redirect(301, routing().jewelleryFeed);
          next();
        return;
      } else {
          const canonicalUrl = routing({
              slug: product.h1.toLowerCase(),
              id: product.id,
              size: sizeParams
          }).catalogProduct;

          const canonicalWithParams = canonicalUrl + getUrlParamsString(req.query);

          req.canonicalUrl = canonicalUrl;

          if (hasUpperCaseLetter(req.path)) {
            res.redirect(301, req.path.toLowerCase());
            return;
          }

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
