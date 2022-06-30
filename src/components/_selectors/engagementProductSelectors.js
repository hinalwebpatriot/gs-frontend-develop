const ringData = state => state.product.engagementProduct.current;

const recommendedDiamonds = state =>
  state.product.engagementProduct.suggestions.diamonds;

const recommendedEngagementRings = state =>
  state.product.engagementProduct.suggestions.engagement;

const youHaveSeenRings = state =>
  state.product.engagementProduct.youHaveSeen;

export default {
  ringData,
  recommendedDiamonds,
  recommendedEngagementRings,
  youHaveSeenRings
};
