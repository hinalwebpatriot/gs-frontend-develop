import React from "react";
import { blogServerWorker } from "../../../src/components/Blog/BlogActions";

export default (req, res) => {
  console.log('blogController');
  res.sendFirstChunk();
  const sagaPayload = {
    articles: { page: req.query ? req.query.page : 1, perPage: 5 },
    settings: { locale: req.locale },
    slug: "blog-index"
  };

  res.tracker.mark('API', 'start');
  res.store.runSaga(blogServerWorker, sagaPayload).done.then(() => {
    res.render();
  });
};
