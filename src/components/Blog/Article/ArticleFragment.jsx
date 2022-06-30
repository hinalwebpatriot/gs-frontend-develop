import React, { Fragment } from "react";
// import sanitizeHtml from "sanitize-html";
import YouTubeLazyLoad from "../../_common/YouTube/YouTubeLazyLoad";
import { removeFragmentTags } from '../../../utils/htmlRegex';

// const allowedTags = sanitizeHtml.defaults.allowedTags.filter(
//   tag => tag !== "div"
// );

export default class ArticleFragment extends React.Component {
  state = {
    isClient: false
  };

  componentDidMount() {
    this.setState({
      isClient: true
    });
  }

  render() {
    const { isClient } = this.state;
    const { title, text, video, image } = this.props.item;

    // const cleanHtml = sanitizeHtml(text, {
    //   allowedTags: allowedTags
    // });
    //

    const cleanHtml = text.replace(removeFragmentTags, '');

    // const paragraphs = cleanHtml.split("<br />");
    const paragraphs = cleanHtml.split("<br>").filter(p => p.length !== 0);

    return (
      <Fragment>
        <h2 className="blog-title text-center">{title}</h2>
        <div className="editable-content">
          {isClient
            ? paragraphs.map((par, index) => (
                <p
                  className="bl-detail__text"
                  dangerouslySetInnerHTML={{ __html: par }}
                  key={index + par.slice(5)}
                />
              ))
            : paragraphs.map((par, index) => (
                <p className="bl-detail__text" key={index + par.slice(5)}>
                  {par}
                </p>
              ))}
        </div>
        {/*<p className="bl-detail__text" dangerouslySetInnerHTML={{ __html: cleanHtml }} />*/}
        {image && (
          <div className="bl-detail__figure">
            <img src={image} alt="article fragment" />
          </div>
        )}
        {video && (
          <YouTubeLazyLoad containerClassName="blog-video" videoId={video} />
          //1nuP63QOV6Q
          // <div className="blog-video">
          //   <iframe
          //     width="560"
          //     height="315"
          //     src="//www.youtube.com/embed/iO6kEok2uMI"
          //     frameBorder="0"
          //     allowFullScreen=""
          //   />
          // </div>
        )}
      </Fragment>
    );
  }
}
