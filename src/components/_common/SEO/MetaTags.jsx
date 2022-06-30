import React from "react";
import { Helmet } from "react-helmet-async";
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import { flowRight as compose } from "lodash";
import { metaTagsSelector } from "../../_selectors/metaTagsSelectors";
import createMetaSlug from "../../../utils/createMetaSlug";
import { fetchMetaTags } from "./SeoActions";
import changePathnameForCanonical from "../../../utils/changePathnameForCanonical";
import removeSsrCanonical from "../../../utils/removeSsrCanonical";
import { citySelector } from "../../_selectors/citySelectors";

const getPaginationPath = (pathname, pageNumber) => {
  const pathArr = pathname.split('/')
  const pageParamIndex = pathArr.findIndex((el) => el.includes('page-'));
  if (pageParamIndex === -1) {
    pathArr[pathArr.length - 1] = 'page-2';
  } else if(pageNumber === 1) {
    pathArr[pageParamIndex] = '';
  }
  else {
    pathArr[pageParamIndex] = `page-${pageNumber}`;
  }
  return pathArr.join('/')
}

class MetaTags extends React.Component {
  componentDidMount() {
    this.fetchData();
    setTimeout(removeSsrCanonical, 0);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.metaSlug !== this.props.metaSlug) {
      this.fetchData();
    }
  }

  fetchData = () => {
    if (!this.props.meta) {
      this.props.fetchMetaTags(this.props.metaSlug);
    }
  };

  render() {
    const { meta, h1 = '', description = '', metaImage, pagination, match } = this.props;
    const pathname = this.props.history.location.pathname;
    let seoDescription = (meta && meta.description) ? meta.description : description;
    const ogImgCheck = pathname.includes('-rings');
    let ogImgUrl = ogImgCheck
      ? 'https://gsdiamonds-media-sydney.s3.ap-southeast-2.amazonaws.com/shapes/Round/I.png'
      : 'https://gsdiamonds-media-sydney.s3.amazonaws.com/banner/160942/Round.jpg';
    
    if (metaImage) ogImgUrl = metaImage;
    if (meta && (meta.title || meta.description || meta.keywords)) {
      let title = meta.title;
      if (match.params.pageNumber && match.params.pageNumber > 1) {
        title = `${title} - Page ${match.params.pageNumber}`;
        seoDescription = `${seoDescription} - Page ${match.params.pageNumber}`
      }
      return (
        <Helmet>
          {meta.title && <title>{title}</title>}
          {meta.title && <meta property="og:title" content={title} />}
          <meta name="description" content={seoDescription} />
          <meta name="og:description" content={seoDescription} />
          {(!pagination || pagination.currentPage === 1) && (
            <link rel="canonical" href={`https://www.gsdiamonds.com.au${changePathnameForCanonical(pathname)}`} />
          )}
          {pagination && pagination.currentPage !== 1 && <link rel="prev" href={`${getPaginationPath(pathname, pagination.currentPage - 1)}`} />}
          {pagination && pagination.currentPage !== pagination.lastPage && <link rel="next" href={`${getPaginationPath(pathname, pagination.currentPage + 1)}`} />}
          <meta property="og:url" content={`https://www.gsdiamonds.com.au${this.props.history.location.pathname}`} />
          <meta property="og:type" content="website" />
          <meta property="og:image" content={ogImgUrl} />
          {meta.keywords && <meta name="keywords" content={meta.keywords} />}
        </Helmet>
      );
    } else {
      let title = `${h1} | GS Diamonds`;
      if (match.params.pageNumber && match.params.pageNumber > 1) {
        title = `${title} - Page ${match.params.pageNumber}`;
        seoDescription = `${seoDescription} - Page ${match.params.pageNumber}`
      }
      
      return (
        <Helmet>
          {h1 && <title>{title}</title>}
          <meta property="og:title" content={title} />
          <meta property="og:url" content={`https://www.gsdiamonds.com.au${this.props.history.location.pathname}`} />
          <meta name="description" content={seoDescription} />
          <meta name="og:description" content={seoDescription} />
          {(!pagination || pagination.currentPage === 1) && (
            <link rel="canonical" href={`https://www.gsdiamonds.com.au${changePathnameForCanonical(pathname)}`} />
          )}
          {pagination && pagination.currentPage !== 1 && <link rel="prev" href={`${getPaginationPath(pathname, pagination.currentPage - 1)}`} />}
          {pagination && pagination.currentPage !== pagination.lastPage && <link rel="next" href={`${getPaginationPath(pathname, pagination.currentPage + 1)}`} />}
          <meta property="og:type" content="website" />
          <meta property="og:image" content={ogImgUrl} />
        </Helmet>
      )
    }

  }
}

const mapStateToProps = (state, props) => {
  const { page, params, h1 } = props;
  const metaSlug = createMetaSlug(page, params); 
  return {
    h1: h1,
    meta: metaTagsSelector(state, metaSlug),
    metaSlug: metaSlug,
    metaImage: state.seo.metaImage,
    city: citySelector(state)
  };
};

export default compose(
  withRouter,
  connect(
    mapStateToProps,
    { fetchMetaTags }
  )
)(MetaTags);


// export default connect(
//   mapStateToProps,
//   { fetchMetaTags }
// )(MetaTags);
