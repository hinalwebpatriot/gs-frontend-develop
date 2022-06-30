import { createSelector } from "reselect";

const quickStatus = state => state.search.quick.status;
const quickBlogData = state => state.search.quick.blog;
const quickProductsData = state => state.search.quick.products;
// noinspection RedundantConditionalExpressionJS
const quickHaveResults = createSelector(
  [quickBlogData, quickProductsData],
  (blog, products) => (blog.length || products.length ? true : false)
);

const query = state => state.search.query;
const quickQuery = state => state.search.quickQuery;

const tabStatus = state => state.search.count.status;

const tabDiamondCount = state => state.search.count.diamond;
const tabEngagementCount = state => state.search.count.engagement;
const tabWeddingCount = state => state.search.count.wedding;
const tabBlogCount = state => state.search.count.blog;
const tabPendantCount = state => state.search.count.pendant;
const tabEarringsCount = state => state.search.count.earrings;
const tabBraceletsCount = state => state.search.count.bracelets;

const tabCount = createSelector(
  [tabDiamondCount, tabEngagementCount, tabWeddingCount, tabBlogCount, tabPendantCount, tabEarringsCount, tabBraceletsCount],
  (diamond, engagement, wedding, blog, pendant, earrings, bracelets) => ({
    diamond,
    engagement,
    wedding,
    blog,
      pendant,
      earrings,
      bracelets,
  })
);

const tabWithMaxCount = createSelector(
  tabCount,
  tabs => Object.keys(tabs).reduce((acc, key) => (+tabs[key] > +tabs[acc] ? key : acc))
);

const totalResults = createSelector(
  [tabDiamondCount, tabEngagementCount, tabWeddingCount, tabBlogCount, tabBraceletsCount, tabEarringsCount, tabPendantCount],
  (...count) => count.reduce((acc, value) => parseInt(acc) + parseInt(value))
);

const detailsTab = (state, tab) => state.search.details[tab];

export default {
  quickStatus,
  quickBlogData,
  quickProductsData,
  quickHaveResults,
  quickQuery,

  query,
  tabStatus,
  tabCount,
  tabWithMaxCount,
  totalResults,
  detailsTab
};
