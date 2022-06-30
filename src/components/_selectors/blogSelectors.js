const getArticlesList = state => state.blog.articlesList;
const getArticlesByTagList = state => state.blog.articlesByTagList;
const getArticle = state => state.blog.article;
const getTags = state => state.blog.tags;
const getRelated = state => state.blog.related;
const getTop = state => state.blog.top;
const getSeo = (state, slug) => state.seo.meta[slug]

export default {
  getArticle,
  getArticlesList,
  getArticlesByTagList,
  getTags,
  getRelated,
  getTop,
  getSeo
};
