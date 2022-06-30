import React from "react";
import ImageLoader from "../../_common/ImageLoader";
import ImageLoaderAdaptive from "../../_common/ImageLoaderAdaptive";
import NewProductImageRotate from "../ProductImageRotate/NewProductImageRotate";
import { faMinus } from "@fortawesome/free-solid-svg-icons/faMinus";
import { faPlus } from "@fortawesome/free-solid-svg-icons/faPlus";
import IconFA from '../IconFA';

const ScaleRanges = ({ current, min, max, step, setZoom }) => {
  const linesNum = (max - min) / step + 1;

  const lines = Array(linesNum)
    .fill(null)
    .map((line, index) => {
      const lineStep = step * index + min;
      return (
        <div className="scale-range__wrap"
             key={`scale-range-${lineStep}`}
             data-step={lineStep} >
          <span
            className={`scale-range__line ${
              lineStep === current ? "active" : ""
              }`}
            data-step={lineStep}
          />
        </div>
      );
    });

  return (
    <div className="scale-range" onClick={setZoom}>
      {lines}
    </div>
  );
};

export default class ProductImageZoom extends React.Component {
  constructor(props) {
    super(props);
    // step count should be equal to 10; (this.maxZoom - this.minZoom) / this.step  = 10;
    this.maxZoom = props.maxZoom || 80;
    this.minZoom = props.minZoom || 20;
    this.step = props.step || 6;

    this.basis = props.basis || 100;

    this.state = {
      zoom: props.initialZoom || 60
    };
  };


  handleChangeZoom = type => {
    const sign = type === "increment" ? 1 : -1;
    const currentZoom = this.state.zoom;
    const newZoom = currentZoom + this.step * sign;
    console.log(this.step * sign);

    if (newZoom <= this.maxZoom && newZoom >= this.minZoom) {
      this.setState({
        zoom: newZoom
      });
    }
  };

  handleSetZoom = ({ target }) => {
    const step = +target.dataset.step;

    if (step) {
      this.setState({
        zoom: step
      });
    }
  };

  render() {
    const { path, type, mimeType, alt = '', pictureItem, origin } = this.props;
    const { zoom } = this.state;

    // const scaleStyles = {
    //   transform: `scale(${zoom / this.basis}, ${zoom / this.basis})`
    // };

    return (
      <div className="product-view">
        <div className="product-view__item">
          {type === "image" && pictureItem &&
            <ImageLoaderAdaptive
              src={pictureItem.origin}
              alt={alt}
              mobile={{
                webp: pictureItem.webp['450x450'],
                jpg: pictureItem.jpg['450x450']
              }}
              desktop={{
                webp: pictureItem.webp['450x450'],
                webp2x: pictureItem.webp['900x900'],
                jpg: pictureItem.jpg['450x450'],
                jpg2x: pictureItem.jpg['900x900']
              }}
              origin={pictureItem.origin}
              preloadStyles={{ height: "30px", margin: "5px auto" }}
              // style={scaleStyles}
            />
          }
          {type === 'image' && !pictureItem &&
            <ImageLoader
              src={path}
              alt={alt}
              // style={scaleStyles}
            />
          }
          {type === "video" && (
            <video width="100%" height="100%" preload="metadata" controls>
              <source src={path} type={mimeType || "video/mp4"} />
            </video>
          )}
          {type === "rotate360" && <NewProductImageRotate images={path} />}
        </div>

        {/* {type === "image" && (
          <div className="scale-block-wrap">
            <p className="scale-label">x1</p>
            <div className="scale-block">
              <button
                className="scale-block__btn"
                onClick={() => this.handleChangeZoom("decrement")}
              >
                <span>
                  <IconFA icon={faMinus}/>
                </span>
              </button>
              <ScaleRanges
                min={this.minZoom}
                max={this.maxZoom}
                current={zoom}
                step={this.step}
                setZoom={this.handleSetZoom}
              />

              <button
                className="scale-block__btn"
                onClick={() => this.handleChangeZoom("increment")}
              >
                <span>
                  <IconFA icon={faPlus}/>
                </span>
              </button>
            </div>
            <p className="scale-label">x10</p>
          </div>
        )} */}
      </div>
    );
  }
}
