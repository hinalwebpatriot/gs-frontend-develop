import React from "react";

import YouTubeAutoPlay from "../../YouTube/YouTubeAutoPlay";
import {Link} from "react-router-dom";
import ImageLoaderWithoutMobile from "../../ImageLoaderWithoutMobile";

export default class ShowroomMapBox extends React.Component {

  render() {
    const { image, youtube_link, title } = this.props.data;

    // if (isServer) {
    //   return null;
    // }

    return (
      <div className="showroom-map-box">
        <div className="row">
          <div className="col-lg-8">
            <div className="showroom-img">
              {youtube_link ? (
                <YouTubeAutoPlay
                  videoId={youtube_link}
                  containerClassName="col"
                  videoSettings="SHOWROOM_VIDEO"
                />
              ) : (
                <img src={image} alt={`Showroom pic ${title}`} />
              )}
              {/*<img src={image} alt="" />*/}
            </div>
          </div>
          <div className="col-lg-4">
            <div className="showroom-map sm-hide">
              {
                <Link to={'/contact-us'}>
                  <ImageLoaderWithoutMobile
                    style={{width: '100%', height: '100%', objectFit: 'cover', cursor: 'pointer'}}
                    src={this.props.desktopMapImg}
                    alt={`showroom map ${title}`}
                  />
                </Link>
              }
              {/*<ShowroomMapLazy location={location} />*/}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
