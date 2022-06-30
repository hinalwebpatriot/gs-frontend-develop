import React from "react";
import { initServerApp } from '../../../../src/components/rootSaga';

export default (req, res) => {
  console.log('bestSellersPageController');
  res.sendFirstChunk()
  const settings = {
    locale: req.locale
  };

  res.tracker.mark('API', 'start');
  res.store.runSaga(initServerApp, settings).done.then(() => {
    res.render();
  });
};
