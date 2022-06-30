import React from "react";
// import selectors from "../../../src/components/_selectors/engagementProductSelectors";
// import { mainServerWorker } from "../../../src/components/Main/MainActions";
import { landingServerWorker } from "../../../src/components/Landing/LandingActions";
// import routing, { linkGenerator } from "../../../src/config/routing";
// import getUrlParamsString from '../../utils/getUrlParamsString';
import moment from "moment";

const cookieAge = 1000 * 60 * 60 * 24 * 30 * 6;

export default (req, res) => {

  console.log('landingPageController', req.params.slug);

  const sagaPayload = {
    settings: { locale: req.locale },
    page: req.params.slug
  };

  if (!Number(req.cookies["landing_page_watched_t"]) || !moment(req.cookies["landing_page_watched_t"], 'X').isValid()) {
    res.cookie("landing_page_watched_t", moment().unix() , {
      maxAge: cookieAge
    });
  };

  res.sendFirstChunk();

  res.tracker.mark('API', 'start');
  res.store.runSaga(landingServerWorker, sagaPayload).done.then(() => {
      res.render();
  });
};
