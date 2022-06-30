import React from "react";
import { Link } from "react-router-dom";
import routing from "../../../config/routing";
import selectors from "../../_selectors/blogSelectors";
import { fetchCategories } from "../BlogActions";
import { connect } from "react-redux";

class BlogTags extends React.Component {
  componentDidMount() {
    if (this.props.data.length === 0) {
      this.props.fetchData();
    }
  }

  render() {
    const { data } = this.props;
    const tags = data.map(tag => (
      <Link
        to={routing(tag.slug).blogTag}
        key={`tag_${tag.id}`}
        className="blog-tag"
      >
        #{tag.title} <span>({tag.articles_count})</span>
      </Link>
    ));

    return <div className="blog-tags">{tags}</div>;
  }
}

const mapStateToProps = state => ({
  data: selectors.getTags(state)
});

const clearState = fetchCategories.fulfill;

const mapDispatchToProps = {
  fetchData: fetchCategories,
  clearState
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BlogTags);
