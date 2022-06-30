import React from "react";
import BlogTags from "./Items/BlogTags";
import BlogMainBlock from "./Items/BlogMainBlock";
import BlogArticlesListContainer from "./Items/BlogArticlesListContainer";
import Breadcrumbs from "../_common/Breadcrumbs/Breadcrumbs";
import MetaTags from "../_common/SEO/MetaTags";
import { dataLayerPush } from '../../utils/dataLayer';

export default class BlogPage extends React.Component {
  componentDidMount() {
    dataLayerPush({
      'dynx_itemid': '',
      'dynx_totalvalue': '',
      'dynx_pagetype': 'other'
    });
  }
  render() {
    return (
      <main>
        <MetaTags page="blog-index" h1="Blog" />
        <section className="section-b-main">
          <div className="container">
            <Breadcrumbs marks={[{ title: "Blog" }]} />
            <div className="blog-name">GS Diamonds Blog</div>
            <BlogTags />
          </div>
          <BlogMainBlock push={this.props.history.push} />

          <BlogArticlesListContainer />
        </section>
      </main>
    );
  }
}
