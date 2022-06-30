import React from "react";
import BlogTags from "./Items/BlogTags";
import ArticleContainer from "./Article/ArticleContainer";
import BlogRelatedArticles from "./Items/BlogRelatedArticles";
import routing from "../../config/routing";
import Breadcrumbs from "../_common/Breadcrumbs/Breadcrumbs";
import selectors from "../_selectors/blogSelectors";
import { connect } from "react-redux";
import { get } from "lodash";
import { dataLayerPush } from '../../utils/dataLayer';

class BlogArticlePage extends React.Component {
  componentDidMount() {
    dataLayerPush({
      'dynx_itemid': '',
      'dynx_totalvalue': '',
      'dynx_pagetype': 'other'
    });
  }
  render() {
    const h1 = get(this.props.data.data, "title", "Article");
    return (
      <main>
        <section className="section-b-main">
          <div className="container">
            <Breadcrumbs
              marks={[{ title: "Blog", path: routing().blog }, { title: h1 }]}
            />
            <div className="blog-name">GS Diamonds Blog</div>
            <BlogTags />
          </div>
          <ArticleContainer {...this.props} />
          <BlogRelatedArticles {...this.props} />
        </section>
      </main>
    );
  }
}

const mapStateToProps = state => ({
  data: selectors.getArticle(state)
});

export default connect(mapStateToProps)(BlogArticlePage);
