import React from "react";
// import sanitizeHtml from "sanitize-html";
import { connect } from "react-redux";
import { seoTextBlockSelector } from "../../_selectors/metaTagsSelectors";
import createMetaSlug from "../../../utils/createMetaSlug";
import { fetchSeoTextBlock } from "./SeoActions";
import { removeFragmentTags } from '../../../utils/htmlRegex';

// const allowedTags = sanitizeHtml.defaults.allowedTags.filter( item => item !== 'div');

class SeoTextBlock extends React.Component {
  // state = {
  //   isClient: false
  // };

  componentDidMount() {
    this.fetchData();
    // this.setState({
    //   isClient: true
    // });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.metaSlug !== this.props.metaSlug) {
      this.fetchData();
    }
  }

  fetchData = () => {
    // if (!Object.keys(this.props.data).length) {
     if (this.props.data === null) {
      this.props.fetchSeoTextBlock(this.props.metaSlug);
    }
  };

  render() {
    const { data } = this.props;

    if (data === null || !Object.keys(data).length) return null;

    // const cleanHtml = sanitizeHtml(data.description, {
    //   allowedTags: allowedTags
    // });
    //
    // const paragraphs = cleanHtml.split('<br />').filter(str => str.length !== 0);

    //const cleanHtml = data.description.replace(removeFragmentTags, '');

    //const paragraphs = cleanHtml.split("<br>").filter(p => p.length !== 0);
    const hasImg = data && data.img ? true : false;
   
    return (
      <section className="main-section">
        <div className="container">
          <div className="row">
            <div className={`${hasImg ? 'col-lg-9' : 'col-lg-12'}`}>
              <h2 className="section-title section-title--type2">{data.title}</h2>
              <div className="editable-content">
                  <div className="info-s-text" dangerouslySetInnerHTML={{__html: data.description}}></div>        
              </div>

              {/*{isClient ? (*/}
                {/*<div*/}
                  {/*className="seo-text"*/}
                  {/*dangerouslySetInnerHTML={{ __html: cleanHtml }}*/}
                {/*/>*/}
              {/*) : (*/}
                {/*<div className="seo-text">{cleanHtml}</div>*/}
              {/*)}*/}
              {/*<div*/}
              {/*className="seo-text"*/}
              {/*dangerouslySetInnerHTML={{ __html: cleanHtml }}*/}
              {/*/>*/}
            </div>
            {hasImg &&
              <div className="col-lg-3">
                <div className="info-s-img">
                  <img src={data.image} alt="" />
                </div>
              </div>
            }
          </div>
        </div>
      </section>
    );
  }
}

const mapStateToProps = (state, props) => {
  const { page, params } = props;
  const metaSlug = createMetaSlug(page, params);

  return {
    data: seoTextBlockSelector(state, metaSlug),
    metaSlug: metaSlug
  };
};

export default connect(
  mapStateToProps,
  { fetchSeoTextBlock }
)(SeoTextBlock);
