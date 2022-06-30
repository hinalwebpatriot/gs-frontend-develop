import React from "react";
import { throttle } from "lodash";

const videoLink =
  "https://diamonds-media.s3.amazonaws.com/wedding-video/23732/TESTV1.mp4";
const flowerWebm =
  "https://interactive-examples.mdn.mozilla.net/media/examples/flower.webm";
const lavaWebm =
  "https://upload.wikimedia.org/wikipedia/commons/transcoded/2/22/Volcano_Lava_Sample.webm/Volcano_Lava_Sample.webm.360p.webm";
const videoWebm =
  "https://diamonds-media.s3.amazonaws.com/wedding-video/23731/media.io_TESTV1.webm";

export default class ProductImageRotateVideo extends React.Component {
  constructor(props) {
    super(props);

    this.player = React.createRef();
    this.wrapper = React.createRef();

    this.startPosition = null;

    // this.throttleCalc = this.onMouseMove;
    this.throttleCalc = throttle(this.onMouseMove, 100);
    // this.throttleCalc = debounce(this.onMouseMove, 50);

    this.state = {
      isLoaded: false
    };
  }

  loveKolia = () => {};

  componentDidMount() {
    this.wrapper.current.addEventListener("mousedown", this.onMouseDown);
  }

  onMouseDown = e => {
    if (this.state.isLoaded) {

      this.startPosition = e.clientX;
      document.body.addEventListener("mousemove", this.throttleCalc);
      document.body.addEventListener("mouseup", this.onMouseUp);

      //Mobile
      // document.body.addEventListener('touchmove', this.throttleCalc);
      // document.body.addEventListener('touchstart', this.onMouseUp);
    }
  };

  onMouseUp = () => {
    // 'mouseup');

    this.startPosition = null;

    document.body.removeEventListener("mouseup", this.onMouseUp);
    document.body.removeEventListener("mousemove", this.throttleCalc);

    //Mobile
    // document.body.removeEventListener('touchstart', this.onMouseUp);
    // document.body.removeEventListener('touchmove', this.throttleCalc);
  };

  onMouseMove = e => {
    this.getNewPosition(e.clientX);
  };

  getNewPosition = endPosition => {
    if (!this.startPosition || this.startPosition === endPosition) {
      this.startPosition = endPosition;
      return;
    }

    const videoLength = this.player.current.duration;
    // const blockWidth = this.wrapper.current.clientWidth;
    const blockWidth = 1000;
    const trackWidth = endPosition - this.startPosition;
    const relativePath = trackWidth / blockWidth;
    const timePath = videoLength * relativePath;

    // if (Math.abs(timePath) < 0.01) {
    //   return;
    // }

    const currentVideoPosition = this.player.current.currentTime;

    // `cur:`, currentVideoPosition);

    let newVideoPosition = (currentVideoPosition + timePath) % videoLength;

    if (newVideoPosition < 0) {
      newVideoPosition = videoLength - newVideoPosition;
    }


    this.startPosition = endPosition;
    this.player.current.currentTime = newVideoPosition;

    //
    //   `
    //   videoLength: ${videoLength}
    //   blockWidth: ${blockWidth}
    //   trackWidth: ${trackWidth}
    //   relativePath: ${relativePath}
    //   timePath: ${timePath}
    //
    //   newVideoPos: ${newVideoPosition}
    //   `
    // );
    // console.timeEnd('test');
  };

  render() {
    const { src, type, className = "slider__img" } = this.props;
    return (
      <div className={className} ref={this.wrapper}>
        <video
          width="100%"
          height="100%"
          ref={this.player}
          preload="auto"
          // controls
          onCanPlayThrough={() => this.setState({ isLoaded: true })}
        >
          <source src={src || videoLink} type={type || "video/mp4"} />
        </video>
      </div>
    );
  }
}
