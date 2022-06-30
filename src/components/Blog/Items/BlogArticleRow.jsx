import React from "react";
import { Link } from "react-router-dom";
import routing from "../../../config/routing";
import ImageLoader from '../../_common/ImageLoader';

export default class BlogArticleRow extends React.Component {
  render() {
    const { image, title = '', text, slug } = this.props;
    return (
      <div className="bl-item">
        <div className="row">
          <div className="col-md-6">
            <Link className="bl-item__link" to={routing(slug).blogArticle}>
              <ImageLoader src={image} alt={`${title}`} />
            </Link>
          </div>
          <div className="col-md-6">
            <div className="bl-item__post">
              <h3><Link
                className=""
                to={routing(slug).blogArticle}
              >{title}  </Link></h3>
              <p>{text}</p>

              <Link
                className="blog-readmore-link"
                to={routing(slug).blogArticle}
              >
                Read more
              </Link>
              {/*<span className="blog-date">*/}
                {/*{mom!ent.unix(date).format("D MMM YYYY")}*/}
              {/*</span>*/}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
