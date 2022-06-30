import {altMainServerWorker} from "../actions/MainPageAction";

export default (req, res, next) => {
  console.log('altMainPageController2');
  const sagaPayload = {
    settings: { locale: 'en' },
    page: "index"
  };
    console.log(sagaPayload);
  res.sendFirstChunk();

  res.tracker.mark('API', 'start');
  res.store.runSaga(altMainServerWorker, sagaPayload).done.then(() => {
    req.noIndexPage = true;

    res.render();
  });
};
