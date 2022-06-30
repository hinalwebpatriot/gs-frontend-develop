import React, { Fragment } from "react";
import Breadcrumbs from "../_common/Breadcrumbs/Breadcrumbs";
// import sanitizeHtml from "sanitize-html";
import MetaTags from "../_common/SEO/MetaTags";
import RingSizeConverter from "../_common/RingSizeConverter";
import { Link } from "react-router-dom";

export default class StaticPage extends React.Component {
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
    const { slug, seo } = this.props;
    const { image, text, title } = this.props.data;
    const cleanHtml = text;
    const style = slug === 'new-collections' ? {height: "400px"} : null;
    const mainImg = image && <img src={image} style={style} alt={seo && seo.title ? seo.title : title}/>;
    return (
      <Fragment>
        <MetaTags page={slug} h1={title} />
        <Breadcrumbs marks={[{ title: title }]} />
        <div className="container">
          <div className="col-12">
            <h1 className="section-title text-center">{title}</h1>
            <div className="static-page-img" style={{ margin: "30px auto" }} >
              {slug === 'new-collections' 
                ? <Link to="search/results?q=petite">
                    {mainImg}
                  </Link>
                : mainImg
              }
            </div>
            {slug === 'ring-size' && (
              <RingSizeConverter />
            )}
            <div className="editable-content">
              {isClient ? (
                <p dangerouslySetInnerHTML={{ __html: cleanHtml }} />
              ) : (
                <p>{cleanHtml}</p>
              )}

              {/*<p dangerouslySetInnerHTML={{ __html: cleanHtml }} />*/}
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}
