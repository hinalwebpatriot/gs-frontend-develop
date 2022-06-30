import React, { Fragment } from "react";

import mediaLogo from "../../../img/svg/media_logo.svg";
import YouTubeLazyLoad from '../../_common/YouTube/YouTubeLazyLoad';
import ImageLoader from '../../_common/ImageLoader';

export default class ShoppingEasyBlock extends React.Component {
  state = {
    isExpanded: false
  };

  componentDidMount() {
    if (this.props.status !== 'success') {
      this.props.fetchData();
    }
  }

  handleExpand = () => {
    this.setState({ isExpanded: true });
  };

  render() {
    const { isExpanded } = this.state;
    const { data = {}, status } = this.props;

    if (status !== "success") return null;

    const { video_block, items_block } = data;

    if (status === "success" && (!video_block || !items_block)) return null;

    const items = items_block.items
      .slice(0, isExpanded ? undefined : 6)
      .map(item => (
        <div
          className="col-6 col-md-3 col-lg-2"
          key={`${item.title || item.image}_easy_shop`}
        >
          <div className="help-block">
            <div className="help-block__inner">
              <div className="help-icon">
                <ImageLoader src={item.image} alt="" />
              </div>
              <p className="help-title">{item.title}</p>
            </div>
          </div>
        </div>
      ));

    return (
      <Fragment>
        <section className="media-section media-section--type2">
          <div className="media-section__img">
            <ImageLoader src={mediaLogo} alt="" />
          </div>
          <div className="container">
            <div className="feed-video-box">
              <div className="row">
                <div className="col-lg-5 sm-order-2">
                  <p className="section-title section-title--type2">
                    {video_block.title}
                  </p>
                  <div className="feed-video-text">
                    <p>{video_block.subtitle}</p>
                    <span>{video_block.text}</span>
                    {/*<div className="feed-video-text__btn">*/}
                      {/*<a href={video_block.button_link}>*/}
                        {/*<button className="theme-btn theme-btn--bigger theme-btn--type2">*/}
                          {/*{video_block.button_text}*/}
                        {/*</button>*/}
                      {/*</a>*/}
                    {/*</div>*/}
                  </div>
                </div>
                <div className="col-lg-7">
                  <YouTubeLazyLoad
                    videoId={video_block.video_link}
                    containerClassName="feed-video"
                    title={video_block.title}
                    description={video_block.subtitle}
                    videoSettings="SHOPPING_VIDEO"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* <section className="options-section">
          <div className="container">
            <p className="section-title">{items_block.title}</p>
            <div className="benefit-row">
              <div className="row help-row">{items}</div>
            </div>
            {!isExpanded && items_block.items.length > 6 && (
              <div className="section-btn">
                <button className="theme-btn" onClick={this.handleExpand}>
                  More
                </button>
              </div>
            )}
          </div>
        </section> */}
      </Fragment>
    );
  }
}
