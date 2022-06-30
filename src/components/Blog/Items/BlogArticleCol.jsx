import React from "react";
import { Link } from "react-router-dom";
import routing from "../../../config/routing";
import ImageLoader from '../../_common/ImageLoader';

const style = {
    maxHeight: '180px',
    width: '290px',
    backgroundRepeat: 'no-repeat', 
    objectFit: 'cover',
    objectPosition: '0 0'
}

export default class BlogArticleCol extends React.Component {
  render() {
    const { image, title, text, slug } = this.props;
    return (
      <div className="col-lg-4 col-md-6">
        <div className="altlisting-post">
          <Link to={routing(slug).blogArticle}>
            <div className="altlisting__figure">
              <ImageLoader src={image} style={style} alt={`article ${title}`} />
            </div>
          </Link>
          <div className="altlisting-post__name">
          <Link className="" to={routing(slug).blogArticle}>
              {title}
            </Link>
          
            </div>
          <p className="altlisting-post__text">{text}</p>
          <div className="altlisting-post__readmore">
            <Link className="blog-readmore-link" to={routing(slug).blogArticle}>
              Read more
            </Link>
          </div>
          {/*<span className="blog-date">*/}
            {/*{mom!ent.unix(date).format("D MMM YYYY")}*/}
          {/*</span>*/}
        </div>
      </div>
    );
  }
}
