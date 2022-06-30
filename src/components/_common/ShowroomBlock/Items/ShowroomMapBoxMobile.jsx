import React from "react";
import ImageLoaderWithoutDesktop from "../../ImageLoaderWithoutDesktop";

import {Link} from "react-router-dom";

export default class ShowroomMapBoxMobile extends React.Component {
  render() {
    const { title } = this.props.data;

    // if (isServer) {
    //   return null;
    // }

    return (
      <div className="col">
        <div className="showroom-map sm-show">
          <Link to={'/contact-us'}>
            <ImageLoaderWithoutDesktop
              style={{width: '100%', height: '100%', objectFit: 'cover', cursor: 'pointer'}}
              src={this.props.mobileMapImg}
              alt={`showroom map ${title}`}
            />
          </Link>
        </div>
      </div>
    );
  }
}
