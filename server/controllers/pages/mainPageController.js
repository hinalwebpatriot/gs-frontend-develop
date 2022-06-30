import React from "react";
import moment from 'moment';
import {
  mainServerWorker,
  setMainPageWatchedStatus
} from "../../../src/components/Main/MainActions";

const cookieAge = 1000 * 60 * 60 * 24 * 30 * 6;

export default (req, res) => {
  console.log('mainPageController');
  const sagaPayload = {
    settings: { locale: req.locale },
    page: "index"
  };


  if (!Number(req.cookies["main_page_watched_t"]) || !moment(req.cookies["main_page_watched_t"], 'X').isValid()) {
    res.cookie("main_page_watched_t", moment().unix() , {
      maxAge: cookieAge
    });
  }

  res.sendFirstChunk();

  res.tracker.mark('API', 'start');
  res.store.runSaga(mainServerWorker, sagaPayload).done.then(() => {
    res.render();
  });
};
