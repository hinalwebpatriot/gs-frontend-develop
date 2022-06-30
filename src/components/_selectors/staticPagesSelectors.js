// import { get } from "lodash";

export const getStaticPage = (state, slug) => state.staticPages[slug] || null;

export const getSeoFromStaticPage = (state, slug) => state.seo.meta[slug] || null;
