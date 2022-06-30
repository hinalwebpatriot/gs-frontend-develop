import React from "react";
import { Link } from "react-router-dom";
import routing from "../../../config/routing";
import selectors from "../../_selectors/blogSelectors";
import { fetchRelatedArticles } from "../BlogActions";
import { connect } from "react-redux";
import ImageLoader from '../../_common/ImageLoader';

class BlogRelatedArticles extends React.Component {
  componentDidMount() {
    if (!this.props.isFetched) {
      this.props.fetchData(this.props.match.params.slug);
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.match.params.slug !== this.props.match.params.slug) {
      this.props.fetchData(this.props.match.params.slug);
    }
  }

  componentWillUnmount() {
    this.props.clearState();
  }

  render() {
    const { isError, isFetched, data } = this.props.data;

    if (isError) {
      return null;
    }

    if (!isFetched) {
      return null;
    }

    const articles = data.map(item => (
      <div className="col-lg-4 col-md-6" key={`related_${item.slug}`}>
        <div className="altlisting-post">
          <div className="altlisting__figure">
            <ImageLoader src={item.image} alt="" />
          </div>
          <div className="altlisting-post__name">{item.title}</div>
          <p className="altlisting-post__text">{item.preview_text}</p>
          <div className="altlisting-post__readmore">
            <Link
              className="blog-readmore-link"
              to={routing(item.slug).blogArticle}
            >
              Read more
            </Link>
          </div>
        </div>
      </div>
    ));

    return (
      <div className="container">
        <div className="blog-title text-center">Related posts</div>
        <div className="row">{articles}</div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  data: selectors.getRelated(state)
});

const clearState = fetchRelatedArticles.fulfill;

const mapDispatchToProps = {
  fetchData: fetchRelatedArticles,
  clearState
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BlogRelatedArticles);
