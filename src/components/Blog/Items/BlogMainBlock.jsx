import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import routing from "../../../config/routing";
import BlogArticleCol from "./BlogArticleCol";
import { connect } from "react-redux";
import selectors from "../../_selectors/blogSelectors";
import { fetchTopArticles } from "../BlogActions";

class BlogMainBlock extends React.Component {
  componentDidMount() {
    if (!this.props.data.isFetched) {
      this.props.fetchData();
    }
  }

  componentWillUnmount() {
    this.props.clearState();
  }

  render() {
    const { main, list, isFetched, isError } = this.props.data;

    if (isError) {
      return null;
    }

    if (!isFetched) {
      return null;
    }

    const articlesList = list.map(article => (
      <BlogArticleCol
        title={article.title}
        text={article.preview_text}
        slug={article.slug}
        image={article.image}
        date={article.date}
        key={`article_${article.id}`}
      />
    ));

    return (
      <Fragment>
        <div className="container">
          <div className="blog-banner">
            <div className="blog-banner__post">
              <h3>
              <Link
                className=""
                to={routing(main.slug).blogArticle}
              >{main.title}</Link>
                </h3>
              <p className="blog-banner__text">{main.preview_text}</p>
              <Link
                className="blog-readmore-link"
                to={routing(main.slug).blogArticle}
              >
                Read more
              </Link>
              {/*<span className="blog-date">*/}
                {/*{mom!ent.unix(main.date).format("D MMM YYYY")}*/}
              {/*</span>*/}
            </div>

            <div
              className="blog-banner__figure"
              style={{
                backgroundImage: `url(${main.image})`,
                cursor: "pointer"
              }}
              onClick={() => this.props.push(routing(main.slug).blogArticle)}
            />
          </div>
        </div>
        <div className="container">
          <div className="row">{articlesList}</div>
          <div className="blog-divider" />
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  data: selectors.getTop(state)
});

const clearState = fetchTopArticles.fulfill;

const mapDispatchToProps = {
  fetchData: fetchTopArticles,
  clearState
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BlogMainBlock);
