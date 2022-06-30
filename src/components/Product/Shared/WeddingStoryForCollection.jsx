import React from "react";
import YouTubeLazyLoad from '../../_common/YouTube/YouTubeLazyLoad';


export default class WeddingStoryForCollection extends React.Component {
  render() {
    if (!this.props.data) return null;
    const { story } = this.props.data;

    if (story === null) return null;
    return (
      <div className="row">
        <div className="col-lg-9" style={{ marginBottom: "30px" }}>
          <div className="guide guide--type2">
            <div className="guide-header d-flex align-items-center justify-content-between">
              <p className="guide-header__title">{story.title}</p>
            </div>
            <YouTubeLazyLoad
              videoId={story.video}
              containerClassName="guide__video"
              videoSettings="WEDDING_SECOND_VIDEO"
            />
            <div className="guide__text">
              <p className="">{story.text}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
