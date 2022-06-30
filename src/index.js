import React from "react";
import ReactDOM from "react-dom";
import Cookies from "js-cookie";
import api from "./config/api";
import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";
import { Provider } from "react-redux";
import { HelmetProvider } from "react-helmet-async";
import createSagaMiddleware from "redux-saga";
import interceptors from "./config/axiosInterceptors";
import rootReducer from "./components/rootReducer";
import rootSaga from "./components/rootSaga";
import App from "./components/App";
import reHydrateStore from "./config/reHydrateStore";
import AppWrapper from "./components/Wrapper/AppWrapper";
import AdvancedRouter from "./components/Wrapper/AdvancedRouter";
import { insertHubspotChat } from "./config/hubspot";
import config from "./config/client.config";
// import thunk from 'redux-thunk';

import "antd/es/slider/style/css";
import "antd/es/tooltip/style/css";
import "react-image-lightbox/style.css";
import "react-s-alert/dist/s-alert-default.css";
import "react-s-alert/dist/s-alert-css-effects/scale.css";
import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
import "./scss/secondary.scss";
import "./scss/main.scss";
import "./scss/blog.css"; //Denis styles

const sagaMiddleware = createSagaMiddleware({
  context: { api }
});

const store = createStore(
  rootReducer,
  reHydrateStore(),
  composeWithDevTools(applyMiddleware(sagaMiddleware)) //, reduxSettingsMiddleware
);

sagaMiddleware.run(rootSaga);

interceptors.init(store);

if (config.isProduction) {
  setTimeout(() => {
    if (!window.HubSpotConversations) {
      insertHubspotChat();
    }
  }, 25000);
}
const root = document.getElementById("root");

const isGoogleCache = document.location.host === 'webcache.googleusercontent.com';
const cookie = Cookies.get('gs_city', { path: '/' });
let city = '';
const cities = ['brisbane', 'melbourne', 'perth', 'adelaide', 'canberra'];

if (cookie) {
  city = cookie;
} else {
  const cityFromUrl = window.location.pathname.split('/')[1];
  city = cities.includes(cityFromUrl) ? cityFromUrl : 'sydney';
}

if (isGoogleCache) {
  city = cities.find(x => window.location.href.includes(x)) || 'sydney';
}

const Application = (
  <HelmetProvider>
    <Provider store={store}>
      <AdvancedRouter>
        <AppWrapper>
          <App city={city} />
        </AppWrapper>
      </AdvancedRouter>
    </Provider>
  </HelmetProvider>
);

const render = () => {
  ReactDOM.render(Application, root);
};

const hydrate = () => {
  ReactDOM.hydrate(Application, root);
};

render();