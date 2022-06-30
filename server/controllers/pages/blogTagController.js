import React from "react";
import { blogTagServerWorker } from "../../../src/components/Blog/BlogActions";
import routing from '../../../src/config/routing';
import hasUpperCaseLetter from "../../utils/hasUpperCaseLetter";

export default (req, res) => {
  console.log('blogTagController');
  
  const sagaPayload = {
    category: {
      slug: req.params.slug,
      page: req.query ? req.query.page : 1,
      perPage: 5
    },
    settings: {
      locale: req.locale
    }
  };

  res.tracker.mark('API', 'start');
  res.store.runSaga(blogTagServerWorker, sagaPayload).done.then(() => {
    if (hasUpperCaseLetter(req.path)) {
      res.redirect(301, req.path.toLowerCase());
      return;
    }
    req.canonicalUrl = routing(req.params.slug.toLowerCase()).blogTag;
    res.sendFirstChunk();
    res.render();
  });
};
