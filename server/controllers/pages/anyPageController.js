import React from "react";
import { initServerApp } from "../../../src/components/rootSaga";
import hasUpperCaseLetter from "../../utils/hasUpperCaseLetter";

export default (req, res) => {
  console.log('anyPageController');
  res.sendFirstChunk();


  const indexPages = ['/faq', '/contact-us', '/jewellery'];

  const settings = {
    locale: req.locale
  };

  if (req.url.includes('diamonds/product') && hasUpperCaseLetter(req.path)) {
    res.redirect(301, req.path.toLowerCase());
  }

  // if (req.url.includes('diamonds/product')) {
  //   req.noIndexPage = true;
  // }

  res.tracker.mark('API', 'start');
  res.store.runSaga(initServerApp, settings).done.then(() => {
    req.noIndexPage = !indexPages.includes(req.url);

    res.render();
  });
};