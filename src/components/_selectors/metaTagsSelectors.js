import { get } from "lodash";

export const metaTagsSelector = (state, slug) =>
  get(state, `seo.meta[${slug}]`, null);
export const seoTextBlockSelector = (state, slug) =>
  get(state, `seo.textBlock[${slug}]`, null);
