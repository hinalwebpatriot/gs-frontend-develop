import React from "react";
import { Helmet } from "react-helmet-async";
import { connect } from "react-redux";
import { metaTagsSelector } from "../../_selectors/metaTagsSelectors";
import { fetchMetaTags } from "./SeoActions";
import { linkGenerator } from "../../../config/routing";
import { flowRight as compose } from "lodash";
import { withRouter } from 'react-router-dom';
import removeSsrCanonical from "../../../utils/removeSsrCanonical";
import { getMetaProductDescription } from "../../../utils/getMetaProductDescription";

class MetaProductTags extends React.Component {
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
    const { meta, h1 = '', h2 = '', type, metaImage } = this.props;
    const pathname = this.props.history.location.pathname;
    const ogImgCheck = pathname.includes('-rings');
    const ogImgUrl = metaImage || (ogImgCheck
      ? 'https://gsdiamonds-media-sydney.s3.ap-southeast-2.amazonaws.com/shapes/Round/I.png'
      : 'https://gsdiamonds-media-sydney.s3.amazonaws.com/banner/160942/Round.jpg');

    const description = getMetaProductDescription({ meta, type, h1, h2 })

    if (meta && (meta.title || meta.keywords)) {
      return (
        <Helmet>
          {meta.title && <title>{meta.title}</title>}
          {meta.title && <meta property="og:title" content={meta.title} />}
          <meta name="description" content={description} />
          <meta property="og:description" content={description} />
          <link rel="canonical" href={`https://www.gsdiamonds.com.au${this.props.history.location.pathname}`} />
          <meta property="og:url" content={`https://www.gsdiamonds.com.au${this.props.history.location.pathname}`} />
          <meta property="og:type" content="website" />
          <meta property="og:image" content={ogImgUrl} />
          {meta.keywords && <meta name="keywords" content={meta.keywords} />}
        </Helmet>
      );
    } else {
      return (
        <Helmet>
          <title>{`${h1 || 'Ring'} ${h2 || ''} | GS Diamonds`}</title>
          <meta property="og:title" content={`${h1 || 'Ring'} ${h2 || ''} | GS Diamonds`} />
          <meta name="description" content={description} />
          <meta property="og:description" content={description} />
          <link rel="canonical" href={`https://www.gsdiamonds.com.au${this.props.history.location.pathname}`} />
          <meta property="og:url" content={`https://www.gsdiamonds.com.au${this.props.history.location.pathname}`} />
          <meta property="og:type" content="website" />
          <meta property="og:image" content={ogImgUrl} />
        </Helmet>
      );
    }
  }
}

const mapStateToProps = (state, props) => {
  const { slug, id, h1 = '', h2 = '', type} = props;
  const metaSlug = linkGenerator.engagementRing({ slug, id }).toLowerCase(); //the same as wedding
  return {
    meta: metaTagsSelector(state, metaSlug),
    h1: h1,
    h2: h2,
    metaSlug: metaSlug,
    type: type,
    metaImage: state.seo.metaImage
  };
};

export default compose(
  withRouter,
  connect(
    mapStateToProps,
    { fetchMetaTags }
  )
)(MetaProductTags);
