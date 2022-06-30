import React from "react";
import { reviewsServerWorker } from "../../../src/components/Reviews/ReviewsActions";

export default (req, res) => {
  console.log('reviewsController');
  res.sendFirstChunk();
  const sagaPayload = {
    reviews: { page: 1, perPage: 5 },
    settings: { locale: req.locale }
  };

  res.tracker.mark('API', 'start');
  res.store.runSaga(reviewsServerWorker, sagaPayload).done.then(() => {
    res.render();
  });
};
