import React from "react";

import { PreloaderImg } from "../Preloader";

export default class ProductImageRotateSprite extends React.Component {
  constructor(props) {
    super(props);

    this.image = React.createRef();
    this.wrapper = React.createRef();

    this.currentIndex = 0;

    this.startPosition = null;

    this.throttleCalc = this.onMouseMove;
    // this.throttleCalc = throttle(this.onMouseMove, 100);
    // this.throttleCalc = debounce(this.onMouseMove, 50);
    this.frameCount = 120;
    this.frameStep = 540;
    this.frameLength = this.frameCount * this.frameStep;

    this.state = {
      isLoaded: false
    };
  }

  componentDidMount() {
    this.wrapper.current.addEventListener("mousedown", this.onMouseDown);
    this.wrapper.current.addEventListener("touchstart", this.onTouchStart);
  }

  componentWillUnmount() {
    this.wrapper.current.removeEventListener("mousedown", this.onMouseDown);
    this.wrapper.current.removeEventListener("touchstart", this.onTouchStart);
  }

  onMouseDown = e => {
    if (this.state.isLoaded) {
      this.startPosition = e.clientX;
      document.body.addEventListener("mousemove", this.onMouseMove);
      document.body.addEventListener("mouseup", this.onMouseUp);
    }
  };

  onMouseUp = () => {
    this.startPosition = null;
    document.body.removeEventListener("mouseup", this.onMouseUp);
    document.body.removeEventListener("mousemove", this.onMouseMove);
  };

  onMouseMove = e => {
    this.getNewPosition(e.clientX);
  };

  onTouchStart = e => {
    if (this.state.isLoaded) {
      this.startPosition = e.touches[0].clientX;
      document.body.addEventListener("touchmove", this.onTouchMove);
      document.body.addEventListener("touchend", this.onTouchEnd);
    }
  };

  onTouchEnd = () => {
    this.startPosition = null;
    document.body.removeEventListener("touchmove", this.onTouchMove);
    document.body.removeEventListener("touchend", this.onTouchEnd);
  };

  onTouchMove = e => {
    this.getNewPosition(e.touches[0].clientX);
    // e.preventDefault();
  };

  getNewPosition = endPosition => {
    try {
      if (!this.startPosition || this.startPosition === endPosition) {
        // this.startPosition = endPosition;
        return;
      }

      const blockWidth = this.wrapper.current.clientWidth;
      const trackWidth = this.startPosition - endPosition;
      const relativePath = trackWidth / blockWidth;

      const newIndex =
        Math.round(relativePath * 150 + this.currentIndex) % this.frameCount;

      let newPosition;

      if (newIndex < 0) {
        newPosition = this.frameLength + newIndex * this.frameStep;
      } else {
        newPosition = (newIndex * this.frameStep) % this.frameLength;
      }

      this.currentIndex = newIndex;

      this.startPosition = endPosition;
      this.image.current.style["object-position"] = `-${newPosition}px 0px`;
    } catch (e) {}
  };

  render() {
    const { isLoaded } = this.state;
    const { className = "slider__img", images } = this.props;

    return (
      <div
        className={`rotate-image-360 ${className}`}
        ref={this.wrapper}
        style={{ cursor: "grab" }}
      >
        {!isLoaded && (
          <PreloaderImg
            style={{
              margin: "0 auto",
              height: "150px",
              width: "150px",
              transform: "scale(1.5, 1.5)"
            }}
          />
        )}
        <img
          ref={this.image}
          style={{
            display: !isLoaded ? "none" : "",
            objectFit: "cover",
            objectPosition: "0px 0px", //edit this
            width: `${this.frameStep}px`,
            minWidth: `${this.frameStep}px`,
            height: `${this.frameStep}px`,
            minHeight: `${this.frameStep}px`,
            cursor: "grab",
            userSelect: "none",
            pointerEvents: "none",
            MozUserSelect: "none",
            MsUserSelect: "none",
            WebkitUserSelect: "none"
            // display: !isLoaded ? 'none' : ''
          }}
          onLoad={() => this.setState({ isLoaded: true })}
          onDragStart={e => e.preventDefault()}
          draggable={false}
          src={images[0]}
          alt=""
        />
      </div>
    );
  }
}
