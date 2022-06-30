import React from "react";
import { saleFeedServerWorker } from '../../../../src/components/Dynamic/Sale/SaleActions';

export default (req, res) => {
  console.log('salePageController');
  res.sendFirstChunk();
  const sagaPayload = {
    settings: { locale: req.locale },
    feed: { page: 1, perPage: 8 },
    slug: 'sale'
  };

  res.tracker.mark('API', 'start');
  res.store.runSaga(saleFeedServerWorker, sagaPayload).done.then(() => {
      res.render();
  })
    .catch(() => {
      res.end();
    });
};
