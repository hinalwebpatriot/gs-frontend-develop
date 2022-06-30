import React from "react";
import YouTubeLazyLoad from './YouTubeLazyLoad';

export default class YouTubeAutoPlay extends React.Component {
  constructor(props) {
    super(props);
    this.player = null;

    this.state = {
      // isClicked: false,
      // isPlaying: false,
    };
  }

  handleInit = e => {
    this.player = e.target;
    this.player.mute();
    this.player.playVideo();
  };

  handleRestart = () => {
    if (this.player) {
      // this.player.unMute();
      this.player.seekTo(0);
      this.player.playVideo();
      this.setState({
        // isClicked: true,
        // isPlaying: true,
      });
    }
  };

  // togglePlay = () => {
  //   if (this.state.isPlaying) {
  //     this.player.pauseVideo();
  //     this.setState({
  //       isPlaying: false,
  //     });
  //   } else {
  //     this.player.playVideo();
  //     this.setState({
  //       isPlaying: true,
  //     });
  //   }
  // };

  render() {
    // const { showVideo } = this.state;
    const options = {
      width: "100%",
      playerVars: {
        autoplay: 1,
        controls: 0,
        disablekb: 1,
        fs: 0,
        iv_load_policy: 3,
        loop: 1,
        modestbranding: 1,
        rel: 0
      }
    };

    // const styleImg = {
    //   height: '300px',
    //   width: '300px',
    //   backgroundColor: 'red',
    //   cursor: 'pointer'
    // };

    return (
      <YouTubeLazyLoad
        {...this.props}
        onEnd={this.handleRestart}
        onReady={this.handleInit}
        opts={options}
      />
    );
  }
}
