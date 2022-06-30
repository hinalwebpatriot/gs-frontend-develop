import React from "react";
import { staticPageServerWorker } from "../../../src/components/Static/StaticPageActions";
import routing from "../../../src/config/routing";
import { getStaticPage } from "../../../src/components/_selectors/staticPagesSelectors";
import getUrlParamsString from "../../utils/getUrlParamsString";

export default (req, res, next) => {
  console.log('staticPageController');
  let page;
  let withEndSlash = req.url.substr(-1) === '/';
  let correctUrl = withEndSlash ? req.url.substr(0, -1) : req.url;

  console.log('staticPageController currentUrl = '  + correctUrl);

  switch (correctUrl) {
    case routing().faq:
      page = "faq";
      break;
    case routing().contactUs:
      page = "contact-us";
      break;
    default:
      page = req.params.page;
  }

  if (!page) {
    console.log('staticPageController next page not found');
    next();
  } else {
      console.log('staticPageController break 2 (' + page + ')');

      const sagaPayload = {
          settings: { locale: req.locale },
          slug: page
      };

      res.tracker.mark("API", "start");
      res.store
          .runSaga(staticPageServerWorker, sagaPayload)
          .done.then(() => {
          const data = getStaticPage(res.store.getState(), page);
          if (page !== "contact-us" && page !== "faq" && data.isError) {
              console.log('staticPageController runSaga done');
              next();
          } else {
              let canonicalUrl;
              console.log('staticPageController break 3');

              switch (page) {
                  case "faq":
                      canonicalUrl = routing().faq;
                      break;
                  case "contact-us":
                      canonicalUrl = routing().contactUs;
                      break;
                  default:
                      canonicalUrl = routing(data.data.code).staticPage;
              }

              console.log('canonicalUrl = ' + canonicalUrl);

              if (canonicalUrl !== '/:page') {
                  console.log('staticPageController correct canonicalUrl');
                  const canonicalWithParams = canonicalUrl + getUrlParamsString(req.query);
                  req.canonicalUrl = canonicalUrl;

                  if (req.url !== canonicalWithParams) {
                      console.log('staticPageController redirect to canonical');
                      res.redirect(301, canonicalWithParams);
                  } else {
                      console.log('staticPageController sendFirstChunk');
                      if (!withEndSlash) {
                          res.sendFirstChunk();
                          res.render();
                      } else {
                          console.log('staticPageController redirect to correctUrl');
                          res.redirect(301, correctUrl);
                      }
                  }
              } else {
                  console.log('staticPageController break 4');
                  next();
              }
          }
      })
          .catch(e => {
              console.log('staticPageController catch');
              next();
          });
  }


};
