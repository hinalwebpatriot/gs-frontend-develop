import React from "react";
import ArticleMainWrapper from "./ArticleMainWrapper";
import ArticleFragment from "./ArticleFragment";

export default class Article extends React.Component {
  render() {
    const { data, slug, seo } = this.props;

    const blocks = data.content.map(item => (
      <ArticleFragment item={item} key={`fragment_${item.id}_${data.id}`} />
    ));

    return (
      <ArticleMainWrapper data={data} slug={slug} seo={seo} >
        {blocks}
      </ArticleMainWrapper>
    );
  }
}
