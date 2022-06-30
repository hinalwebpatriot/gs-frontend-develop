import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware, { END } from "redux-saga";
import rootReducer from "../../src/components/rootReducer";
import {
  setAcceptCookie,
  setMainPageWatchedStatus
} from "../../src/components/Main/MainActions";
import moment from 'moment'

export default (req, res, next) => {
  const sagaMiddleware = createSagaMiddleware({
    context: {
      api: res.api
    }
  });

  const store = createStore(rootReducer, {}, applyMiddleware(sagaMiddleware));

  store.runSaga = sagaMiddleware.run;
  store.close = () => store.dispatch(END);

  if (Number(req.cookies["main_page_watched_t"])) {
    const timeToDisplay = moment(req.cookies["main_page_watched_t"], 'X');

    if (timeToDisplay.isValid() && moment().diff(timeToDisplay, 'hours') >= 6) {
      store.dispatch(setMainPageWatchedStatus());
    }
  }

  if (Number(req.cookies["cookie-accepted"]) === 1) {
    store.dispatch(setAcceptCookie());
  }

  res.store = store;
  next();
};
