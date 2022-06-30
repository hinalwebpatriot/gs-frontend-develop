import React, { Component } from "react";
import LazyLoadWithServer from "../LazyLoadWithServer";
import loadable from '@loadable/component';
import { Preloader } from '../Preloader';

// const YouTubeWrapper = loadable(
//   () =>
//     import(/* webpackChunkName: 'youtube_wrapper'*/ "./YouTubeWrapper"),
//   { fallback: <Preloader /> }
// );

const YouTubeWrapper = loadable.lib(() => import('react-youtube'));

class YouTubeLazyLoad extends Component {
  state = {
    showVideo: false,
    videoInfo: null,
    showroomSettings: {
      link: 'https://www.youtube.com/watch?v=G3XqDwJqLYk&feature=youtu.be',
      duration: '0:29',
      preview: '/static/media/showroom_preview.cf310118.png',
      dateDownload: '09.05.2019',
      className: 'showroom'
    },
    shoppingSettings: {
      link: 'https://www.youtube.com/watch?v=aOcTdmEVdEE&feature=youtu.be',
      duration: '0:15',
      preview: '/static/media/shopping_preview.25c8acd5.png',
      dateDownload: '01.08.2018',
      className: 'shopping'
    },
    engagementFirstSettings: {
      link: 'https://www.youtube.com/watch?v=OEfrIItaeA8&feature=youtu.be',
      duration: '1:00',
      preview: '/static/media/engagement_first_preview.3755ce20.png',
      dateDownload: '04.02.2019',
      className: 'engagement_first'
    },
    weddingFirstSettings: {
      link: 'https://www.youtube.com/watch?v=tXdPlZPI9qM&feature=youtu.be',
      duration: '4:19',
      preview: '/static/media/wedding_first_preview.3ba81fef.png',
      dateDownload: '21.07.2014',
      className: 'wedding_first'
    },
    weddingSecondSettings: {
      link: 'https://www.youtube.com/watch?v=HzFQ4UNVEO8&feature=youtu.be',
      duration: '0:15',
      preview: '/static/media/wedding_second_preview.76836a6c.png',
      dateDownload: '01.08.2018',
      className: 'wedding_second'
    }
  };

  componentDidMount() {
    this.setState((state) => ({
      ...state,
      videoInfo: this.getData(this.props.videoSettings)
    }))
  };

  handlePlay = () => {
    this.setState((state) => ({
      ...state,
      showVideo: true
    }))
  };

  getData = (name) => {
    const { showroomSettings, shoppingSettings, engagementFirstSettings, weddingFirstSettings, weddingSecondSettings } = this.state;

    switch (name) {
      case "SHOWROOM_VIDEO":
        return showroomSettings;
      case "SHOPPING_VIDEO":
        return shoppingSettings;
      case "ENGAGEMENT_FIRST_VIDEO":
        return engagementFirstSettings;
      case "WEDDING_FIRST_VIDEO":
        return weddingFirstSettings;
      case "WEDDING_SECOND_VIDEO":
        return weddingSecondSettings;
      default:
        return;
    }
  };

  render() {
    const { showVideo, videoInfo } = this.state;
    const {
      offset = 50,
      height = "400px",
      videoId,
      title,
      description,
      ...rest
    } = this.props;

    if (!videoInfo) {
      return null;
    }
    const image = (
      <div
        onClick={this.handlePlay}
        className={`preview_img ${this.state.videoInfo.className}`}>
      </div>
    );

    const renderImage = !showVideo && image;
    const renderVideo = (
      <div id="video-schema" className="height100 fix-padding-and-height" itemProp="video" itemScope itemType={videoInfo.link}>
        <div id="video-schema-meta">
          <meta itemProp="description" content={description}/>
          <meta itemProp="duration" content={videoInfo.duration}/>
          <link itemProp="url" href={videoInfo.link}/>
          <link itemProp="thumbnailUrl" href={videoInfo.preview}/>
          <meta itemProp="name" content={title}/>
          <meta itemProp="uploadDate" content={videoInfo.date}/>
          <meta itemProp="isFamilyFriendly" content="true"/>
          <span itemProp="thumbnail" class="none" itemScope itemType={videoInfo.preview}>
            <img alt="youtubee" itemProp="contentUrl" src={videoInfo.preview}/>
            <meta itemProp="width" content="100%"/>
            <meta itemProp="height" content={height}/>
          </span>
        </div>
        <LazyLoadWithServer offset={offset} height={height} once>
          <YouTubeWrapper fallback={<Preloader/>}>
            {
              ({ default: YouTube}) => <YouTube videoId={videoId} {...rest}/>
            }
          </YouTubeWrapper>
        </LazyLoadWithServer>
      </div>
    );

    return (
      <div className="video_wrapper">
        {renderImage}
        {showVideo && renderVideo}
      </div>
    );
  }
}

export default YouTubeLazyLoad;
