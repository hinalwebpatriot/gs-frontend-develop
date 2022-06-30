import React, { Fragment } from "react";
import { PreloaderImg } from "./Preloader";
import noImagePic from "../../img/no_image_placeholder.jpg";
import LazyLoadWithServer from "./LazyLoadWithServer";
import GoogleEE from './GoogleEE/GoogleEE';
import NoScript from './NoScript';
import { checkMacOsX } from "../../utils/checkMacOsX";

const NoImage = ({ src, alt = "" }) => (
  <Fragment>
    <img src={noImagePic} alt="empty" className="lazy-img"/>
    <NoScript>
      <img src={src} alt={alt} />
    </NoScript>
  </Fragment>
);

const Placeholder = (style) => (
  <div style={{ height: '100%', display: "flex", alignSelf: "center", alignItems: 'center' }}>
    <PreloaderImg {...style} />
  </div>
);

export default class ImageLoaderAdaptive extends React.Component {
  constructor(props) {
    super(props);

    this.timerId = null;
    this.delay = 250;

    this.state = {
      isLoaded: false,
      isError: false
    };
  }

  mobDpr = 3;
  tabletDpr = 2;
  dpr = 1;
  macDpr = 2;

  componentDidMount() {
    if (!this.state.isLoaded && !this.state.isError) {
      this.setState({
        isLoaded: true
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.src !== this.props.src) {
      this.timerId = setTimeout(() => {
        this.setState({
          isLoaded: false,
          isError: false
        });
      }, this.delay);
    }
  }

  componentWillUnmount() {
    if (this.timerId) {
      clearTimeout(this.timerId);
    }
  }

  handleLoad = () => {
    if (this.timerId) {
      clearTimeout(this.timerId);
    }

    this.setState({
      isLoaded: true
    });

    const { product, list, position } = this.props;

    if (product) {
      GoogleEE.productView({ product, list, position });
    }
  };

  handleError = () => {
    if (this.timerId) {
      clearTimeout(this.timerId);
    }
    this.setState({
      isError: true
    });
  };

  render() {
    const { src = "", alt = "", mobile, desktop, preloadStyles = {}, style = {}, height, origin, withoutLoader = false } = this.props;
    const { isLoaded, isError } = this.state;

    if (isError) {
      return <NoImage/>
    }

    if (withoutLoader) {
      return (
        <picture>
          <source srcSet={`${mobile.webp}`} media="(max-width: 500px)" type="image/webp" />
          <source srcSet={`${mobile.jpg}`} media="(max-width: 500px)" type="image/jpg" />
          <source srcSet={`${desktop.webp} 1x`} media="(min-width: 500px)" type="image/webp" />
          <source srcSet={`${desktop.jpg} 1x`} media="(min-width: 500px)" type="image/jpg" />
          <img
            style={{ ...style, display: isLoaded && !isError ? "" : "" }}
            onLoad={this.handleLoad}
            onError={this.handleError}
            loading="lazy"
            src={origin}
            alt={alt} />
        </picture>
      )}

    return (
      <LazyLoadWithServer
        offset={75}
        height={ height || 0 }
        // placeholder={<NoImage/>}
        unmountIfInvisible={false}
        once={true}
        serverPlaceholder={<NoImage src={src} alt={alt}/>}
      >

        {!isLoaded && !isError && <Placeholder style={preloadStyles}/>}
        {
          <picture>
            <source srcSet={`${mobile.webp}`} media="(max-width: 500px)" type="image/webp" />
            <source srcSet={`${mobile.jpg}`} media="(max-width: 500px)" type="image/jpg" />
            <source srcSet={`${desktop.webp} 1x`} media="(min-width: 500px)" type="image/webp" />
            <source srcSet={`${desktop.jpg} 1x`} media="(min-width: 500px)" type="image/jpg" />
            <img
              style={{ ...style, display: isLoaded && !isError ? "" : "" }}
              onLoad={this.handleLoad}
              onError={this.handleError}
              src={origin}
              alt={alt} />
          </picture>
        }
        <NoScript>
          <img src={src} alt={alt} />
        </NoScript>
      </LazyLoadWithServer>
    );
  }
}
