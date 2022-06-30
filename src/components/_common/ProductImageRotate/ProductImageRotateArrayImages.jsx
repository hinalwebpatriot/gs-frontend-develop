import React from "react";

import { Preloader } from "../Preloader";
import { isServer } from "../../../utils/isServer";

export default class ProductImageRotateArrayImages extends React.Component {
  constructor(props) {
    super(props);

    this.image = React.createRef();
    this.wrapper = React.createRef();

    this.currentIndex = 0;

    this.startPosition = null;

    this.throttleCalc = this.onMouseMove;

    this.state = {
      isLoaded: false,
      isLoading: false
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

  handlePreload = () => {
    if (!this.state.isLoaded && !this.state.isLoading) {
      this.setState(
        {
          isLoading: true
        },
        () => {
          if (!isServer) {
            const Preload = require("image-preload").default;
            const Order = require("image-preload").Order;

            Preload(this.props.images, {
              order: Order.AllAtOnce,
              onComplete: () =>
                this.setState({ isLoading: false, isLoaded: true })
            });
          }
        }
      );
    }
  };

  onMouseDown = e => {
    if (this.state.isLoaded) {
      this.startPosition = e.clientX;
      e.preventDefault();
      document.body.addEventListener("mousemove", this.onMouseMove);
      document.body.addEventListener("mouseup", this.onMouseUp);
    }
  };

  onMouseUp = e => {
    this.startPosition = null;
    e.preventDefault();
    document.body.removeEventListener("mouseup", this.onMouseUp);
    document.body.removeEventListener("mousemove", this.onMouseMove);
  };

  onMouseMove = e => {
    this.getNewPosition(e.clientX);
  };

  onTouchStart = e => {
    if (this.state.isLoaded) {
      this.startPosition = e.touches[0].clientX;
      e.preventDefault();
      document.body.addEventListener("touchmove", this.onTouchMove);
      document.body.addEventListener("touchend", this.onTouchEnd);
    }
  };

  onTouchEnd = e => {
    this.startPosition = null;
    e.preventDefault();
    document.body.removeEventListener("touchmove", this.onTouchMove);
    document.body.removeEventListener("touchend", this.onTouchEnd);
  };

  onTouchMove = e => {
    this.getNewPosition(e.touches[0].clientX);
    e.preventDefault();
  };

  getNewPosition = endPosition => {
    try {
      if (!this.startPosition || this.startPosition === endPosition) {
        this.startPosition = endPosition;
        return;
      }

      const imagesLength = this.props.images.length;
      const blockWidth = this.wrapper.current.clientWidth;
      const trackWidth = this.startPosition - endPosition;
      const relativePath = trackWidth / blockWidth;
      const absolutePath = imagesLength * relativePath;

      let newVideoPosition = Math.round(
        (this.currentIndex + absolutePath) % imagesLength
      );

      if (newVideoPosition < 0) {
        newVideoPosition = Math.round(imagesLength + newVideoPosition);
      }

      if (newVideoPosition >= 0 && newVideoPosition <= imagesLength) {
        this.startPosition = endPosition;
        this.currentIndex = newVideoPosition;
        this.image.current.src = this.props.images[newVideoPosition];
      }
    } catch (e) {}
  };

  render() {
    const { isLoading, isLoaded } = this.state;
    const { className = "slider__img", images } = this.props;

    return (
      <div className={className} ref={this.wrapper}>
        {isLoaded ? (
          <img
            src={images[0]}
            ref={this.image}
            alt=""
            draggable={false}
            onDragStart={e => e.preventDefault()}
            style={{
              cursor: "grab",
              pointerEvents: "none",
              userSelect: "none",
              MozUserSelect: "none",
              MsUserSelect: "none"
            }}
          />
        ) : !isLoading ? (
          <img
            src={images[0]}
            draggable={false}
            alt=""
            onClick={this.handlePreload}
            onTouchStart={this.handlePreload}
            onDragStart={e => e.preventDefault()}
            style={{
              cursor: "pointer",
              userSelect: "none",
              MozUserSelect: "none",
              MsUserSelect: "none"
            }}
          />
        ) : (
          <Preloader />
        )}
      </div>
    );
  }
}
