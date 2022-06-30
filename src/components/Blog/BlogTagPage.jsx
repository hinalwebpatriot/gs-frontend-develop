import React from "react";
import BlogTags from "./Items/BlogTags";
import BlogArticlesListByTagContainer from "./Items/BlogArticlesListByTagContainer";
import Breadcrumbs from "../_common/Breadcrumbs/Breadcrumbs";
import routing from "../../config/routing";
import MetaTags from "../_common/SEO/MetaTags";
import { dataLayerPush } from '../../utils/dataLayer';

export default class BlogTagPage extends React.Component {
  componentDidMount() {
    dataLayerPush({
      'dynx_itemid': '',
      'dynx_totalvalue': '',
      'dynx_pagetype': 'other'
    });
  }
  render() {
    let bread = this.props.match.params.slug.trim();
    bread = bread[0].toUpperCase() + bread.slice(1);
    bread = bread.replace(/-|_/ig, ' ');
    return (
      <main>
        <section className="section-b-main">
          <div className="container">
            <MetaTags page={bread} />
            <Breadcrumbs
              marks={[
                { title: "Blog", path: routing().blog },
                { title: `${bread}` }
              ]}
            />
            <div className="blog-name">GS Diamonds Blog</div>
            <BlogTags />
          </div>
          <BlogArticlesListByTagContainer {...this.props} />
        </section>
      </main>
    );
  }
}
