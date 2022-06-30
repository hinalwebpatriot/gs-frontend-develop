import { initServerApp } from "../../../src/components/rootSaga";

const cities = ['brisbane', 'melbourne', 'perth', 'adelaide', 'canberra'];

export default (req, res) => {
  console.log('notFoundPageController');
  const url = req.url.split('/');
  const isCityPage = cities.includes(url[1]);
  if (isCityPage) {
    const newUrl = url.filter(x => x !== url[1]).join('/')
    res.redirect(newUrl);
  }
  res.status(404);
  res.sendFirstChunk();

  const settings = {
    locale: req.locale
  };

  res.tracker.mark('API', 'start');
  res.store.runSaga(initServerApp, settings).done.then(() => {
    res.render();
  });
};
