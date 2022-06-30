const catalogData = state => state.product.catalogProduct.current;

const recommendedDiamonds = state =>
  state.product.engagementProduct.suggestions.diamonds;

const recommendedEngagementRings = state =>
  state.product.engagementProduct.suggestions.engagement;

const youHaveSeenRings = state =>
  state.product.engagementProduct.youHaveSeen;

export default {
  catalogData,
  recommendedDiamonds,
  recommendedEngagementRings,
  youHaveSeenRings
};
