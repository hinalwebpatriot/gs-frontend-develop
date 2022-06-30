import React, { Fragment } from "react";
import { openHubspotChat } from "../../../config/hubspot";
import VideoHintSvg from "../../../img/jsSvg/VideoHintSvg";
import YouTubeLazyLoad from '../../_common/YouTube/YouTubeLazyLoad';

export default class GuideToChoose extends React.Component {
  findElement = (string) => {
    if (string.indexOf('diamond') !== -1) {
      return 'WEDDING_FIRST_VIDEO';
    } else if (string.indexOf('engagement') !== -1) {
      return 'ENGAGEMENT_FIRST_VIDEO';
    } else if (string.indexOf('wedding') !== -1) {
      return 'WEDDING_FIRST_VIDEO';
    } else {
      return 'ENGAGEMENT_FIRST_VIDEO';
    }
  };

  handleDownload = e => {
    e.preventDefault();
    const link = document.createElement("a");
    link.style.display = "none";
    link.setAttribute("href", this.props.data.file);
    link.setAttribute(
      "download",
      `${this.props.data.text.replace(/ /g, "_")}.pdf`
    );
    link.setAttribute("target", "_blank");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  render() {
    const { isMobile, data, status } = this.props;

    if (status !== "success") return null;

    const videoSetting = this.findElement(data.text);

    const { text, file, video_link } = data;
    return (
      <Fragment>
        {!isMobile && (
          <div className="guide">
            <div className="guide-header d-flex align-items-center justify-content-between">
              <p className="guide-header__title">{text}</p>
              {/*{file && (*/}
                {/*<button className="guide-btn" onClick={this.handleDownload}>*/}
                  {/*<span>*/}
                    {/*<svg*/}
                      {/*xmlns="http://www.w3.org/2000/svg"*/}
                      {/*id="Слой_1"*/}
                      {/*width="20"*/}
                      {/*height="20"*/}
                      {/*data-name="Слой 1"*/}
                      {/*viewBox="0 0 141.73 141.73"*/}
                    {/*>*/}
                      {/*<path*/}
                        {/*className="cls-1"*/}
                        {/*d="M114.17,62.07a19.61,19.61,0,0,0-12.51,4.63C100.25,51.17,89,39.07,75.4,39.07c-12,0-22.2,9.45-25.38,22.36a14.16,14.16,0,0,0-7.09-1.91c-9,0-16.23,8.52-16.23,19v.34a12.8,12.8,0,0,0-2.91-.34C15.62,78.54,9,86.3,9,95.86s6.61,17.32,14.78,17.32h90.38c12,0,21.81-11.44,21.81-25.55S126.21,62.07,114.17,62.07ZM75.23,100.72,57,85.6h12.3s0,0,0,0V68.67a5.85,5.85,0,1,1,11.69,0V85.6h12.3Z"*/}
                      {/*/>*/}
                    {/*</svg>*/}
                  {/*</span>*/}
                  {/*PDF*/}
                {/*</button>*/}
              {/*)}*/}
            </div>
            <YouTubeLazyLoad
              videoId={video_link}
              title={'TITLE'}
              description={text}
              containerClassName="guide__video"
              videoSettings={videoSetting}
            />
          </div>
        )}

        {isMobile && (
          <div className="expert-chat-btn">
            <button
              className="theme-btn theme-btn--full-width"
              onClick={file ? this.handleDownload : null}
            >
              <span className="add-icon">
                <VideoHintSvg />
              </span>
              {text}
            </button>
          </div>
        )}

        {!isMobile && (
          <div className="expert-chat-btn">
            <button
              className="theme-btn theme-btn--full-width"
              onClick={() => openHubspotChat()}
            >
              <span className="add-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="18"
                  viewBox="0 0 141.73 141.73"
                >
                  <path
                    className="cls-1"
                    d="M41.46,46.81c-2-3-2.23-7.51-.4-13.49l1.49-1a2,2,0,0,0,.9-1.9A24.24,24.24,0,0,1,49,13.56c4.63-5.25,12.06-7.87,22-7.91s17.39,2.66,22.1,7.91A24.24,24.24,0,0,1,98.7,30.41a2,2,0,0,0,.9,1.9l1.5,1c1.82,6,1.7,10.5-.41,13.49A9,9,0,0,1,96.32,50a13.65,13.65,0,0,0,3.34-10.24A9.6,9.6,0,0,0,96.37,34C95.48,13.54,81.13,11.24,75,11.24a27.11,27.11,0,0,0-3.92.29,25.54,25.54,0,0,0-3.91-.29C61,11.24,46.65,13.5,45.7,34a9.58,9.58,0,0,0-3.33,5.72A13.6,13.6,0,0,0,45.7,50a9,9,0,0,1-4.34-3.18Z"
                  />
                  <path
                    className="cls-1"
                    d="M92.29,33.17A42.13,42.13,0,0,1,67.82,27a2,2,0,0,0-2.66.27C61.06,31.7,53.59,32.72,50,33c1.11-14.48,9.87-17.63,17.25-17.63a20.57,20.57,0,0,1,3.5.28,1.89,1.89,0,0,0,.82,0,20.41,20.41,0,0,1,3.5-.28c7.31,0,16.11,3.23,17.14,17.83Z"
                  />
                  <path
                    className="cls-1"
                    d="M118,98.52c-4.64-5.4-27.13-20-27.13-20L76.66,119.91v-15a4.54,4.54,0,0,0-4.53-4.52h0a4.54,4.54,0,0,0-4.52,4.52v16.7L53.73,78.47s-18.14,9.64-27.9,20.18c-7.54,8.13-8.41,24-8.41,24v15H125.27l0-15S127.23,109.32,118,98.52Zm-8.59,20a4.2,4.2,0,0,1-4.19,4.19H94.46a4.2,4.2,0,0,1-4.2-4.19v-.65a4.21,4.21,0,0,1,4.2-4.2H105.2a4.2,4.2,0,0,1,4.19,4.2Z"
                  />
                  <path
                    className="cls-1"
                    d="M50.78,50.38l-.08,0c0,.1-.14,10.54,6.33,17a17.9,17.9,0,0,0,4,2.88,4,4,0,0,0,1.75,6.64,3.52,3.52,0,0,0,1.9-.06A61.68,61.68,0,0,0,71,74.23,62.32,62.32,0,0,0,77.31,77a3.53,3.53,0,0,0,1.9.12,4,4,0,0,0,1.71-6.76,18.44,18.44,0,0,0,4.26-3,22.37,22.37,0,0,0,5.49-10.81l-9.4,5a5,5,0,0,1,0,.55,5.9,5.9,0,1,1-1.84-4.28l11.92-6.39V50.38A2.05,2.05,0,0,1,91.86,49c2.81-3.21,4.1-6.18,3.75-8.56a5.39,5.39,0,0,0-1.85-3.35,27.52,27.52,0,0,1-4.21.22,46.13,46.13,0,0,1-22.73-6.14C60.67,36.47,51.09,37,48.39,37a5.42,5.42,0,0,0-1.87,3.46c-.35,2.42.94,5.35,3.75,8.56A2.05,2.05,0,0,1,50.78,50.38Z"
                  />
                  <path
                    className="cls-1"
                    d="M77.18,62.11a1.83,1.83,0,1,1-1.82-1.82h0A1.82,1.82,0,0,1,77.18,62.11Z"
                  />
                </svg>
              </span>
              <span className="bold">Ask Expert</span> online
            </button>
          </div>
        )}
      </Fragment>
    );
  }
}
