import React from "react";
import YouTubeLazyLoad from "../../../_common/YouTube/YouTubeLazyLoad";

export default class SliderBlockVideo extends React.Component {
  constructor(props) {
    super(props);
    this.player = null;

    this.state = {
      isClicked: false,
      isPlaying: false
    };
  }

  handleInit = e => {
    this.player = e.target;
    this.player.mute();
  };

  handleRestart = () => {
    if (this.player) {
      // this.player.unMute();
      this.player.seekTo(0);
      this.player.playVideo();
      this.setState({
        isClicked: true,
        isPlaying: true
      });
    }
  };

  togglePlay = () => {
    if (this.state.isPlaying) {
      this.player.pauseVideo();
      this.setState({
        isPlaying: false
      });
    } else {
      this.player.playVideo();
      this.setState({
        isPlaying: true
      });
    }
  };

  render() {
    const { isClicked } = this.state;
    const { link } = this.props;
    const videoId = link;

    const options = {
      height: "500px",
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

    return (
      <section className="home-section">
        {/*{*/}
        {/*isClicked*/}
        {/*? <button onClick={this.togglePlay}>Toggle</button>*/}
        {/*:  <button onClick={this.handleRestart}>Restart</button>*/}
        {/*}*/}

        {/*<button onClick={isClicked ? this.togglePlay : this.handleRestart}>{isClicked ? 'Toggle' : 'Restart'}</button>*/}
        <div className="main-slider-box">
          <YouTubeLazyLoad
            videoId={videoId}
            className=""
            containerClassName=""
            onEnd={this.handleRestart}
            onReady={this.handleInit}
            opts={options}
          />
        </div>
      </section>
    );
  }
}
