import React from "react";
// import sanitizeHtml from "sanitize-html";
import ImageLoader from '../../_common/ImageLoader';
import { removeAllTags } from '../../../utils/htmlRegex';

class ListBanner extends React.Component {
  // state = {
  //   isClient: false
  // };
  //
  // componentDidMount() {
  //   this.setState({
  //     isClient: true
  //   });
  // }

  render() {
    // const { isClient } = this.state;
    const { link, picture, text, classes = "" } = this.props;

    // const cleanHtml = sanitizeHtml(text, { allowedTags: !isClient ? false : []});
    const cleanHtml = text.replace(removeAllTags, '');

    if (link && picture) {
      return (
        <div className={`list-banner ${classes}`}>
          <a href={link} className="list-banner__link">
            <ImageLoader src={picture} alt="promo" className="list-banner__img" />
            <span className="list-banner__text">{cleanHtml}</span>
            {/*{isClient ? (*/}
              {/*<span className="list-banner__text"*/}
                {/*dangerouslySetInnerHTML={{ __html: cleanHtml }}*/}
              {/*/>*/}
            {/*) : (*/}
              {/*<span className="list-banner__text">{cleanHtml}</span>*/}
            {/*)}*/}
          </a>
        </div>
      );
    } else {
      return <div />;
    }
  }
}

export default ListBanner;
