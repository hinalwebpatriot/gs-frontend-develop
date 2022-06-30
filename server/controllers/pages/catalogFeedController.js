import { catalogFeedServerWorker, changeCatalogGenderTab, setCatalogMetal } from "../../../src/components/Feed/Catalog/CatalogFeedActions";
import hasUpperCaseLetter from "../../utils/hasUpperCaseLetter";
import routing from "../../../src/config/routing";
import { findCatalogFilterByName } from "../../../src/utils/findFilterByName";

const allowedCatalogs = ['pendant', 'cluster-rings', 'earrings', 'bracelets', 'eternity-rings']

function handleOneFilter({ filter, store, req }) {
  const { type, slug } = findCatalogFilterByName(filter);

  switch (type) {
    case "metal":
      store.dispatch(setCatalogMetal(slug));
      break;
    case "gender":
      store.dispatch(changeCatalogGenderTab(slug));
      break;
    default:
      req.isFilterInvalid = true;
      break;
  }
}

export default (req, res) => {
  console.log('catalogFeedController', req.params);

  const { catalog, filter } = req.params;

  if (hasUpperCaseLetter(req.path)) {
    res.redirect(301, req.path.toLowerCase());
    return;
  }

  if (!allowedCatalogs.includes(catalog)) {
    res.redirect(routing().notFound);
    return;
  }

  if (filter && (catalog === 'eternity-rings' || catalog === 'earrings' || catalog === 'bracelets')) {
    handleOneFilter({ filter, store: res.store, req });
    req.canonicalUrl = routing({ catalog, filter }, req.city).catalogFeedWithFilter;
  }

  res.sendFirstChunk();

  const sagaPayload = {
    seo: {
      page: catalog === 'cluster-rings' ? 'rings' : catalog,
      filter: req.params.filter
    },
    feed: {
      slug: catalog === 'cluster-rings' ? 'rings' : catalog,
      page: req.params.pageNumber || 1,
      perPage: 24
    },
    settings: {
      locale: req.locale
    }
  };

  res.tracker.mark('API', 'start');
  res.store.runSaga(catalogFeedServerWorker, sagaPayload).done.then(() => {
    res.render();
  });
};
