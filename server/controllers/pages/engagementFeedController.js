import { findEngagementFilterByName } from "../../../src/utils/findFilterByName";
import {
  setEngagementStyle,
  setEngagementMetal,
  setEngagementShape,
  setEngagementOffers,
  engagementFeedServerWorker,
  setEngagementGender,
  setEngagementPrice
} from "../../../src/components/Feed/Engagement/EngagementFeedActions";
import routing from '../../../src/config/routing';
import getUrlParamsString from '../../utils/getUrlParamsString';
import hasUpperCaseLetter from "../../utils/hasUpperCaseLetter";

export default (req, res) => {
  console.log('engagementFeedController');
  if (req.params.filter) {
    let { type, slug } = findEngagementFilterByName(req.params.filter);
    slug = slug && typeof slug === 'string' ? slug.toLowerCase() : slug;
    const { dispatch } = res.store;

    switch (type) {
      case "style":
        dispatch(setEngagementStyle(slug));
        break;
      case "metal":
        dispatch(setEngagementMetal(slug));
        break;
      case "shape":
        dispatch(setEngagementShape(slug));
        break;
      case "gender":
        dispatch(setEngagementGender(slug));
        break;
      case 'offers':
        dispatch(setEngagementOffers(slug));
      case 'price-under':
        dispatch(setEngagementPrice({ value: slug }));
    }

    if (hasUpperCaseLetter(req.path)) {
      res.redirect(301, req.path.toLowerCase());
    }

    if (!type) {
      res.redirect(301, routing().engagementFeed + getUrlParamsString(req.query));
      return
    }

    req.canonicalUrl = routing(req.params.filter, req.city).engagementFeedWithFilter;
  }

  res.sendFirstChunk();


  const sagaPayload = {
    seo: {
      page: "engagement-rings",
      filter: req.params.filter
    },
    feed: {
      page: req.params.pageNumber || 1,
      perPage: 24
    },
    settings: {
      locale: req.locale
    }
  };

  res.tracker.mark('API', 'start');
  res.store.runSaga(engagementFeedServerWorker, sagaPayload).done.then(() => {
    res.render();
  });
};
