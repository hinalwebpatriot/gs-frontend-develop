import React from "react";
import { blogArticleServerWorker } from "../../../src/components/Blog/BlogActions";
import selectors from '../../../src/components/_selectors/blogSelectors';
import routing from '../../../src/config/routing';
import getUrlParamsString from '../../utils/getUrlParamsString';
import hasUpperCaseLetter from "../../utils/hasUpperCaseLetter";

export default (req, res) => {
  console.log('blogArticleController');
  const sagaPayload = {
    article: req.params.slug,
    settings: {
      locale: req.locale
    }
  };

  res.tracker.mark('API', 'start');
  res.store.runSaga(blogArticleServerWorker, sagaPayload).done.then(() => {
    const article = selectors.getArticle(res.store.getState());

    if (article.isError) {
      res.redirect(routing().notFound);
      return;
    }

    const canonicalUrl = routing(article.data.slug).blogArticle;
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
  });
};
