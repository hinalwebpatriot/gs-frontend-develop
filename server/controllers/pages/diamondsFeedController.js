import React from "react";
import MobileDetect from "mobile-detect";
import {
  setDiamondsShape,
  setCaratFromUrl,
  diamondsFeedServerWorker
} from "../../../src/components/Feed/Diamonds/DiamondsFeedActions";
import { shapeFilter } from '../../../src/utils/findFilterByName';
import routing from '../../../src/config/routing';
import getUrlParamsString from '../../utils/getUrlParamsString';
import hasUpperCaseLetter from "../../utils/hasUpperCaseLetter";

export default (req, res) => {
  
  if (hasUpperCaseLetter(req.path)) {
    console.log('redirect');
    res.redirect(301, req.path.toLowerCase());
  }
  if (req.params.shape) {

    if (shapeFilter.includes(req.params.shape.toLowerCase()) || req.params.shape.slice(-6) === '-carat') {
      if (req.params.shape.slice(-6) === '-carat') {res.store.dispatch(setCaratFromUrl(req.params.shape.slice(0, -6).replace('-', '.')))}
      else res.store.dispatch(setDiamondsShape(req.params.shape.toLowerCase()));
      req.canonicalUrl = routing(req.params.shape, req.city).diamondsFeedWithShape;
      const canonicalWithParams = req.canonicalUrl + getUrlParamsString(req.query);

      if (req.url !== canonicalWithParams) {
        res.redirect(301, canonicalWithParams);
        return;
      }
    } else {
      res.redirect(301, routing().diamondsFeed + getUrlParamsString(req.query));
      return;
    }
  }

  res.sendFirstChunk();

  const sagaPayload = {
    seo: {
      page: "diamonds",
      filter: req.params.shape
    },
    feed: {
      page: 1,
      perPage: req.isMobile ? 25 : 50
    },
    settings: {
      locale: req.locale
    }
  };

  res.tracker.mark('API', 'start');
  res.store.runSaga(diamondsFeedServerWorker, sagaPayload).done.then(() => {
    res.render();
  });
};
