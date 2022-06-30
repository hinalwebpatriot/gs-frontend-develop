import React from "react";
import { Link } from "react-router-dom";
import routing from "../../../config/routing";
import {
  FacebookShareButton,
  PinterestShareButton,
  TwitterShareButton
} from "react-share";
import eye from "../../../img/svg/eye.svg";
import { isServer } from "../../../utils/isServer";
import MetaBlogTags from "../../_common/SEO/MetaBlogTags";
import faFacebookF from "@fortawesome/fontawesome-free-brands/faFacebookF";
import faPinterestP from "@fortawesome/fontawesome-free-brands/faPinterestP";
import faTwitter from "@fortawesome/fontawesome-free-brands/faTwitter";

import IconFA from '../../_common/IconFA';

export default class ArticleMainWrapper extends React.Component {
  render() {
    const { children, slug, seo } = this.props;
    const {
      image,
      view_count,
      title,
      preview_text,
      category,
      // date
    } = this.props.data;

    const shareUrl = !isServer ? String(window.location) : "";

    return (
      <div className="container">
        <MetaBlogTags slug={slug} h1={title} description={preview_text} />
        <div className="bl-detail">
          <div
            className="bl-detail__figure fix-height justify-content-center d-flex"
            // style={{ maxHeight: "400px" }}
          >
            <img src={image} alt={seo && seo.title ? seo.title : title} style={{ objectFit: "contain" }} />
          </div>
          <div className="blog-main">
            <div className="row">
              <div className="col-lg-8 offset-lg-2">
                <div className="bl-detail-info">
                  {/*<div className="bl-detail-info__cell">*/}
                    {/*<img src={calendar} alt="" />*/}
                    {/*<span>{mom1ent.unix(date).fromNow()}</span>*/}
                  {/*</div>*/}
                  <div className="bl-detail-info__cell">
                    <img src={eye} alt="eye-icon" />
                    <span>{`${view_count} ${
                      view_count > 1 ? "Views" : "View"
                    }`}</span>
                  </div>
                </div>
                <h1 className="blog-title text-center">{title}</h1>
                <div className="blog-title-hash">
                  <Link to={routing(category.slug).blogTag}>
                    #{category.title}
                  </Link>
                </div>
                <p className="bl-detail__text">{preview_text}</p>
                {children}
                <div className="blog-footer">
                  <Link className="blog-back-link" to={routing().blog}>
                    Back to blog
                  </Link>
                  <div className="blog-socials">
                    {/*<GooglePlusShareButton url={shareUrl} >*/}
                    {/*<button type="button" className="blog-socials__link" style={{ backgroundColor: '#d34836' }}>*/}
                    {/*<i className="fab fa-google-plus-g" />*/}
                    {/*</button>*/}
                    {/*</GooglePlusShareButton>*/}

                    <PinterestShareButton
                      url={shareUrl}
                      media={image}
                      description={title}
                      style={{ marginLeft: "15px" }}
                    >
                      <button
                        type="button"
                        className="blog-socials__link"
                        style={{ backgroundColor: "#cd2029" }}
                      >
                        <IconFA icon={faPinterestP}/>
                      </button>
                    </PinterestShareButton>

                    <FacebookShareButton
                      quote={title}
                      hashtag={`#${category.title}`}
                      url={shareUrl}
                      style={{ marginLeft: "15px" }}
                    >
                      <button
                        type="button"
                        className="blog-socials__link"
                        style={{ backgroundColor: "#39589e" }}
                      >
                        <IconFA icon={faFacebookF}/>
                      </button>
                    </FacebookShareButton>

                    <TwitterShareButton
                      title={title}
                      hashtags={[category.title]}
                      url={shareUrl}
                      style={{ marginLeft: "15px" }}
                    >
                      <button
                        type="button"
                        className="blog-socials__link"
                        style={{ backgroundColor: "#429cd6" }}
                      >
                        <IconFA icon={faTwitter}/>
                      </button>
                    </TwitterShareButton>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
